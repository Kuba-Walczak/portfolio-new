'use client'

import { useState } from 'react'
import { SubpageCanvas } from '@/components/Hero/R3F/SubpageCanvas'
import { VideoModal } from '@/components/subpage/video-modal'
import { Button } from '@/components/ui/button'
import { Project } from '@/types/project'
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
  {/* Gradient overlay */}
  <div className="absolute inset-0 pointer-events-none
  bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,var(--background-rgba)_0%,var(--background)_100%)]" />
</div>
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-center justify-between gap-12">
          <div className="">
            <h1 className="type-h1 leading-tight whitespace-nowrap relative mb-6">
              <span className="text-[var(--text-primary)]">{project.title}</span>
            </h1>
            <p
              className="type-h4"
            >
              {project.subpage.description}
            </p>
            <Button
              variant="default"
              className="mt-6 inline-flex cursor-pointer items-center gap-16 type-h25"
              onClick={() => setIsPreviewOpen(true)}
            >
              Preview
              <Play className="size-5" strokeWidth={3} />
            </Button>
          </div>
          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="w-[320px] h-[260px] sm:w-[420px] sm:h-[320px] md:w-[440px] md:h-[360px]">
              <SubpageCanvas>
                <mesh rotation={[0.25, 0.6, 0]}>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshBasicMaterial/>
                </mesh>
              </SubpageCanvas>
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
