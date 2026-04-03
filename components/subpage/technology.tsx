import { Card } from "@/components/ui/card"
import { Project } from "@/types/project"

export function Technology({ project }: { project: Project }) {
  const items = project.subpage.techStack
  if (!items.length) return null

  const isDense = items.length > 6

  return (
    <section 
    className="px-6 py-20 mx-auto"
    style={{ maxWidth: "calc(100vh * 1.1)" }}>
      <div className="mb-10">
        <h2 className="type-h6">
          Technology
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 items-stretch">
        {items.map((tech, index) => (
          <Card
            key={`${project.id}-tech-${index}`}
            className={isDense ? "p-4" : "p-6"}
          >
            <p
              className="type-h2 text-center items-center justify-center flex h-full"
            >
              {tech}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
