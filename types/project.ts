export interface Project {
    id: string;
    status: 'ready' | 'coming-soon';
    title: string;
    card: ProjectCard;
    laptop: ProjectLaptop;
}

export interface ProjectCard {
    tags: string[];
    description: string;
    thumbnail: string;
}

export interface ProjectLaptop {
    colors: string[];
    description: string;
    techStack: string[];
    startDate: string;
    duration: string;
    showcase: string;
    gallery: GalleryContent[];
}

export interface GalleryContent {
    type: string;
    media: GalleryMedia[];
    caption: string;
}

export interface GalleryMedia {
    src: string;
    width: number;
    height: number;
}
