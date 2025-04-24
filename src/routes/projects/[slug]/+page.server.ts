// src/routes/projects/[slug]/+page.server.js
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import matter from 'gray-matter';
import { basename } from 'path'; // Import basename
// Import EntryGenerator type
import type { PageServerLoad, EntryGenerator } from './$types';
import type { Metadata, Project } from '$lib/types/types';

// Mark this dynamic route for prerendering
export const prerender = true;

// Define which slugs to generate pages for
export const entries: EntryGenerator = () => {
    // Use import.meta.glob to find all project files
    const projectFiles = import.meta.glob('/src/routes/projects/*.md', { eager: true });
    // Extract slugs from the file paths
    const slugs = Object.keys(projectFiles).map(path => ({
        slug: basename(path, '.md')
    }));
    console.log('Prerendering project slugs:', slugs.map(s => s.slug)); // Log slugs being generated
    return slugs; // Return an array of objects like [{ slug: 'proj-1' }, { slug: 'proj-2' }]
};

// Your existing load function is mostly fine. It will run *during build* for each slug.
export const load: PageServerLoad = async ({ params }) => {
    try {
        const { slug } = params;
        // Dynamically import the specific file. This works during prerender
        // because the 'entries' function tells SvelteKit which imports to expect.
        const file = await import(`../../projects/${slug}.md?raw`);
        const { data: metadata, content: markdown } = matter(file.default as string);

        // Ensure metadata matches our Metadata type
        const typedMetadata = metadata as Metadata;

        const project: Project = {
            slug: params.slug,
            metadata: typedMetadata,
            // Use sync parse during build if preferred
            html: marked.parse(markdown)
        };

        return project;
    } catch (e) {
        console.error(`Prerender error for project slug "${params.slug}":`, e);
        // Make sure errors clearly indicate which slug failed
        throw error(404, `Project "${params.slug}" not found during prerender`);
    }
};