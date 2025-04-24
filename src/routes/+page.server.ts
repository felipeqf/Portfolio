import { marked } from 'marked';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';
import { basename } from 'path';
import type { PageServerLoad } from './$types';
import type { Project, Blog, PageData } from '$lib/types/types';

export const load: PageServerLoad = async () => {
    try {
        // Load project files
        const projectFiles = import.meta.glob<string>(
            '/src/routes/projects/*.md',
            { query: '?raw', import: 'default', eager: true }
        );

        // Load blog files
        const blogFiles = import.meta.glob<string>(
            '/src/routes/blogs/*.md',
            { query: '?raw', import: 'default', eager: true }
        );

        // Process project files
        const projects: Project[] = Object.entries(projectFiles).map(([path, raw]) => {
            const slug = basename(path, '.md');
            const { data: metadata, content: markdown } = matter(raw);
            const html = marked(markdown) as string;
            return {
                slug,
                metadata: {
                    title: metadata.title,
                    date: metadata.date || '',
                    link: metadata.link || '',
                    tags: Array.isArray(metadata.tags) ? metadata.tags : metadata.tags?.split(',').map((t: string) => t.trim()) || []
                },
                html
            };
        });

        // Process blog files
        const blogs: Blog[] = Object.entries(blogFiles).map(([path, raw]) => {
            const slug = basename(path, '.md');
            const { data: metadata, content: markdown } = matter(raw);
            const html = marked(markdown) as string;
            return {
                slug,
                metadata: {
                    title: metadata.title,
                    date: metadata.date || '',
                    link: metadata.link || '',
                    tags: Array.isArray(metadata.tags) ? metadata.tags : metadata.tags?.split(',').map((t: string) => t.trim()) || []
                },
                html
            };
        });

        const result: PageData = {
            content: {
                projects,
                blogs
            }
        };

        return result;
    } catch (e) {
        console.error('Error loading content:', e);
        throw error(500, 'Failed to load portfolio content');
    }
};