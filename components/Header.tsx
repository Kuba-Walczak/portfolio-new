'use client'

import { gsap } from 'gsap'
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa'
import { FileUser, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useScroll } from '@/hooks/useScroll'

export default function Header() {
  const scrollY = useScroll()
  const hidden = scrollY > 0

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = elementPosition - 80
      const scrollProxy = { y: window.pageYOffset }
      gsap.to(scrollProxy, {
        y: targetPosition,
        duration: 1.5,
        overwrite: 'auto',
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y)
        },
      })
    }
  }

  return (
    <header
      className="fixed top-4 left-1/2 z-50 transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-50%) translateY(${hidden ? 'calc(-100% - 2rem)' : '0'})` }}
    >
      <Card className="flex flex-row items-center p-5 w-fit text-muted-foreground divide-x divide-border backdrop-blur-sm bg-white/5">
        <div className="flex flex-row gap-5 pr-5">
          <FaGithub
            className="w-14 h-14 hover:text-white transition-colors duration-300 cursor-pointer"
            onClick={() => window.open('https://github.com/kuba-walczak', '_blank')}
          />
          <FaLinkedin
            className="w-14 h-14 hover:text-white transition-colors duration-300 cursor-pointer"
            onClick={() => window.open('https://linkedin.com/in/jakubwalczak', '_blank')}
          />
          <FaDiscord
            className="w-14 h-14 hover:text-white transition-colors duration-300 cursor-pointer"
            onClick={() => window.open('https://discord.com/users/1234567890', '_blank')}
          />
        </div>
        <div className="flex flex-row items-center gap-4 px-5 hover:text-white hover:cursor-pointer transition-colors duration-300">
          <FileUser className="w-14 h-14" />
          <p className="text-3xl font-medium">My Resume</p>
        </div>
        <div
          className="flex flex-row items-center gap-4 pl-5 hover:text-white hover:cursor-pointer transition-colors duration-300"
          onClick={() => handleScroll('about')}
        >
          <User className="w-14 h-14" />
          <p className="text-3xl font-medium">About Me</p>
        </div>
      </Card>
    </header>
  )
}
