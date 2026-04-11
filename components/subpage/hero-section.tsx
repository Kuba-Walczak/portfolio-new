'use client'

import { useState } from 'react'
import { VideoModal } from '@/components/subpage/video-modal'
import { Button } from '@/components/ui/button'
import { Project } from '@/types/content'
import { Play } from 'lucide-react'

export function HeroSection({ project }: { project: Project }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <>
      <section
        className="relative flex flex-col items-center justify-center text-center md:text-left px-6 pt-40 pb-32 overflow-hidden mx-auto"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, #1a0a3e 0%, var(--background) 70%)", maxWidth: "calc(100vh * 1.1)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
  <video
    src={project.subpage.showcase.src}
    className="w-full h-full object-cover"
    autoPlay
    loop
    playsInline
    muted
  />
  <div className="absolute inset-0 pointer-events-none
  bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,var(--background-rgba)_0%,var(--background)_100%)]" />
</div>
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-center justify-between gap-12">
          <div className="">
            <h1 className="type-h1 leading-tight whitespace-nowrap relative mb-6 text-center">
              <span className="text-[var(--text-primary)]">{project.title}</span>
            </h1>
            <p
              className="type-h4 text-center w-3/4 mx-auto"
            >
              {project.subpage.description}
            </p>
            <div className="flex justify-center gap-4 xl:flex-row flex-col px-8">
            <Button
              variant="default"
              className={`mt-6 cursor-pointer items-center flex ${project.subpage.link ? '!px-16' : '!px-32 mx-auto'}`}
              onClick={() => setIsPreviewOpen(true)}
            >
              <Play className="size-8" strokeWidth={3} />
            </Button>
            {project.subpage.link && (
              <Button
                variant="default"
                className="mt-6 cursor-pointer items-center flex type-h25"
                onClick={() => window.open(project.subpage.link, '_blank')}
              >
                Learn More
              </Button>
            )}
            </div>
          </div>
        </div>
      </section>
      <VideoModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={project.title}
        description={project.subpage.showcase.caption}
        primarySrc={project.subpage.showcase.src}
      />
    </>
  )
}
