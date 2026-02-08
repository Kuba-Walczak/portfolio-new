import { Project } from "@/types/project"
import { useApp } from "@/contexts/AppContext"
import { Badge } from "../ui/badge"
import { gsap } from "gsap"
import { getTag, Tag } from "@/types/tag"

export function SingleProject({ project }: { project: Project }) {
    const { projectView, setProjectView, selectedTab, setSelectedTab, projects, selectedProject, setSelectedProject } = useApp()
    const isSelected = selectedProject?.id === project.id
  return (
        <div
          key={project.id}
          className={`w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card ring-10 shadow-sm cursor-pointer transition-all duration-100 ${
            isSelected 
              ? 'ring-primary border-primary' 
              : 'ring-white/10 hover:ring-primary/50 hover:border-primary/50'
          }`}
          onClick={() => {
            if (isSelected) {
              setSelectedProject(null)
            } else {
              if (!projectView) setProjectView(true)
              if (selectedTab !== 'Showcase') setSelectedTab('Showcase')
              setSelectedProject(project)
              const scrollProxy = { y: window.pageYOffset }
              gsap.to(scrollProxy, {
                y: 0,
                duration: 1.5,
                overwrite: "auto",
                onUpdate: () => {
                  window.scrollTo(0, scrollProxy.y)
                },
              })
            }
          }}
          >
        {/* Header */}
        <div className="h-58 bg-secondary overflow-hidden">
            <img
              src={project.card.thumbnail || "/placeholder.svg"}
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
          <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-card-foreground">
            {project.title}
          </h3>
            {
            project.card.tags.map((tag) => {
              const tagObject = getTag(tag)
              return (
                <Badge
                  key={tagObject.id}
                  variant={tagObject.style as "programming" | "technicalArt" | "art"}
                  className="bg-secondary text-secondary-foreground"
                >
                  {tagObject.title}
                </Badge>
              )
            })}
          </div>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {project.card.description}
          </p>
        </div>
        {/* Footer */}
        <div className="flex gap-2 border-t border-border bg-card px-6 py-4">
        {project.laptop.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                >
                  {tech}
                </Badge>
              ))}
        </div>
      </div>
  )
}
