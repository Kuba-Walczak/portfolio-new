import { Card } from "@/components/ui/card"
import { Project } from "@/types/project";
import { Brain, Shield, Zap, Network, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Neural Synchronization",
    description:
      "Real-time synchronization between edge nodes and core intelligence centers, ensuring sub-10ms latency for global operations.",
  },
  {
    icon: Shield,
    title: "Quantum Encryption",
    description:
      "End-to-end security protocols utilizing lattice-based cryptography for future-proof data protection.",
  },
  {
    icon: Zap,
    title: "Supersonic Processing",
    description: "Optimized for high-frequency data streams and massive parallelization.",
  },
  {
    icon: Network,
    title: "Decentralized Mesh",
    description: "Self-healing network architecture that scales dynamically with demand.",
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description: "Autonomous optimization routines that evolve based on environmental feedback.",
  },
]

function FeatureIcon({ Icon }: { Icon: React.ElementType<{ className?: string; style?: React.CSSProperties }>
}) {
  return (
    <div
      className="h-10 w-10 rounded-lg flex items-center justify-center mb-4"
    >
      <Icon className="h-8 w-8 text-[var(--secondary)]" />
    </div>
  )
}

export function CoreArchitecture({ project }: { project: Project | undefined}) {
  const isDense = project?.subpage?.feature.length && project?.subpage?.feature.length > 6

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          Core Architecture
        </h2>
        <div className="mt-2 h-0.5 w-12" style={{ background: "var(--brand-purple)" }} />
      </div>

      {/* Responsive feature grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {project?.subpage?.feature.map((feature) => (
          <Card
            key={feature.title}
            className={isDense ? "p-4" : "p-6"}
          >
            <FeatureIcon Icon={feature.icon as unknown as React.ElementType<{ className?: string; style?: React.CSSProperties }>} />
            <h3
              className={
                isDense
                  ? "text-sm font-bold mb-2 text-[var(--text-primary)]"
                  : "text-base font-bold mb-2 text-[var(--text-primary)]"
              }
            >
              {feature.title}
            </h3>
            <p
              className={
                isDense
                  ? "text-xs leading-relaxed text-[var(--text-secondary)]"
                  : "text-sm leading-relaxed text-[var(--text-secondary)]"
              }
            >
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
