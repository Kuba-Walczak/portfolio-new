import { GalleryContent, GalleryMedia, Project } from "@/types/project";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchProjects(url: string): Promise<Project[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`)
  const data = await res.json()
  data.forEach((project: Project) => {
    project.laptop.gallery.forEach((content: GalleryContent) => {
      content.media.forEach((media: GalleryMedia) => {
      const img = new Image()
      img.src = media.src
        img.onload = () => {
          media.width = img.naturalWidth
          media.height = img.naturalHeight
        }
      })
    })
  })
  return data as Project[]
}
