import { Project } from "@/types/project"
import { useApp } from "@/contexts/AppContext"
import { Badge } from "../ui/badge"
import { gsap } from "gsap"
import { getTag, Tag } from "@/types/tag"
import { useRef, useEffect } from "react"
import { MousePointerClickIcon } from "lucide-react"

export function SingleProject({ project }: { project: Project }) {
    const { projectView, setProjectView, selectedTab, setSelectedTab, projects, selectedProject, setSelectedProject } = useApp()
    const isSelected = selectedProject?.id === project.id
    const scrollAnimationRef = useRef<gsap.core.Tween | null>(null)

    useEffect(() => {
      const handleScroll = () => {
        if (scrollAnimationRef.current) {
          scrollAnimationRef.current.kill()
          scrollAnimationRef.current = null
        }
      }

      window.addEventListener('wheel', handleScroll, { passive: true })
       window.addEventListener('touchstart', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('wheel', handleScroll)
        window.removeEventListener('touchstart', handleScroll)
      }
    }, [])

  return (
        <div
          key={project.id}
          className={`relative min-w-[350px] h-[240px] vsm:h-[285px] vmd:h-[335px] vlg:h-[375px] vxl:h-[420px] v2xl:h-[460px] flex flex-col flex-shrink-0 overflow-hidden rounded-2xl bg-glass border-ui-glass transition-all duration-100 [font-family:var(--font-manrope)] ${
            project.status === 'coming-soon'
              ? 'pointer-events-none'
              : isSelected
                ? 'cursor-pointer !bg-[#8455ed]/50 ring-1 ring-primary/50'
                : 'hover:bg-white/10 cursor-pointer'
          }`}
          onClick={() => {
            if (project.status === 'coming-soon') return
            if (isSelected) {
              setSelectedProject(null)
              setProjectView(false)
            } else {
              if (!projectView) setProjectView(true)
              if (selectedTab !== 'Showcase') setSelectedTab('Showcase')
              setSelectedProject(project)
              const scrollProxy = { y: window.pageYOffset }
              scrollAnimationRef.current = gsap.to(scrollProxy, {
                y: 0,
                duration: 1.5,
                overwrite: "auto",
                onUpdate: () => {
                  window.scrollTo(0, scrollProxy.y)
                },
                onComplete: () => {
                  scrollAnimationRef.current = null
                },
              })
            }
          }}
          >
        {/* Header */}
        <div className="relative flex-1 overflow-hidden min-h-0">
            <img
              src={project.card.thumbnail || "/placeholder.svg"}
              alt={project.title}
              className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${project.status === 'coming-soon' ? 'grayscale' : ''}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                const placeholder = document.createElement('div')
                placeholder.className = 'text-muted-foreground text-sm'
                placeholder.textContent = 'Project Image'
                e.currentTarget.parentElement!.appendChild(placeholder)
              }}
            />
            {project.status === 'coming-soon' && (
              <>
                <div className="absolute inset-0 z-10 bg-gray-900/95 opacity-90 grayscale" />
                <p className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-bold opacity-10 text-nowrap">
                  COMING SOON
                </p>
              </>
            )}
          </div>
        {/* Content */}
        <div className="p-6 shrink-0">
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
        <div className="flex items-center gap-2 border-ui-t-glass px-6 py-4 shrink-0">
          {project.laptop.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
          {project.status !== 'coming-soon' && (
            <div className="pointer-events-none ml-auto" aria-hidden>
              <MousePointerClickIcon
                className="h-6 w-6"
                color={`url(#click-icon-gradient-${project.id})`}
              >
                <defs>
                  <linearGradient id={`click-icon-gradient-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#BA9EFF" />
                    <stop offset="100%" stopColor="#8455ED" />
                  </linearGradient>
                </defs>
              </MousePointerClickIcon>
            </div>
          )}
        </div>
      </div>
  )
}
