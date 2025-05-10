import { error } from '@sveltejs/kit';
import { Marked } from 'marked';
import matter from 'gray-matter';
import { basename } from 'path';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

import type { PageServerLoad, EntryGenerator } from './$types';
import type { Metadata, Blog, ContentListItem } from '$lib/types/types';
import { sortByOrderAndDate } from '$lib/utils/sort';

export const prerender = true;


// Glob all images in the target directory for blog posts.
const blogImageModules = import.meta.glob<string>(
    '/src/content/blog_posts/images/**/*.{png,jpg,jpeg,gif,svg}',
    {
        eager: true,
        query: '?url',
        import: 'default'
    }
);

// Create a lookup map from simple image filename (e.g., "my-post-image.jpg")
// to its final Vite-processed public URL.
const blogImagePublicPaths: Record<string, string> = {};
for (const srcPath in blogImageModules) {
    // srcPath is like "/src/content/blog_posts/images/my-post-image.jpg"
    const imageName = basename(srcPath); // Extracts "my-post-image.jpg"
    blogImagePublicPaths[imageName] = blogImageModules[srcPath];
}

let allSortedBlogs: ContentListItem[] | null = null;

// Function to get all blogs, sorted, caching the result
function getAllSortedBlogs(): ContentListItem[] {
    if (allSortedBlogs) {
        return allSortedBlogs;
    }

    const blogFiles = import.meta.glob<string>(
        '/src/content/blog_posts/*.md',
        { eager: true, query: '?raw', import: 'default' }
    );

    const blogsData: ContentListItem[] = Object.entries(blogFiles).map(([path, rawContent]) => {
        const slug = basename(path, '.md');
        const { data } = matter(rawContent);
        const metadata = data as Metadata;

        if (typeof metadata.display_order !== 'number') {
            metadata.display_order = Infinity;
        }
        metadata.title = metadata.title ?? 'Untitled Blog post';
        metadata.date = metadata.date || '';

        return {
            slug,
            metadata,
            rawContent
        };
    });

    blogsData.sort(sortByOrderAndDate);
    allSortedBlogs = blogsData;
    return allSortedBlogs;
}

export const entries: EntryGenerator = () => {
    const blogFiles = import.meta.glob('/src/content/blog_posts/*.md', { eager: true });
    const slugs = Object.keys(blogFiles).map(path => ({
        slug: basename(path, '.md')
    }));
    console.log('Prerendering blog posts slugs:', slugs.map(s => s.slug));
    return slugs;
};

export const load: PageServerLoad = async ({ params }) => {
    try {
        const { slug } = params;
        const sortedBlogs = getAllSortedBlogs();
        const currentBlogData = sortedBlogs.find(b => b.slug === slug);

        if (!currentBlogData) {
            throw new Error(`Blog post data not found for slug: ${slug}`);
        }

        const { content: markdown } = matter(currentBlogData.rawContent);
        
        const marked = new Marked(
            markedHighlight({
                emptyLangClass: 'hljs',
                langPrefix: 'hljs language-',
                highlight(code, lang) {
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                }
            })
        );

        // Add a custom renderer for images in blog posts
        marked.use({
            renderer: {
                image(this: any, { href, title, text }: { href: string; title: string | null; text: string }) {
                    let finalSrc = href; // Default to original href

                    // Handle @blogImages alias (or your chosen alias)
                    if (href && href.startsWith('@blogImages/')) {
                        const imageName = href.replace('@blogImages/', '');
                        if (blogImagePublicPaths[imageName]) {
                            finalSrc = blogImagePublicPaths[imageName];
                        } else {
                            console.warn(`[Marked Renderer - Blog] Image "${imageName}" from "@blogImages/" not found in pre-processed paths. Falling back to original href: ${href}`);
                        }
                    }
                    
                    const titleAttr = title ? `title="${title}"` : '';
                    return `<img src="${finalSrc}" alt="${text}" ${titleAttr} loading="lazy" />`;
                }
            }
        });

        const html = marked.parse(markdown);

        const currentIndex = sortedBlogs.findIndex(b => b.slug === slug);
        // Determine next blog, wrapping around if at the end
        const nextIndex = (currentIndex + 1) % sortedBlogs.length;
        const nextBlogData = sortedBlogs[nextIndex];

        const blog: Blog = {
            slug: currentBlogData.slug,
            metadata: currentBlogData.metadata,
            html,
            nextBlog: {
                slug: nextBlogData.slug,
                title: nextBlogData.metadata.title ?? 'Untitled Blog post'
            }
        };

        return blog;

    } catch (e: any) {
        console.error(`Error loading blog slug "${params.slug}":`, e);
        throw error(404, `Blog post "${params.slug}" not found. Details: ${e.message || String(e)}`);
    }
};