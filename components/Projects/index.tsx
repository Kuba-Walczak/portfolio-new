'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/contexts/AppContext'
import { SingleProject } from './SingleProject'
import { MousePointerClickIcon } from 'lucide-react'

export default function Projects() {
  const { projects } = useApp()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [projectsOpen, setProjectsOpen] = useState(true)
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredProjects = useMemo(() => {
    if (selectedCategories.length === 0) return projects
    return projects?.filter(project =>
      selectedCategories.some(category => project?.card?.tags?.includes(category))
    )
  }, [selectedCategories, projects])

  return (
    <section
    id="projects"
    className="mx-auto scroll-mt-20"
    style={{ maxWidth: 'calc(100vh * 1.2)' }}>
    {projectsOpen && (
    <div
    className="flex flex-col gap-16 p-16 border rounded-2xl backdrop-blur-xl bg-white/5 dark:bg-gradient-to-b from-transparent to-transparent">
      <div className="relative flex items-center">
      <h2 className="text-5xl font-semibold opacity-25 text-muted-foreground">
        Projects
      </h2>
      <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold text-muted-foreground text-7xl opacity-10 flex items-center gap-4">
        Click to view
        <MousePointerClickIcon size={64}/>
      </h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 gap-y-10">
        {filteredProjects?.map((project) => (
          <SingleProject key={project.id} project={project}/>
        ))}
      </div>
    </div>
    )}
    </section>
  )
}
