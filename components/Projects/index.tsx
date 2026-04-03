'use client'

import { useApp } from '@/contexts/AppContext'
import { SingleProject } from './SingleProject'

export default function Projects() {
  const { projects } = useApp()

  return (
    <section
    id="projects"
    className="mx-auto scroll-mt-20"
    style={{ maxWidth: 'calc(100vh * 1.1)' }}>
    <div
    className="flex flex-col gap-16 p-8 rounded-2xl bg-glass border-ui-glass backdrop-blur-xl">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4">
        {projects?.map((project) => (
          <SingleProject key={project.id} project={project}/>
        ))}
      </div>
    </div>
    </section>
  )
}
