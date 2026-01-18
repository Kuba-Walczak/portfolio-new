'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce solution with real-time inventory management and seamless checkout experience.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: '#',
    image: '/placeholder-ecommerce.jpg',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'Collaborative task management tool with team collaboration features, real-time updates, and intuitive UI.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    image: '/placeholder-task.jpg',
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description:
      'Interactive dashboard for data visualization and business intelligence with customizable reports.',
    tags: ['React', 'D3.js', 'AWS'],
    link: '#',
    image: '/placeholder-analytics.jpg',
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description:
      'Interactive dashboard for data visualization and business intelligence with customizable reports.',
    tags: ['React', 'D3.js', 'AWS'],
    link: '#',
    image: '/placeholder-analytics.jpg',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    description:
      'Interactive dashboard for data visualization and business intelligence with customizable reports.',
    tags: ['React', 'D3.js', 'AWS'],
    link: '#',
    image: '/placeholder-analytics.jpg',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="mx-76 py-24 md:py-32">
      <div className="space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Projects</h2>
        <p className="text-lg text-muted-foreground">
          A selection of recent work that showcases my skills and experience
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
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
