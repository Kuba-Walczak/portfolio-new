'use client'

import { HeroSection } from "@/components/subpage/hero-section"
import { CoreArchitecture } from "@/components/subpage/core-architecture"
import { EcosystemMedia } from "@/components/subpage/ecosystem-media"
import { useApp } from "@/contexts/AppContext"
import { useParams } from "next/navigation"

export default function ProjectSubpage() {
  const { projects } = useApp()
  const params = useParams<{ projectId: string }>()

  const rawProjectId = params.projectId
  const projectId = Array.isArray(rawProjectId) ? rawProjectId[0] : rawProjectId

  if (!projectId || !projects) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--text-secondary)]">Loading project...</p>
      </main>
    )
  }

  const project = projects?.find((p) => p.id === projectId)

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Project not found.
        </p>
      </main>
    )
  }

  return (
    <>
      <HeroSection project={project} />
      <CoreArchitecture project={project} />
      <EcosystemMedia project={project} />
    </>
  )
}
