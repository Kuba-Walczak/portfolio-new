'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState, useMemo } from 'react'

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
    <section id="projects" className="mx-76 py-24 md:py-32 scroll-mt-20">
      <div className="space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Projects</h2>
        <p className="text-lg text-muted-foreground">
          A selection of recent work that showcases my skills and experience
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleCategory(category)}
            className="transition-all"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-card border-border hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden flex flex-col"
          >
            <div className="h-84 bg-secondary overflow-hidden">
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
            <CardHeader>
              <CardTitle className="text-xl text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-end">
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
              <a
                href={project.link}
                className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium"
              >
                View Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
