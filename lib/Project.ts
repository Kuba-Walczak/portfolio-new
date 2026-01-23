export interface Project {
    id: string;
    type: string;
    title: string;
    description: {
      short: string;
      long: string;
    };
    techStack: string[];
    media: {
      thumbnail: string;
      showcase: string;
      gallery: string[];
    };
}

export async function fetchProjects(url: string): Promise<Project[]> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
    const data = await res.json();
    return data as Project[];
}