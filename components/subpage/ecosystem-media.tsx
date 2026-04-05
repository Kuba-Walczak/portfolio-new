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
      <div className="flex h-full min-h-44 items-center justify-center bg-[var(--surface-2)] px-4 text-center text-sm text-[var(--text-secondary)]">
        Media unavailable
      </div>
    )
  }

  if (content.type === "image") {
    return (
      <button
          type="button"
          onClick={() => onOpenVideo(content)}
          className="relative block h-52 w-full md:h-56"
        >
        <Image
          src={firstMedia.src}
          alt={content.title}
          fill
          className="object-cover cursor-pointer"
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
        />
      </button>
    )
  }

  if (content.type === "before-after") {
    if (!firstMedia.src) {
      return (
        <div className="flex h-full min-h-44 items-center justify-center bg-[var(--surface-2)] px-4 text-center text-sm text-[var(--text-secondary)]">
          Media unavailable
        </div>
      )
    }

    if (!secondMedia) {
      return (
        <button
          type="button"
          onClick={() => onOpenVideo(content)}
          className="relative block h-52 w-full md:h-56"
        >
          <video
            src={firstMedia.src}
            className="h-full w-full object-cover cursor-pointer"
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
        className="relative block h-52 w-full overflow-hidden md:h-56"
      >
        <div className="absolute inset-0 h-full w-full overflow-hidden [clip-path:inset(0_50%_0_0)]">
          <video
            src={firstMedia.src}
            className="h-full w-full object-cover cursor-pointer"
            muted
            playsInline
            preload="metadata"
          />
        </div>
        <div className="absolute inset-0 h-full w-full overflow-hidden [clip-path:inset(0_0_0_50%)]">
          <video
            src={secondMedia.src}
            className="h-full w-full object-cover cursor-pointer"
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
      className="relative block h-52 w-full md:h-56"
    >
      <video
        src={firstMedia.src}
        className="h-full w-full object-cover cursor-pointer"
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
  const onOpenVideo = (content: Project["subpage"]["gallery"][number]) => {
    setSelectedVideo(content)
  }
  return (  
    <section 
    className="relative px-6 py-20 mx-auto"
    style={{ maxWidth: "calc(100vh * 1.1)" }}>
      <div className="mb-10">
        <h2 className="type-h6">
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
              key={`${content.title}-${index}`}
              className="overflow-hidden rounded-xl p-0 transition duration-200 hover:brightness-110 hover:bg-white/5 cursor-pointer"
              onClick={() => onOpenVideo(content)}
            >
              <MediaPreview content={content} onOpenVideo={setSelectedVideo} />
              <div className="flex items-center gap-3 px-4 py-3">
                <p className="type-h25">{content.title}</p>
                {content.type !== "image" && (
                  <MousePointerClickIcon
                    className="ml-auto h-8 w-8"
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
        title={selectedVideo?.title ?? ""}
        description={
          selectedVideo?.caption ?? "" }
        primarySrc={selectedVideo?.media[0]?.src}
        secondarySrc={selectedVideo?.type === "before-after" ? selectedVideo?.media[1]?.src : undefined}
      />
    </section>
  )
}
