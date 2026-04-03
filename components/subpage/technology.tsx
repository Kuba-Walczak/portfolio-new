import { Card } from "@/components/ui/card"
import { Project } from "@/types/project"

export function Technology({ project }: { project: Project }) {
  const items = project.subpage.techStack
  if (!items.length) return null

  const isDense = items.length > 6

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          Technology
        </h2>
        <div
          className="mt-2 h-0.5 w-12"
          style={{ background: "var(--brand-purple)" }}
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {items.map((tech, index) => (
          <Card
            key={`${project.id}-tech-${index}`}
            className={isDense ? "p-4" : "p-6"}
          >
            <p
              className={
                isDense
                  ? "text-sm font-bold text-center text-[var(--text-primary)]"
                  : "text-base font-bold text-center text-[var(--text-primary)]"
              }
            >
              {tech}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
