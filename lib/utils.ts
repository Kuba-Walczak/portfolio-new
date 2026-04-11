import { Content, Project } from "@/types/content"
import { parseContent } from "@/lib/content-schema"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchContent(url: string): Promise<Content> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch content: ${res.status}`)
  const data = await res.json()
  const content = parseContent(data)

  content.projects.forEach((project) => {
    project.subpage.gallery.forEach((galleryItem) => {
      galleryItem.media.forEach((media) => {
        const img = new Image()
        img.src = media.src
        img.onload = () => {
          media.width = img.naturalWidth
          media.height = img.naturalHeight
        }
      })
    })
  })

  return content
}

export async function fetchProjects(url: string): Promise<Project[]> {
  const content = await fetchContent(url)
  return content.projects
}
