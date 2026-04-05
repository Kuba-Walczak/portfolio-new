export interface Project {
    id: string;
    status: "ready" | "coming-soon";
    title: string;
    card: ProjectCard;
    subpage: ProjectSubpage;
}

export interface ProjectCard {
    tags: string[];
    description: string;
    thumbnail: string;
}

export interface ProjectSubpage {
    colors: string[];
    description: string;
    feature: Feature[];
    techStack: string[];
    startDate: string;
    duration: string;
    showcase: Showcase;
    gallery: GalleryContent[];
}

export interface Showcase {
    src: string;
    caption: string;
}

export interface GalleryContent {
    type: string;
    media: GalleryMedia[];
    title: string;
    caption: string;
}

export interface GalleryMedia {
    src: string;
    width: number;
    height: number;
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
}
