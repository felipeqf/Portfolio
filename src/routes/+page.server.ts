// src/routes/+page.server.js
import { marked } from 'marked';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';
import { basename } from 'path';
import type { PageServerLoad } from './$types';
import type { Project, Blog, PageData } from '$lib/types/types';

// Explicitly mark this page for prerendering
export const prerender = true;

export const load: PageServerLoad = async () => {
    try {
        const projectFiles = import.meta.glob<string>(
            '/src/routes/projects/*.md',
            { query: '?raw', import: 'default', eager: true }
        );
        const blogFiles = import.meta.glob<string>(
            '/src/routes/blogs/*.md',
            { query: '?raw', import: 'default', eager: true }
        );

        const projects: Project[] = Object.entries(projectFiles).map(([path, raw]) => {
            const slug = basename(path, '.md');
            const { data: metadata, content: markdown } = matter(raw);
            // Use sync parse during build if preferred
            const html = marked.parse(markdown);
            return {
                slug,
                metadata: {
                    title: metadata.title ?? 'Untitled Project', // Provide defaults
                    date: metadata.date || '',
                    link: metadata.link || '',
                    tags: Array.isArray(metadata.tags) ? metadata.tags : metadata.tags?.split(',').map((t: string) => t.trim()) || []
                },
                html
            };
        });

        const blogs: Blog[] = Object.entries(blogFiles).map(([path, raw]) => {
            const slug = basename(path, '.md');
            const { data: metadata, content: markdown } = matter(raw);
            const html = marked.parse(markdown); // Use sync parse during build if preferred
            return {
                slug,
                metadata: {
                    title: metadata.title ?? 'Untitled Blog Post', // Provide defaults
                    date: metadata.date || '',
                    link: metadata.link || '',
                    tags: Array.isArray(metadata.tags) ? metadata.tags : metadata.tags?.split(',').map((t: string) => t.trim()) || []
                },
                html
            };
        });

        // Optional: Sort by date
        projects.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
        blogs.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());


        const result: PageData = {
            content: {
                projects,
                blogs
            }
        };
        return result;

    } catch (e) {
        console.error('Error loading main page content during prerender:', e);
        // Ensure errors during build are clear
        throw error(500, 'Failed to load portfolio content during prerender');
    }
};