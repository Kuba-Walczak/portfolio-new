import { Calendar, Clock, Code2, FileText } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProjectDetailsProps {
  title: string
  date: string
  duration: string
  description: string
  technologies: string[]
}

export function ProjectDetails({
  title,
  date,
  duration,
  description,
  technologies,
}: ProjectDetailsProps) {
  return (
    <div className="w-full max-full mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold mb-2 text-balance">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 border-border/50">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <Calendar className="h-8 w-8 text-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Date
              </h3>
              <p className="text-lg font-medium">{date}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <Clock className="h-8 w-8 text-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Duration
              </h3>
              <p className="text-lg font-medium">{duration}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-border/50 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-muted rounded-lg">
            <FileText className="h-8 w-8 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-base leading-relaxed text-foreground/90">
              {description}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-muted rounded-lg">
            <Code2 className="h-8 w-8 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
