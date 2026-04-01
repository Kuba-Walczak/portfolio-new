'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useApp } from '@/contexts/AppContext'
import { SingleProject } from './SingleProject'

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
    style={{ maxWidth: 'calc(100vh * 1.1)' }}>
    <div
    className="flex flex-col gap-16 p-8 rounded-2xl bg-glass border-ui-glass backdrop-blur-xl">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
        {filteredProjects?.map((project) => (
          <SingleProject key={project.id} project={project}/>
        ))}
      </div>
    </div>
    </section>
  )
}
