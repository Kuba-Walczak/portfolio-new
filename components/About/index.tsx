'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useApp } from '@/contexts/AppContext'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'Authentication'] },
  { category: 'Tools', items: ['Git', 'Figma', 'VS Code', 'AWS'] },
]

export default function About() {
  const { setOpenContacts, isMobile } = useApp()
  return (
    <section
    id="about"
    className="mx-auto py-20 px-6"
    style={{ maxWidth: 'calc(100vh * 1.1)' }}>
      <div className="mb-10">
        <h2 className="type-h6">
          About Me
        </h2>
      </div>
      <div className="flex justify-center gap-8">
      <div className="flex flex-col gap-6 xl:w-2/3 w-full bg-glass border-ui-glass rounded-2xl p-8">
            <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Image
                  src="https://PortfolioPullZone.b-cdn.net/pjait-logo.svg?t=2"
                  alt="PJAIT Logo"
                  width={500}
                  height={500}
                  className="rounded-xl bg-glass border-ui-glass w-14 h-14 p-1 vsm:w-16 vsm:h-16 vsm:p-1.5 vmd:w-20 vmd:h-20 vmd:p-2 vlg:w-22 vlg:h-22 vxl:w-24 vxl:h-24"
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
                  className="rounded-xl bg-glass border-ui-glass w-10 h-14 vsm:w-12 vsm:h-16 vmd:w-14 vmd:h-20 vlg:w-15 vlg:h-22 vxl:w-16 vxl:h-24 object-contain"
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
          <div className="flex xl:flex-row flex-col gap-8">
          <Button
              variant="default"
              className="mt-6 inline-flex cursor-pointer gap-2 px-6 py-2 type-h25"
              onClick={() => setOpenContacts(true)}
            >
              View Resume
            </Button>
            <Button
              variant="default"
              className="mt-6 inline-flex cursor-pointer gap-2 px-6 py-2 type-h25"
              onClick={() => setOpenContacts(true)}
            >
              View Contacts
            </Button>
          </div>
          </div>
        {!isMobile && (
          <div className="relative w-1/2 flex bg-glass border-ui-glass rounded-2xl overflow-hidden xl:block hidden">
          <p className="absolute top-1/2 left-1/2 text-center text-accent z-[-10] opacity-15 text-[16rem] vsm:text-[20rem] vmd:text-[24rem] vlg:text-[28rem] vxl:text-[32rem]" style={{ fontFamily: 'var(--font-wdxl-lubrifont-sc)', lineHeight: 1, transform: 'translate(-5%, -67%)', transformOrigin: 'center' }}>
              未<br/>来
            </p>
            <Image
              src="https://PortfolioPullZone.b-cdn.net/LandingPage/FaceForeground.webp"
              alt="About Me"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
    </section>
  )
}
