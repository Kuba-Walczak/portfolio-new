'use client'

import { useApp } from '@/contexts/AppContext'
import { SingleProject } from './SingleProject'

export default function Projects() {
  const { projects } = useApp()

  return (
    <section
    id="projects"
    className="mx-auto pb-20"
    style={{ maxWidth: 'calc(100vh * 1.1)' }}>
      <div className="mb-10">
        <h2 className="type-h6">
          Projects
        </h2>
      </div>
    <div
    className="flex flex-col gap-16 rounded-2xl">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
        {projects?.map((project) => (
          <SingleProject key={project.id} project={project}/>
        ))}
      </div>
    </div>
    </section>
  )
}
