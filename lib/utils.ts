import { GalleryImage, Project } from "@/types/project";
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
    project.laptop.gallery.forEach((image: GalleryImage) => {
      const img = new Image()
      img.src = image.src
      img.onload = () => {
        image.width = img.naturalWidth
        image.height = img.naturalHeight
      }
    })
  })
  return data as Project[]
}
