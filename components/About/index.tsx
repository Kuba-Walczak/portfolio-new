'use client'

import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'Authentication'] },
  { category: 'Tools', items: ['Git', 'Figma', 'VS Code', 'AWS'] },
]

export default function About() {
  return (
    <section
    id="about"
    className="mx-auto scroll-mt-20"
    style={{ maxWidth: 'calc(100vh * 1.2)' }}>
      <div className="flex items-center justify-center gap-16 p-16">
      <div className="flex flex-col gap-6">
            <div className="flex items-center gap-8">
            <h2 className="text-7xl font-bold">
              Hi, I'm Jacob
            </h2>
            <Image
        src="https://PortfolioPullZone.b-cdn.net/pjait-logo.svg?t=2"
        alt="About Me"
        width={500}
        height={500}
        className="rounded-xl bg-white/5 border w-24 h-24 p-2"
        />
            </div>
            <div className="flex flex-col gap-1">
            <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">About Me</span>
            <p className="text-2xl font-medium leading-relaxed text-justify">
            My name's Jacob and I'm a full-time CS student at PJAIT.
            Throughout my life I've tinkered with various forms of creative expression, such as video editing, music and animation.
            Ultimately what I've found to love most is creating visuals that rely on complex systems to create amazing experiences that don't just look cool, but work in a bigger environment and perform well.
            Thank you for checking out my website!
            </p>
            </div>
            <div className="flex flex-col gap-1">
            <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">Education</span>
            <span className="text-2xl font-medium text-foreground leading-relaxed">Computer Science<span className="mx-2">•</span>PJAIT<br/>2024<span className="mx-2">→</span>Present</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">Location</span>
            <span className="text-2xl font-medium text-foreground leading-relaxed">Warsaw<span className="mx-2">•</span>Poland</span>
          </div>
          </div>
        <Image
        src="https://PortfolioPullZone.b-cdn.net/LandingPage/FaceForeground.webp"
        alt="About Me"
        width={500}
        height={500}
        className="rounded-2xl bg-white/5 border"
        />
      </div>
    </section>
  )
}
