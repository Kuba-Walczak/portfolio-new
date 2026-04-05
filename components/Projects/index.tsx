'use client'

import { useApp } from '@/contexts/AppContext'
import { SingleProject } from './SingleProject'
import { Card } from "@/components/ui/card"

export default function Projects() {
  const { projects, isLoading } = useApp()

  return (
    <section
    id="projects"
    className="mx-auto pb-20 px-6"
    style={{ maxWidth: 'calc(100vh * 1.1)' }}>
      <div className="mb-10">
        <h2 className="type-h6">
          Projects
        </h2>
      </div>
    <div
    className="flex flex-col gap-16 rounded-2xl">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card
            key={i}
            className="w-full animate-pulse h-[240px] vsm:h-[285px] vmd:h-[335px] vlg:h-[375px] vxl:h-[420px] v2xl:h-[460px]"
            style={{ animationDuration: '0.8s' }}>
            </Card>
          ))
        ) : (
          projects?.map((project) => (
            <SingleProject key={project.id} project={project}/>
          ))
        )}
      </div>
    </div>
    </section>
  )
}
