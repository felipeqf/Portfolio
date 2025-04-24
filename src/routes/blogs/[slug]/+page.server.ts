import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import matter from 'gray-matter';
import type { PageServerLoad } from './$types';
import type { Metadata, Blog } from '$lib/types/types';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const { slug } = params;
        const file = await import(`../../blogs/${slug}.md?raw`);
        const { data: metadata, content: markdown } = matter(file.default as string);
        

        const typedMetadata = metadata as Metadata;

        const blog: Blog = {
            slug: params.slug,
            metadata: typedMetadata,
            html: await marked(markdown)
        };
        
        return blog;
    } catch (e) {
        console.error('Blog load error:', e);
        throw error(404, 'Blog not found');
    }
};