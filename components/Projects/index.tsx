'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useApp } from '@/contexts/AppContext'
import { SingleProject } from './SingleProject'
import { MousePointerClickIcon } from 'lucide-react'

export default function Projects() {
  const { projects } = useApp()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
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
    <div
    className="flex flex-col gap-16 p-8 pt-16 border rounded-2xl backdrop-blur-xl bg-white/3 dark:bg-gradient-to-b from-transparent to-transparent">
      <div className="relative items-center justify-center hidden md:flex">
      <h1 className="font-mono text-muted-foreground text-4xl lg:text-7xl opacity-10 flex items-center gap-4 whitespace-nowrap">
        Click to view
        <MousePointerClickIcon className="w-8 h-8 lg:w-16 lg:h-16"/>
      </h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-8">
        {filteredProjects?.map((project) => (
          <SingleProject key={project.id} project={project}/>
        ))}
      </div>
    </div>
    </section>
  )
}
