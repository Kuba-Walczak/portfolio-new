import { z } from "zod"
import type { Project } from "@/types/project"

const NonEmptyString = z.string().trim().min(1)

const GalleryMediaSchema = z.object({
  src: NonEmptyString,
  width: z.number().default(0),
  height: z.number().default(0),
})

const GalleryContentSchema = z.object({
  type: NonEmptyString,
  poster: NonEmptyString.optional(),
  media: z.array(GalleryMediaSchema),
  title: NonEmptyString,
  caption: NonEmptyString,
})

const FeatureSchema = z.object({
  icon: NonEmptyString,
  title: NonEmptyString,
  description: NonEmptyString,
})

const SubpageSchema = z.object({
  colors: z.array(NonEmptyString),
  description: NonEmptyString,
  feature: z.array(FeatureSchema),
  techStack: z.array(NonEmptyString),
  startDate: NonEmptyString,
  duration: NonEmptyString,
  showcase: z.object({
    src: NonEmptyString,
    caption: NonEmptyString,
  }),
  gallery: z.array(GalleryContentSchema),
  link: NonEmptyString.optional(),
})

const ProjectCardSchema = z.object({
  tags: z.array(NonEmptyString),
  description: NonEmptyString,
  thumbnail: NonEmptyString,
})

const ProjectInputSchema = z
  .object({
    id: NonEmptyString,
    status: z.enum(["ready", "coming-soon"]),
    title: NonEmptyString,
    card: ProjectCardSchema,
    subpage: SubpageSchema.optional(),
    laptop: SubpageSchema.optional(),
  })
  .transform((project) => {
    const subpage = project.subpage ?? project.laptop
    if (!subpage) {
      throw new Error(`Project "${project.id}" must provide subpage data.`)
    }

    return {
      id: project.id,
      status: project.status,
      title: project.title,
      card: project.card,
      subpage,
    }
  })

const ProjectsInputSchema = z.array(ProjectInputSchema)

export function parseProjects(input: unknown): Project[] {
  return ProjectsInputSchema.parse(input)
}
