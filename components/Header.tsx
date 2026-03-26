'use client'

import { gsap } from 'gsap'
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa'
import { FileUser, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function Header() {
  const scrollY = useScroll()
  const { projectView } = useApp()
  const hidden = scrollY > 0

  if (projectView) return null

  const handleScroll = (id: string) => {
    const targetPosition = document.documentElement.scrollHeight - window.innerHeight
    const scrollProxy = { y: window.pageYOffset }
    gsap.to(scrollProxy, {
      y: targetPosition,
      duration: 5,
      overwrite: 'auto',
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
    })
  }

  return (
    <header
      className="fixed left-1/2 top-3 z-50 transition-transform duration-500 ease-in-out vsm:top-4 vmd:top-5 vlg:top-6"
      style={{ transform: `translateX(-50%) translateY(${hidden ? 'calc(-100% - 2rem)' : '0'})` }}
    >
      <Card className="flex w-fit flex-row items-center divide-x bg-white/3 p-2 text-muted-foreground backdrop-blur-sm vsm:p-4 vmd:p-5 vlg:p-6 vxl:p-7 v2xl:p-8">
        <div className="flex flex-row gap-2 pr-2 vsm:gap-4 vsm:pr-4 vmd:gap-5 vmd:pr-5 vlg:gap-6 vlg:pr-6 vxl:gap-6 vxl:pr-7 v2xl:gap-7 v2xl:pr-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <FaGithub
                className="h-5 w-5 cursor-pointer transition-colors duration-300 hover:text-white vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16"
                onClick={() => window.open('https://github.com/kuba-walczak', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>GitHub</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaLinkedin
                className="h-5 w-5 cursor-pointer transition-colors duration-300 hover:text-white vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16"
                onClick={() => window.open('https://linkedin.com/in/jakubwalczak', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>LinkedIn</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaDiscord
                className="h-5 w-5 cursor-pointer transition-colors duration-300 hover:text-white vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16"
                onClick={() => window.open('https://discord.com/users/1234567890', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>Discord</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-row items-center gap-2 pl-2 vsm:gap-4 vsm:pl-4 vmd:gap-5 vmd:pl-5 vlg:gap-6 vlg:pl-6 vxl:gap-6 vxl:pl-7 v2xl:gap-7 v2xl:pl-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-row items-center transition-colors duration-300 hover:cursor-pointer hover:text-white">
                <FileUser className="h-5 w-5 vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>Resume</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex flex-row items-center hover:text-white hover:cursor-pointer transition-colors duration-300"
                onClick={() => handleScroll('about')}
              >
                <User className="h-5 w-5 vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>About</TooltipContent>
          </Tooltip>
        </div>
      </Card>
    </header>
  )
}
