'use client'

import { HeroSection } from "@/components/subpage/hero-section"
import { Technology } from "@/components/subpage/technology"
import { CoreArchitecture } from "@/components/subpage/core-architecture"
import { EcosystemMedia } from "@/components/subpage/ecosystem-media"
import { useApp } from "@/contexts/AppContext"
import { useParams } from "next/navigation"
import Background from "@/components/Background"
import { useEffect } from "react"

export default function ProjectSubpage() {
  const { setAnimationReady } = useApp()
  const { projects } = useApp()
  const params = useParams<{ projectId: string }>()
  const rawProjectId = params.projectId
  const projectId = Array.isArray(rawProjectId) ? rawProjectId[0] : rawProjectId
  const project = projects?.find((p) => p.id === projectId)

  useEffect(() => {
    setAnimationReady(false)
    document.documentElement.style.setProperty('--primary', project?.subpage.colors[0] ?? 'hsl(255 83% 58%)')
    document.documentElement.style.setProperty('--secondary', project?.subpage.colors[1] ?? 'hsl(255 79% 65%)')
    return () => {
      document.documentElement.style.setProperty('--primary', 'hsl(255 83% 58%)')
      document.documentElement.style.setProperty('--secondary', 'hsl(255 79% 65%)')
    }
  }, [projects])

  if (!projectId || !projects) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--text-secondary)]"></p>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Project not found.
        </p>
      </main>
    )
  }

  if (project.status === 'coming-soon') {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="type-h1">Coming Soon</p>
      </main>
    )
  }

  return (
    <div className="relative pt-16">
    <Background />
      <HeroSection project={project} />
      <Technology project={project} />
      <CoreArchitecture project={project} />
      <EcosystemMedia project={project} />
    </div>
  )
}
