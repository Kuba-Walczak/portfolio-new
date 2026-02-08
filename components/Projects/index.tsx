'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/contexts/AppContext'
import { SingleProject } from './SingleProject'
import { MinusIcon, PlusIcon } from 'lucide-react'

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
    className="flex flex-col mx-76 scroll-mt-20">
      <div className={`flex items-center justify-between bg-card border-t rounded-t-2xl px-4 py-1 ${projectsOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
        <p className="text-3xl text-muted-foreground font-bold">
          My Projects
        </p>
        {projectsOpen ? (
          <MinusIcon className="w-16 h-16 text-muted-foreground"
        onClick={() => {
          setProjectsOpen(!projectsOpen)
        }}/>
        ) : (
          <PlusIcon className="w-16 h-16 text-muted-foreground"
        onClick={() => {
          setProjectsOpen(!projectsOpen)
        }}/>
        )}
      </div>
    {projectsOpen && (
    <div
    className="p-16 border-b border-l border-r rounded-b-2xl bg-black backdrop-blur-sm bg-opacity-50">
      <div className="grid md:grid-cols-4 gap-8 gap-y-10">
        {filteredProjects?.map((project) => (
          <SingleProject key={project.id} project={project}/>
        ))}
      </div>
    </div>
    )}
    </section>
  )
}
