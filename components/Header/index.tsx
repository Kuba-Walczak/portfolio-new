'use client'

import { gsap } from 'gsap'
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa'
import { FileUser, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useScroll } from '@/hooks/useScroll'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Contacts from './Contacts'
import { useApp } from '@/contexts/AppContext'
import { useEffect, useRef } from 'react'

export default function Header() {
  const headerRef = useRef<number>(0)
  const { projectView } = useApp()
  const scrollY = useScroll()
  const fadeStart = 0.62
  const fadeEnd = 0.78
  const fadeProgress = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)))
  const headerBg = `rgba(21, 21, 32, ${fadeProgress})`


  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById('projects')
      if (!element) return
      headerRef.current = element.getBoundingClientRect().top
    }, 1000)
  }, [])

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {  
      const elementPosition = headerRef.current + window.innerHeight * 0.25
      const targetPosition = elementPosition
      const scrollProxy = { y: window.pageYOffset }
      gsap.to(scrollProxy, {
        y: targetPosition,
        duration: 2,
        overwrite: "auto",
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y)
        },
      })
    }
  }

  const handleScrollToTop = () => {
    const targetPosition = 0
    const scrollProxy = { y: window.pageYOffset }
    gsap.to(scrollProxy, {
      y: targetPosition,
      duration: 2,
      overwrite: "auto",
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
    })
  }

  const handleScrollToEnd = () => {
    const targetPosition = document.documentElement.scrollHeight - window.innerHeight
    const scrollProxy = { y: window.pageYOffset }
    gsap.to(scrollProxy, {
      y: targetPosition,
      duration: 2,
      overwrite: 'auto',
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
    })
  }

  const NAV_ITEMS = [
    { label: 'Home', sectionId: 'home', scrollTo: handleScrollToTop },
    { label: 'Projects', sectionId: 'projects', scrollTo: handleScrollToSection },
    { label: 'About', sectionId: 'about', scrollTo: handleScrollToEnd },
    { label: 'Contact', sectionId: 'contact', scrollTo: handleScrollToSection },
  ] as const

  return (
    <header
      className={`pointer-events-none fixed left-0 top-3 z-50 flex w-full justify-center vsm:top-4 vmd:top-5 vlg:top-6 transition-all duration-1000 ${projectView ? 'opacity-0' : 'opacity-100'}`}
    >
      <Card
        className="pointer-events-auto divide-ui-x-glass flex w-fit flex-row items-center bg-glass px-3 py-2.5 text-muted-foreground vsm:px-3.5 vsm:py-3 vmd:px-4.5 vmd:py-3.5 vlg:px-5 vlg:py-4"
        style={{ backgroundColor: headerBg }}
      >
      <nav
          aria-label="Primary"
          className="flex flex-row items-stretch"
        >
          {NAV_ITEMS.map(({ label, sectionId, scrollTo }) => (
            <button
              key={sectionId}
              type="button"
              className="flex items-center cursor-pointer rounded-sm px-3.5 py-1.5 text-base font-medium vsm:text-lg vmd:px-4 vmd:py-2 vmd:text-xl vlg:px-4.5 vlg:py-2.5 vlg:text-2xl transition-colors duration-200 first:pl-3 last:pr-3 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              onClick={() => scrollTo(sectionId)}
            >
              {label}
            </button>
          ))}
        </nav>
      </Card>
    </header>
  )
}
