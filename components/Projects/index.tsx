'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Separator } from '../ui/separator'
import { gsap } from 'gsap'
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
    <section id="projects" className="mx-76 scroll-mt-20">
      <Separator className="mb-6" />
      <div className="space-y-6 mb-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Here are some of the projects I've worked on.
            </p>
          </div>
        </div>
      <div className="grid md:grid-cols-4 gap-6 gap-y-10">
        {filteredProjects?.map((project) => (
          <SingleProject key={project.id} project={project}/>
        ))}
      </div>
    </section>
  )
}
