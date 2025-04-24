// src/routes/blogs/[slug]/+page.server.js
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import matter from 'gray-matter';
import { basename } from 'path'; // Import basename
// Import EntryGenerator type
import type { PageServerLoad, EntryGenerator } from './$types';
import type { Metadata, Blog } from '$lib/types/types';

// Mark this dynamic route for prerendering
export const prerender = true;

// Define which slugs to generate pages for
export const entries: EntryGenerator = () => {
    // Use import.meta.glob to find all blog files
    const blogFiles = import.meta.glob('/src/routes/blogs/*.md', { eager: true });
    // Extract slugs from the file paths
    const slugs = Object.keys(blogFiles).map(path => ({
        slug: basename(path, '.md')
    }));
    console.log('Prerendering blog slugs:', slugs.map(s => s.slug)); // Log slugs being generated
    return slugs; // Return an array of objects like [{ slug: 'blog-1' }, { slug: 'blog-2' }]
};

// Your existing load function is mostly fine. It will run *during build* for each slug.
export const load: PageServerLoad = async ({ params }) => {
    try {
        const { slug } = params;
        const file = await import(`../../blogs/${slug}.md?raw`);
        const { data: metadata, content: markdown } = matter(file.default as string);

        const typedMetadata = metadata as Metadata;

        const blog: Blog = {
            slug: params.slug,
            metadata: typedMetadata,
             // Use sync parse during build if preferred
            html: marked.parse(markdown)
        };

        return blog;
    } catch (e) {
        console.error(`Prerender error for blog slug "${params.slug}":`, e);
         // Make sure errors clearly indicate which slug failed
        throw error(404, `Blog "${params.slug}" not found during prerender`);
    }
};