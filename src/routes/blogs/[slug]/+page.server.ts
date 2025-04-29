import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import matter from 'gray-matter';
import { basename } from 'path';

import type { PageServerLoad, EntryGenerator } from './$types';
import type { Metadata, Blog, ContentListItem } from '$lib/types/types';
import { sortByOrderAndDate } from '$lib/utils/sort';

export const prerender = true;

let allSortedBlogs: ContentListItem[] | null = null;

// Function to get all blogs, sorted, caching the result
function getAllSortedBlogs(): ContentListItem[] {
    // If cache exists, return it
    if (allSortedBlogs) {
        return allSortedBlogs;
    }

    // import.meta.glob to find all blog files
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
        // Ensure title exists
        metadata.title = metadata.title ?? 'Untitled Blog post';
        // Ensure date exists for sorting
        metadata.date = metadata.date || '';

        return {
            slug,
            metadata,
            rawContent
        };
    });

    // Sort the blogs
    blogsData.sort(sortByOrderAndDate);

    // Cache the result
    allSortedBlogs = blogsData;
    return allSortedBlogs;
}

// Define which slugs to generate pages for
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

        // Get the sorted list (uses cache after first run)
        const sortedBlogs = getAllSortedBlogs();

        // Find the current blog's data in the list
        const currentBlogData = sortedBlogs.find(b => b.slug === slug);

        if (!currentBlogData) {
            throw new Error(`Blog post data not found for slug: ${slug}`);
        }

        // Parse the markdown content for the current blog
        const { content: markdown } = matter(currentBlogData.rawContent);
        const html = marked.parse(markdown);

        // Find current blog index in the sorted list
        const currentIndex = sortedBlogs.findIndex(b => b.slug === slug);

        // Determine next blog
        const nextIndex = (currentIndex + 1) % sortedBlogs.length;
        const nextBlogData = sortedBlogs[nextIndex];

        // Create the full blog object
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
        throw error(404, `Blog post "${params.slug}" not found. ${e.message || ''}`);
    }
};