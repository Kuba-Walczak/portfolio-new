"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, X } from "lucide-react"

type VideoModalProps = {
  isOpen: boolean
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
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

function preloadMedia(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (getMediaType(src) === "image") {
      const image = new Image()
      image.onload = () => resolve()
      image.onerror = () => resolve()
      image.src = src
      return
    }

    const video = document.createElement("video")
    video.preload = "metadata"

    let timeout: ReturnType<typeof setTimeout>

    const done = () => {
      clearTimeout(timeout)
      resolve()
    }

    video.onloadedmetadata = done
    video.onloadeddata = done
    video.oncanplay = done
    video.onerror = done

    // Safari fallback: onloadeddata may never fire with preload="metadata"
    timeout = setTimeout(resolve, 3000)

    video.src = src
  })
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
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  title,
  description,
  primarySrc,
  secondarySrc,
}: VideoModalProps) {
  const [isMediaReady, setIsMediaReady] = useState(false)
  const modalDescription = description ?? "Video preview"
  const hasInlineMarkup = modalDescription.includes("<span")

  useLayoutEffect(() => {
    if (!isOpen || !primarySrc) return
    // Reset synchronously before paint to avoid old title/caption flashing.
    setIsMediaReady(false)
  }, [isOpen, primarySrc, secondarySrc])

  useEffect(() => {
    if (!isOpen || !primarySrc) {
      setIsMediaReady(false)
      return
    }

    let cancelled = false

    const sourcesToLoad = [primarySrc, secondarySrc].filter(
      (src): src is string => Boolean(src),
    )

    Promise.all(sourcesToLoad.map(preloadMedia)).then(() => {
      if (!cancelled) setIsMediaReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [isOpen, primarySrc, secondarySrc])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft" && hasPrev) onPrev?.()
      if (event.key === "ArrowRight" && hasNext) onNext?.()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [hasNext, hasPrev, isOpen, onClose, onNext, onPrev])

  if (!isOpen || !primarySrc) return null

  const mediaClassName = "max-h-[80vh] w-full rounded-t-none rounded-b-[var(--bevel-lg)] bg-black object-contain"

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
        <Card className="relative rounded-b-none p-6 bg-background text-justify">
          {isMediaReady ? (
            <>
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
            </>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="Close modal"
          >
            <X className="h-8 w-8 cursor-pointer" />
          </button>
        </Card>

        <div className="relative">
          {isMediaReady ? (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-4">
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev}
                className="pointer-events-auto rounded-full text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)] disabled:pointer-events-none disabled:opacity-0 cursor-pointer"
                aria-label="Show previous gallery item"
              >
                <ArrowLeft className="h-8 w-8" />
              </button>

              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                className="pointer-events-auto rounded-full text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)] disabled:pointer-events-none disabled:opacity-0 cursor-pointer"
                aria-label="Show next gallery item"
              >
                <ArrowRight className="h-8 w-8" />
              </button>
            </div>
          ) : null}

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
    </div>
  )
}
