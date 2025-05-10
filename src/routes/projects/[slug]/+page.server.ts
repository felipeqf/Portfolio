import { error } from '@sveltejs/kit';
import { Marked } from 'marked';
import matter from 'gray-matter';
import { basename } from 'path'; // Node.js path module
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
// import { base } from '$app/paths'; // Not strictly needed for img src if glob provides full URL

import type { PageServerLoad, EntryGenerator } from './$types';
import type { Metadata, Project, ContentListItem } from '$lib/types/types';
import { sortByOrderAndDate } from '$lib/utils/sort';

export const prerender = true;


// Glob all images in the target directory.
const imageModules = import.meta.glob<string>(
    '/src/content/projects/images/**/*.{png,jpg,jpeg,gif,svg}',
    {
        eager: true,
        query: '?url',
        import: 'default' // This combination should resolve to string values
    }
);

// Create a lookup map from simple image filename
const projectImagePublicPaths: Record<string, string> = {};
for (const srcPath in imageModules) {
    // srcPath is like "/src/content/projects/images/..."
    const imageName = basename(srcPath); // Extracts "imageName" from the path
    projectImagePublicPaths[imageName] = imageModules[srcPath];
}

let allSortedProjects: ContentListItem[] | null = null;

function getAllSortedProjects(): ContentListItem[] {
    if (allSortedProjects) {
        return allSortedProjects;
    }

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
        metadata.title = metadata.title ?? 'Untitled Project';
        metadata.date = metadata.date || '';

        return {
            slug,
            metadata,
            rawContent
        };
    });

    projectsData.sort(sortByOrderAndDate);
    allSortedProjects = projectsData;
    return allSortedProjects;
}

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
        const sortedProjects = getAllSortedProjects();
        const currentProjectData = sortedProjects.find(p => p.slug === slug);

        if (!currentProjectData) {
            throw new Error(`Project data not found for slug: ${slug}`);
        }

        const { content: markdown } = matter(currentProjectData.rawContent);
        
        const marked = new Marked(
            markedHighlight({
                emptyLangClass: 'hljs',
                langPrefix: 'hljs language-',
                highlight(code, lang) { // removed 'info' as it's not used
                    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                    return hljs.highlight(code, { language }).value;
                }
            })
        );

        // Custom renderer for images
        marked.use({
            renderer: {
                image(this: any, { href, title, text }: { href: string; title: string | null; text: string }) {
                    let finalSrc = href;

                    // Handle @ProjectImages alias
                    if (href && href.startsWith('@projectImages/')) {
                        const imageName = href.replace('@projectImages/', '');
                        if (projectImagePublicPaths[imageName]) {
                            finalSrc = projectImagePublicPaths[imageName];
                        } else {
                            // Image not found in our pre-processed map
                            console.warn(`[Marked Renderer] Image "${imageName}" from "@projectImages/" not found in pre-processed paths. Falling back to original href: ${href}`);
                        }
                    }
                    // Handle relative paths
                    const titleAttr = title ? `title="${title}"` : ''; // Ensure title attribute is only added if title exists
                    return `<img src="${finalSrc}" alt="${text}" ${titleAttr} loading="lazy" />`;
                }
            }
        });

        const html = marked.parse(markdown);

        const currentIndex = sortedProjects.findIndex(p => p.slug === slug);
        const nextIndex = (currentIndex + 1) % sortedProjects.length; // Wraps around
        const nextProjectData = sortedProjects[nextIndex];

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
        throw error(404, `Project "${params.slug}" not found. Details: ${e.message || String(e)}`);
    }
};