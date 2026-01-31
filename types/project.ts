export interface Project {
    id: string;
    tags: string[];
    title: string;
    description: {
      short: string;
      long: string;
    };
    techStack: string[];
    startDate: string;
	  duration: string;
    media: {
      thumbnail: string;
      showcase: string;
      gallery: string[];
    };
}
