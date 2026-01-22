import React from "react"
import { Calendar, Clock, Package } from 'lucide-react'

interface DetailItem {
  icon: React.ReactNode
  label: string
  value: string | string[]
}

export default function ProjectDetails() {
  const details: DetailItem[] = [
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Project Date',
      value: 'January 2024 - May 2024',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Duration',
      value: '5 months',
    },
    {
      icon: <Package className="w-5 h-5" />,
      label: 'Tech Stack',
      value: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'PostgreSQL'],
    },
  ]

  return (
    <section className="space-y-8 bg-black" style={{ boxShadow: 'inset 0 4px 6px -1px rgba(0, 0, 0, 1)' }}>
      <h2 className="text-2xl font-semibold mb-8">Project Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {details.map((detail, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="text-accent">{detail.icon}</div>
              <h3 className="font-medium text-foreground">{detail.label}</h3>
            </div>
            <div className="pl-8">
              {Array.isArray(detail.value) ? (
                <div className="flex flex-wrap gap-2">
                  {detail.value.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold">Overview</h3>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            This project focused on transforming an aging e-commerce platform into a modern, performance-optimized shopping experience. The original system suffered from slow load times, outdated UX patterns, and technical debt that hindered scalability.
          </p>
          <p>
            Working with a cross-functional team of designers and backend engineers, we completely rebuilt the frontend while maintaining backward compatibility with the existing API. The result was a 40% performance improvement and a 60% increase in mobile conversion rates.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold">Key Achievements</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-3">
            <span className="text-accent font-bold">•</span>
            <span>Reduced page load time from 4.2s to 2.5s</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-bold">•</span>
            <span>Improved Lighthouse score from 42 to 92</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-bold">•</span>
            <span>Implemented comprehensive component library</span>
          </li>
          <li className="flex gap-3">
            <span className="text-accent font-bold">•</span>
            <span>Achieved WCAG 2.1 AA accessibility compliance</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
