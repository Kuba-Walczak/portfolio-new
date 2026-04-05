"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

type VideoModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  primarySrc?: string
  secondarySrc?: string
}

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"]

function getMediaType(src: string): "image" | "video" {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase() ?? ""
  return IMAGE_EXTENSIONS.includes(ext) ? "image" : "video"
}

function MediaItem({ src, className }: { src: string; className: string }) {
  if (getMediaType(src) === "image") {
    return (
      <img
        src={src}
        alt=""
        className={className}
      />
    )
  }

  return (
    <video
      src={src}
      className={className}
      controls
      autoPlay
      loop
      playsInline
    />
  )
}

export function VideoModal({
  isOpen,
  onClose,
  title,
  description,
  primarySrc,
  secondarySrc,
}: VideoModalProps) {
  const modalDescription = description ?? "Video preview"
  const hasInlineMarkup = modalDescription.includes("<span")

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !primarySrc) return null

  const mediaClassName = "max-h-[80vh] w-full rounded-t-none rounded-b-lg bg-black object-contain"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} video modal`}
    >
      <div
        className="relative"
        style={{ maxWidth: "calc(100vh * 1.1)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <Card className="relative rounded-b-none p-6 pr-32 bg-background">
          <h3 className="type-h25 mb-2">{title}</h3>
          {hasInlineMarkup ? (
            <p
              className="type-h4"
              dangerouslySetInnerHTML={{ __html: modalDescription }}
            />
          ) : (
            <p className="type-h4">
              {modalDescription}
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="Close modal"
          >
            <X className="h-8 w-8 cursor-pointer" />
          </button>
        </Card>

        {secondarySrc ? (
          <div className="grid gap-3 md:grid-cols-2">
            <MediaItem src={primarySrc} className={mediaClassName} />
            <MediaItem src={secondarySrc} className={mediaClassName} />
          </div>
        ) : (
          <MediaItem src={primarySrc} className={mediaClassName} />
        )}
      </div>
    </div>
  )
}