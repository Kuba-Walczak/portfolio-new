"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { VideoModal } from "@/components/subpage/video-modal"
import { Project } from "@/types/project"
import { MousePointerClick as MousePointerClickIcon, Pointer as PointerIcon } from "lucide-react"

function MediaPreview({
  content,
  onOpenVideo,
}: {
  content: Project["subpage"]["gallery"][number]
  onOpenVideo: () => void
}) {
  const isSafari = (() => {
    const ua = navigator.userAgent;
    const isIOS = /iP(ad|hone|od)/.test(ua);
    const isMac = /Macintosh/.test(ua);
    const isWebKit = /AppleWebKit/.test(ua);
    const isChrome = /CriOS|Chrome/.test(ua);
    const isEdge = /Edg\//.test(ua);
  
    return isWebKit && !isChrome && !isEdge && (isIOS || isMac);
  })();
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
          onClick={onOpenVideo}
          className="relative block h-52 w-full md:h-56"
        >
        <img
          src={firstMedia.src}
          alt={content.title}
          className="object-cover h-full w-full cursor-pointer"
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
          onClick={onOpenVideo}
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
        onClick={onOpenVideo}
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
      onClick={onOpenVideo}
      className="relative block h-52 w-full md:h-56"
    >
      {isSafari ? (
       <video
       src={firstMedia.src}
       className="h-full w-full object-cover cursor-pointer"
       muted
       playsInline
        poster={content.poster}
      />
      ) : (
        <video
          src={firstMedia.src}
          className="h-full w-full object-cover cursor-pointer"
          muted
          playsInline
          preload="metadata"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </button>
  )
}

export function EcosystemMedia({ project }: { project: Project }) {
  const isPhone = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const gallery = project.subpage.gallery
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedVideo = selectedIndex !== null ? gallery[selectedIndex] : null
  const hasPrev = selectedIndex !== null && selectedIndex > 0
  const hasNext = selectedIndex !== null && selectedIndex < gallery.length - 1

  const onOpenVideo = (index: number) => {
    setSelectedIndex(index)
  }

  const onPrev = () => {
    if (!hasPrev || selectedIndex === null) return
    setSelectedIndex(selectedIndex - 1)
  }

  const onNext = () => {
    if (!hasNext || selectedIndex === null) return
    setSelectedIndex(selectedIndex + 1)
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
        <Card className="rounded-[var(--bevel-xl)] px-5 py-8 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            No media available for this project yet.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.map((content, index) => (
            <Card
              key={`${content.title}-${index}`}
              className="overflow-hidden rounded-[var(--bevel-xl)] p-0 transition duration-200 hover:brightness-110 hover:bg-white/5 cursor-pointer"
              onClick={() => onOpenVideo(index)}
            >
              <MediaPreview content={content} onOpenVideo={() => onOpenVideo(index)} />
              <div className="flex items-center gap-3 px-4 py-3">
                <p className="type-h25">{content.title}</p>
                  {isPhone ? (
                    <PointerIcon
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
                    </PointerIcon>
                  ) : (
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
        onClose={() => setSelectedIndex(null)}
        onPrev={onPrev}
        onNext={onNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
        title={selectedVideo?.title ?? ""}
        description={
          selectedVideo?.caption ?? "" }
        primarySrc={selectedVideo?.media[0]?.src}
        secondarySrc={selectedVideo?.type === "before-after" ? selectedVideo?.media[1]?.src : undefined}
      />
    </section>
  )
}
