import { marked } from 'marked';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';
import { basename } from 'path';
import type { PageServerLoad } from './$types';
import type { Project, Blog, PageData } from '$lib/types/types';
import { sortByOrderAndDate } from '$lib/utils/sort';


export const prerender = true;

export const load: PageServerLoad = async () => {
    try {
        const projectFiles = import.meta.glob<string>(
            '/src/content/projects/*.md',
            { query: '?raw', import: 'default', eager: true }
        );
        const blogFiles = import.meta.glob<string>(
            '/src/content/blog_posts/*.md',
            { query: '?raw', import: 'default', eager: true }
        );

        const projects: Project[] = Object.entries(projectFiles).map(([path, raw]) => {
            const slug = basename(path, '.md');
            const { data: metadata, content: markdown } = matter(raw);
            const html = marked.parse(markdown);
            return {
                slug,
                metadata: {
                    title: metadata.title ?? 'Untitled Project',
                    date: metadata.date || '',
                    link: metadata.link || '',
                    tags: Array.isArray(metadata.tags) ? metadata.tags : metadata.tags?.split(',').map((t: string) => t.trim()) || [],
                    display_order: typeof metadata.display_order === 'number' ? metadata.display_order : Infinity
                },
                html
            };
        });

        const blogs: Blog[] = Object.entries(blogFiles).map(([path, raw]) => {
            const slug = basename(path, '.md');
            const { data: metadata, content: markdown } = matter(raw);
            const html = marked.parse(markdown);
            return {
                slug,
                metadata: {
                    title: metadata.title ?? 'Untitled Blog Post',
                    date: metadata.date || '',
                    link: metadata.link || '',
                    tags: Array.isArray(metadata.tags) ? metadata.tags : metadata.tags?.split(',').map((t: string) => t.trim()) || [],
                    display_order: typeof metadata.display_order === 'number' ? metadata.display_order : Infinity
                },
                html
            };
        });

        projects.sort(sortByOrderAndDate);
        blogs.sort(sortByOrderAndDate);

        const result: PageData = {
            content: {
                projects,
                blogs
            }
        };
        return result;

    } catch (e) {
        console.error('Error loading main page content during prerender:', e);
        throw error(500, 'Failed to load portfolio content during prerender');
    }
};