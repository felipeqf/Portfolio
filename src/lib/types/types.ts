import type { Theme } from "$lib/stores/themeStore";

interface Experience {
    date: string;
    title: string;
    company: string;
    description: string;
    icon?: string;
}

interface Skill {
    name: string;
    skills: string[];
    icon?: string;
}

interface Education {
    date: string;
    title: string;
    school: string;
    icon?: string;
}

interface Certifications {
    title: string;
    school: string;
    date: string;
    link: string;
    icon?: string;
}

interface Publications{
    title: string;
    publication: string;
    date: string;
    link: string;
    icon?: string;
}

interface SocialContact {
    name: string;
    icon?: string;
    link?: string;
}

export interface Metadata {
    date: string;
    title: string;
    link: string;
    tags: string[] | string;
    display_order?: number;
}

export type ContentListItem = {
    slug: string;
    metadata: Metadata;
    rawContent: string;
};

export interface Project {
    slug: string;
    metadata: Metadata;
    html: string | Promise<string>;
    nextProject?: {
        slug: string;
        title: string;
    };
}
export interface Blog {
    slug: string;
    metadata: Metadata;
    html: string | Promise<string>;
    nextBlog?: {
        slug: string;
        title: string;
    };
}

export interface PortfolioData {
    basePath: string;
    theme: Theme;
    name: string;
    title: string;
    bio: string;
    image: string;
    cv_icon: string;
    cv_link: string;
    copy_icon: string;
    check_icon: string;
    expertises: string[];
    experience: Experience[];
    skills: Skill[];
    education: Education[];
    social: SocialContact[];
    publications: Publications[];
    certifications: Certifications[];
}

export interface PageData {
    content: {
        projects: Project[];
        blogs: Blog[];
    };
}

