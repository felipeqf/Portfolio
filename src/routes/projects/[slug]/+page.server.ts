import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import matter from 'gray-matter';
import { basename } from 'path';

import type { PageServerLoad, EntryGenerator } from './$types';
import type { Metadata, Project, ContentListItem } from '$lib/types/types';
import { sortByOrderAndDate } from '$lib/utils/sort';

export const prerender = true;

let allSortedProjects: ContentListItem[] | null = null;

// Function to get all projects, sorted, caching the result
function getAllSortedProjects(): ContentListItem[] {
    if (allSortedProjects) {
        return allSortedProjects;
    }

    // import.meta.glob to find all project files
    const projectFiles = import.meta.glob<string>(
        '/src/content/projects/*.md',
        { eager: true, query: '?raw', import: 'default' }
    );

    const projectsData: ContentListItem[] = Object.entries(projectFiles).map(([path, rawContent]) => {
        const slug = basename(path, '.md');
        const { data } = matter(rawContent);
        const metadata = data as Metadata;

        if (typeof metadata.display_order !== 'number') {
            metadata.display_order = Infinity;
        }
        // Ensure title exists
        metadata.title = metadata.title ?? 'Untitled Project';
        // Ensure date exists for sorting
        metadata.date = metadata.date || '';

        return {
            slug,
            metadata,
            rawContent
        };
    });

    // Sort the projects
    projectsData.sort(sortByOrderAndDate);

    // Cache the result
    allSortedProjects = projectsData;
    return allSortedProjects;
}

// Define which slugs to generate pages for
export const entries: EntryGenerator = () => {
    const projectFiles = import.meta.glob('/src/content/projects/*.md', { eager: true });
    const slugs = Object.keys(projectFiles).map(path => ({
        slug: basename(path, '.md')
    }));

    console.log('Prerendering project slugs:', slugs.map(s => s.slug));
    return slugs;
};

export const load: PageServerLoad = async ({ params }) => {
    try {
        const { slug } = params;

        // Get the sorted list (uses cache after first run)
        const sortedProjects = getAllSortedProjects();

        // Find the current project's data in the list
        const currentProjectData = sortedProjects.find(p => p.slug === slug);

        if (!currentProjectData) {
            throw new Error(`Project data not found for slug: ${slug}`); // Internal error signal
        }

        // Parse the markdown content for the current project
        const { content: markdown } = matter(currentProjectData.rawContent);
        const html = marked.parse(markdown);

        // Find current project index in the sorted list
        const currentIndex = sortedProjects.findIndex(p => p.slug === slug);

        // Determine next project
        const nextIndex = (currentIndex + 1) % sortedProjects.length;
        const nextProjectData = sortedProjects[nextIndex];

        // Create the full project object
        const project: Project = {
            slug: currentProjectData.slug,
            metadata: currentProjectData.metadata,
            html,
            nextProject: {
                slug: nextProjectData.slug,
                title: nextProjectData.metadata.title ?? 'Untitled Project'
            }
        };

        return project;

    } catch (e: any) {
        console.error(`Error loading project slug "${params.slug}":`, e);
        throw error(404, `Project "${params.slug}" not found. ${e.message || ''}`);
    }
};