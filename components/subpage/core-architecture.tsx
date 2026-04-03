import { Card } from "@/components/ui/card"
import { Project } from "@/types/project"
import * as LucideIcons from "lucide-react"

function toPascalCaseIconName(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("")
}

function resolveLucideIcon(iconName: string) {
  const normalizedName = toPascalCaseIconName(iconName)
  const Icon =
    LucideIcons[iconName as keyof typeof LucideIcons] ??
    LucideIcons[normalizedName as keyof typeof LucideIcons] ??
    LucideIcons.Sparkles

  return Icon as React.ElementType<{
    className?: string
    style?: React.CSSProperties
    stroke?: string
    color?: string
    children?: React.ReactNode
  }>
}

/** Lucide viewBox is 0 0 24 24 — userSpaceOnUse keeps stroke gradients stable across all paths/lines. */
const LUCIDE_VIEWBOX = 24

function FeatureIcon({
  Icon,
  gradientId,
}: {
  Icon: React.ElementType<{ className?: string; style?: React.CSSProperties; stroke?: string; color?: string; fill?: string; children?: React.ReactNode }>
  gradientId: string
}) {
  const gradientUrl = `url(#${gradientId})`

  return (
    <div
      className="h-10 w-10 rounded-lg flex items-center justify-center mb-4 text-[var(--primary)]"
    >
      <Icon
        className="h-8 w-8 [&_circle]:stroke-[inherit] [&_ellipse]:stroke-[inherit] [&_line]:stroke-[inherit] [&_path]:stroke-[inherit] [&_polygon]:stroke-[inherit] [&_polyline]:stroke-[inherit] [&_rect]:stroke-[inherit]"
        color={gradientUrl}
        fill="none"
        stroke={gradientUrl}
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={LUCIDE_VIEWBOX}
            y2={LUCIDE_VIEWBOX}
          >
            <stop offset="0%" stopColor="var(--secondary)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
        </defs>
      </Icon>
    </div>
  )
}

export function CoreArchitecture({ project }: { project: Project }) {
  const isDense = project.subpage.feature.length > 6

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto">
      {/* Section header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          Features
        </h2>
        <div className="mt-2 h-0.5 w-12" style={{ background: "var(--brand-purple)" }} />
      </div>

      {/* Responsive feature grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {project.subpage.feature.map((feature) => {
          const Icon = resolveLucideIcon(feature.icon)

          return (
            <Card
              key={feature.title}
              className={isDense ? "p-4" : "p-6"}
            >
              <FeatureIcon
                Icon={Icon}
                gradientId={`core-architecture-icon-gradient-${project.id}-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
              />
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
          )
        })}
      </div>
    </section>
  )
}
