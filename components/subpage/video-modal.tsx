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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} video modal`}
    >
      <div
        className="relative w-full max-w-5xl"
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
            <X className="h-8 w-8"/>
          </button>
        </Card>

        {secondarySrc ? (
          <div className="grid gap-3 md:grid-cols-2">
            <video
              src={primarySrc}
              className="max-h-[80vh] w-full rounded-t-none rounded-b-lg bg-black object-contain"
              controls
              autoPlay
              loop
              playsInline
            />
            <video
              src={secondarySrc}
              className="max-h-[80vh] w-full rounded-t-none rounded-b-lg bg-black object-contain"
              controls
              autoPlay
              loop
              playsInline
            />
          </div>
        ) : (
          <video
            src={primarySrc}
            className="max-h-[80vh] w-full rounded-t-none rounded-b-lg bg-black object-contain"
            controls
            autoPlay
            loop
            playsInline
          />
        )}

      </div>
    </div>
  )
}
