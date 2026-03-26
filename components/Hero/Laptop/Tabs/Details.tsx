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
      <Card className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 border mb-1 vsm:mb-2 vmd:mb-3 vlg:mb-4">
        <div className="flex items-center gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4">
          <div className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 border rounded-xl">
            <Code2 className="h-8 w-8 vsm:h-10 vsm:w-10 vmd:h-12 vmd:w-12 vlg:h-16 vlg:w-16 text-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs vmd:text-sm vlg:text-lg font-medium text-muted-foreground mb-1 vsm:mb-2 vlg:mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1 vlg:gap-2">
              {techStack.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-1 py-0.5 vsm:px-2 vsm:py-1 vlg:px-3 text-xs vsm:text-sm vmd:text-lg vlg:text-2xl font-medium bg-transparent backdrop-blur-none border-input"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4">
      <Card className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 border">
        <div className="flex items-center gap-1 vsm:gap-2 vlg:gap-4">
          <div className="flex-1">
            <h3 className="text-xs vmd:text-sm vlg:text-md font-medium text-muted-foreground mb-0.5 vsm:mb-1 vlg:mb-2">
              Description
            </h3>
            <p className="text-xs vmd:text-sm vlg:text-lg leading-relaxed text-justify text-foreground/90">
              {description}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 border">
        <div className="flex items-center gap-1 vsm:gap-2 vlg:gap-4">
          <div className="flex-1">
            <h3 className="text-xs vmd:text-sm vlg:text-md font-medium text-muted-foreground mb-0.5 vsm:mb-1 vlg:mb-2">
              Features
            </h3>
            <ul className="text-xs vmd:text-sm vlg:text-lg leading-relaxed text-justify text-foreground/90 list-disc list-inside">
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
