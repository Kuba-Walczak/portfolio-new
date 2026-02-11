import { Calendar, Clock, Code2, FileText } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DetailsProps {
  description: string
  techStack: string[]
}

export function Details({
  description,
  techStack,
}: DetailsProps) {
  return (
    <div className="flex w-full h-full flex-col justify-center">
      <Card className="p-6 border mb-4">
        <div className="flex items-center gap-4">
          <div className="p-4 border rounded-xl">
            <Code2 className="h-16 w-16 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-muted-foreground mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 text-2xl font-medium bg-transparent backdrop-blur-none border-input"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4">
      <Card className="p-6 border mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-md font-medium text-muted-foreground mb-2">
              Description
            </h3>
            <p className="text-lg leading-relaxed text-justify text-foreground/90">
              {description}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-6 border mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h3 className="text-md font-medium text-muted-foreground mb-2">
              Features
            </h3>
            <ul className="text-lg leading-relaxed text-justify text-foreground/90 list-disc list-inside">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        </div>
      </Card>
      </div>
    </div>
  )
}
