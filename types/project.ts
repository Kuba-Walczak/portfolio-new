export interface Project {
    id: string;
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
    description: string;
    techStack: string[];
    startDate: string;
    duration: string;
    showcase: string;
    gallery: GalleryImage[];
}

export interface GalleryImage {
    src: string;
    caption: string;
    width: number;
    height: number;
}
