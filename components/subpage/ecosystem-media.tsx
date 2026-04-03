"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { VideoModal } from "@/components/subpage/video-modal"
import { Project } from "@/types/project"
import { MousePointerClick as MousePointerClickIcon } from "lucide-react"
import Image from "next/image"

function MediaPreview({
  content,
  onOpenVideo,
}: {
  content: Project["subpage"]["gallery"][number]
  onOpenVideo: (content: Project["subpage"]["gallery"][number]) => void
}) {
  const firstMedia = content.media[0]
  const secondMedia = content.media[1]

  if (!firstMedia) {
    return (
      <div className="flex h-full min-h-44 items-center justify-center bg-[var(--surface-2)] px-4 text-center text-sm text-[var(--text-secondary)] cursor-pointer">
        Media unavailable
      </div>
    )
  }

  if (content.type === "image") {
    return (
      <div className="relative h-52 w-full md:h-56">
        <Image
          src={firstMedia.src}
          alt={content.caption}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
    )
  }

  if (content.type === "before-after") {
    if (!firstMedia.src) {
      return (
        <div className="flex h-full min-h-44 items-center justify-center bg-[var(--surface-2)] px-4 text-center text-sm text-[var(--text-secondary)] cursor-pointer">
          Media unavailable
        </div>
      )
    }

    if (!secondMedia) {
      return (
        <button
          type="button"
          onClick={() => onOpenVideo(content)}
          className="relative block h-52 w-full md:h-56 cursor-pointer"
          aria-label={`Open ${content.caption} video`}
        >
          <video
            src={firstMedia.src}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
        </button>
      )
    }

    return (
      <button
        type="button"
        onClick={() => onOpenVideo(content)}
        className="relative block h-52 w-full overflow-hidden md:h-56 cursor-pointer"
        aria-label={`Open ${content.caption} video`}
      >
        <div className="absolute inset-0 h-full w-full overflow-hidden [clip-path:inset(0_50%_0_0)]">
          <video
            src={firstMedia.src}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        </div>
        <div className="absolute inset-0 h-full w-full overflow-hidden [clip-path:inset(0_0_0_50%)]">
          <video
            src={secondMedia.src}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onOpenVideo(content)}
      className="relative block h-52 w-full md:h-56 cursor-pointer"
      aria-label={`Open ${content.caption} video`}
    >
      <video
        src={firstMedia.src}
        className="h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </button>
  )
}

export function EcosystemMedia({ project }: { project: Project }) {
  const gallery = project.subpage.gallery
  const [selectedVideo, setSelectedVideo] = useState<Project["subpage"]["gallery"][number] | null>(null)

  return (
    <section className="relative px-6 py-20 max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          Gallery
        </h2>
      </div>

      {gallery.length === 0 ? (
        <Card className="rounded-xl px-5 py-8 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            No media available for this project yet.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.map((content, index) => (
            <Card
              key={`${content.caption}-${index}`}
              className="overflow-hidden rounded-xl p-0 transition duration-200 hover:brightness-120"
            >
              <MediaPreview content={content} onOpenVideo={setSelectedVideo} />
              <div className="flex items-center gap-3 px-4 py-3">
                <p className="text-base font-bold text-[var(--text-primary)]">{content.caption}</p>
                {content.type !== "image" && (
                  <MousePointerClickIcon
                    className="ml-auto h-6 w-6"
                    color={`url(#ecosystem-media-icon-gradient-${project.id}-${index})`}
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id={`ecosystem-media-icon-gradient-${project.id}-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="var(--secondary)" />
                        <stop offset="100%" stopColor="var(--primary)" />
                      </linearGradient>
                    </defs>
                  </MousePointerClickIcon>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <VideoModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.caption ?? "Media preview"}
        description={
          selectedVideo?.type === "before-after"
            ? "Before-and-after comparison clip."
            : "Media preview clip."
        }
        primarySrc={selectedVideo?.media[0]?.src}
        secondarySrc={selectedVideo?.type === "before-after" ? selectedVideo?.media[1]?.src : undefined}
      />
    </section>
  )
}
