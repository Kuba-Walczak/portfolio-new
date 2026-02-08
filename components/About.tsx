'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'Authentication'] },
  { category: 'Tools', items: ['Git', 'Figma', 'VS Code', 'AWS'] },
]

export default function About() {
  const [aboutOpen, setAboutOpen] = useState(true)
  return (
    <section id="about" className="flex flex-col mx-76 scroll-mt-20">
      <div className={`flex items-center justify-between bg-card border-t rounded-t-2xl px-4 py-1 ${aboutOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
        <p className="text-3xl text-muted-foreground font-bold">
          About Me
        </p>
        {aboutOpen ? (
          <MinusIcon className="w-16 h-16 text-muted-foreground"
        onClick={() => {
          setAboutOpen(!aboutOpen)
        }}/>
        ) : (
          <PlusIcon className="w-16 h-16 text-muted-foreground"
        onClick={() => {
          setAboutOpen(!aboutOpen)
        }}/>
        )}
      </div>
      {aboutOpen && (
      <div className="p-16 border-b border-l border-r rounded-b-2xl bg-black">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with 5+ years of experience building web
              applications. I specialize in creating beautiful, performant, and user-friendly
              digital experiences that solve real problems.
            </p>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When I'm not coding, you can find me exploring new technologies, contributing to
            open-source projects, or sharing knowledge with the developer community.
          </p>
        </div>
        <Image
        src="https://PortfolioPullZone.b-cdn.net/PJA%20photoshoot%20(2).webp"
        alt="About Me"
        width={4000}
        height={4000}
        className="rounded-2xl border"
        />
        </div>
      </div>
    )}
    </section>
  )
}
