'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
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
    style={{ maxWidth: 'calc(100vh * 1.1)' }}>
      <div className="flex justify-center gap-16 p-8 py-32 bg-white/3 backdrop-blur-xl">
      <div className="flex flex-col gap-6 w-2/3">
            <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src="https://PortfolioPullZone.b-cdn.net/pjait-logo.svg?t=2"
                  alt="PJAIT Logo"
                  width={500}
                  height={500}
                  className="border-ui-glass rounded-xl bg-glass w-24 h-24 p-2"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Student of the Polish-Japanese Academy of Information Technology</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src="https://PortfolioPullZone.b-cdn.net/mirai-logo.webp"
                  alt="Mirai Logo"
                  width={500}
                  height={500}
                  className="border-ui-glass rounded-xl bg-glass w-16 h-24 object-contain"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Member of the PJAIT Student Council</p>
              </TooltipContent>
            </Tooltip>
            </div>
            <h2 className="type-h1">
              Hi, I'm Kuba
            </h2>
            </div>
            <div className="flex flex-col gap-1">
            <span className="type-h25">About Me</span>
            <p className="type-h4 text-justify">
            My name's Jacob and I'm a full-time CS student at PJAIT.
            Throughout my life I've tinkered with various forms of creative expression, such as video editing, music and animation.
            Ultimately what I've found to lov
            </p>
            </div>
            <div className="flex flex-col gap-1">
            <span className="type-h25">Education</span>
            <span className="type-h4">Computer Science<span className="mx-2 type-h4">•</span>PJAIT<br/>2024<span className="mx-2 type-h4">→</span>Present</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="type-h25">Location</span>
            <span className="type-h4">Warsaw<span className="mx-2 type-h4">•</span>Poland</span>
          </div>
          </div>
        <div className="border-ui-glass relative w-1/2 flex bg-glass backdrop-blur-ui rounded-2xl overflow-hidden">
        <p className="absolute top-1/2 left-1/2 text-center text-foreground/20 z-[-10] opacity-5" style={{ fontFamily: 'var(--font-wdxl-lubrifont-sc)', fontSize: '32rem', lineHeight: 1, transform: 'translate(-5%, -65%)', transformOrigin: 'center' }}>
            未<br/>来
          </p>
          <Image
            src="https://PortfolioPullZone.b-cdn.net/LandingPage/FaceForeground.webp"
            alt="About Me"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  )
}
