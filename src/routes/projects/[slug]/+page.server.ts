import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import matter from 'gray-matter';
import type { PageServerLoad } from './$types';
import type { Metadata, Project } from '$lib/types/types';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const { slug } = params;
        const file = await import(`../../projects/${slug}.md?raw`);
        const { data: metadata, content: markdown } = matter(file.default as string);
        
        // Ensure metadata matches our Metadata type
        const typedMetadata = metadata as Metadata;

        const project: Project = {
            slug: params.slug,
            metadata: typedMetadata,
            html: await marked(markdown)
        };

        return project;
    } catch (e) {
        console.error('Project load error:', e);
        throw error(404, 'Project not found');
    }
};