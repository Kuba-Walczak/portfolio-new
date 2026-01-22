'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Separator } from './ui/separator'
import { gsap } from 'gsap'
import { useApp } from '@/contexts/AppContext'

const projects = [
  {
    id: 1,
    title: 'Programming 1',
    description:
      'A full-featured e-commerce solution with real-time inventory management and seamless checkout experience.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    category: 'Programming',
    link: '#',
    image: '/placeholder-ecommerce.jpg',
  },
  {
    id: 2,
    title: 'Programming 2',
    description:
      'Collaborative task management tool with team collaboration features, real-time updates, and intuitive UI.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    category: 'Programming',
    link: '#',
    image: '/placeholder-task.jpg',
  },
  {
    id: 3,
    title: 'Technical Art 1',
    description:
      'Interactive dashboard for data visualization and business intelligence with customizable reports.',
    tags: ['React', 'D3.js', 'AWS'],
    category: 'Technical Art',
    link: '#',
    image: '/placeholder-analytics.jpg',
  },
  {
    id: 4,
    title: 'Technical Art 2',
    description:
      'Interactive dashboard for data visualization and business intelligence with customizable reports.',
    tags: ['React', 'D3.js', 'AWS'],
    category: 'Technical Art',
    link: '#',
    image: '/placeholder-analytics.jpg',
  },
  {
    id: 5,
    title: '3D Art 1',
    description:
      'Interactive dashboard for data visualization and business intelligence with customizable reports.',
    tags: ['React', 'D3.js', 'AWS'],
    category: '3D Art',
    link: '#',
    image: '/placeholder-analytics.jpg',
  },
  {
    id: 6,
    title: '3D Art 2',
    description:
      'Interactive dashboard for data visualization and business intelligence with customizable reports.',
    tags: ['React', 'D3.js', 'AWS'],
    category: '3D Art',
    link: '#',
    image: '/placeholder-analytics.jpg',
  }
]

export default function Projects() {
  const { projectView, setProjectView, selectedTab, setSelectedTab } = useApp()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ['Programming', 'Technical Art', '3D Art']

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredProjects = useMemo(() => {
    if (selectedCategories.length === 0) return projects
    return projects.filter(project =>
      selectedCategories.includes(project.category)
    )
  }, [selectedCategories])

  return (
    <section id="projects" className="mx-76 scroll-mt-20">
      <Separator className="mb-6" />
      <div className="flex justify-center gap-2 mb-6">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            size="filters"
            onClick={() => toggleCategory(category)}
            className="transition-all"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-4 gap-6 gap-y-10">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-sm ring-5 ring-white/20 cursor-pointer"
            onClick={() => {
              if (!projectView) setProjectView(true)
              if (selectedTab !== 'Showcase') setSelectedTab('Showcase')
              const scrollProxy = { y: window.pageYOffset }
              gsap.to(scrollProxy, {
                y: 0,
                duration: 1.5,
                overwrite: "auto",
                onUpdate: () => {
                  window.scrollTo(0, scrollProxy.y)
                },
              })
            }}
            >
          {/* Header placeholder */}
          <div className="h-64 bg-secondary overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                  const placeholder = document.createElement('div')
                  placeholder.className = 'text-muted-foreground text-sm'
                  placeholder.textContent = 'Project Image'
                  e.currentTarget.parentElement!.appendChild(placeholder)
                }}
              />
            </div>
          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-card-foreground">
              {project.title}
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
    
          {/* Footer */}
          <div className="border-t border-border bg-card px-6 py-4">
          <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
          </div>
        </div>
        ))}
      </div>
    </section>
  )
}
