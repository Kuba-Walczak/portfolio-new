'use client'

import { CustomCanvas } from '@/components/Hero/Laptop/R3F/CustomCanvas'
import { Model } from '@/components/Hero/Laptop/R3F/Model'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'
import { Screen } from '@/components/Hero/Laptop/Screen'
import { ArrowRight } from 'lucide-react'
import { Card } from '../ui/card'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { projectView, laptopReady } = useApp()
  const scrollY = useScroll()
  const contentRef = useRef<HTMLDivElement>(null)

  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!contentRef.current) return

    if (scrollY >= 0.1 && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      gsap.to(contentRef.current, {
        x: '+=100%',
        duration: 1
      })
    } else if (scrollY < 0.1 && hasAnimatedRef.current) {
      hasAnimatedRef.current = false
      gsap.to(contentRef.current, {
        x: '0%',
        duration: 1
      })
    }
  }, [scrollY])

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {  
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = elementPosition + 200
      const scrollProxy = { y: window.pageYOffset }
      gsap.to(scrollProxy, {
        y: targetPosition,
        duration: 3,
        overwrite: "auto",
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y)
        },
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <section
        id="home"
        className="absolute top-1/2 left-0 right-0 z-10 flex -translate-y-1/2 scroll-mt-20 flex-col justify-center gap-5 vsm:gap-7 vmd:gap-8 vlg:gap-9 vxl:gap-10 v2xl:gap-12"
        style={{
          height: 'min(100vh, calc(165vh * 9 / 16))'
        }}
      >
      <div
      className={`flex flex-col mx-auto w-fit transition-opacity duration-500 ${projectView || scrollY > 0.2 ? 'hidden' : ''}`}
      style={{
        width: 'calc(100vh * 1.2)',
        clipPath: scrollY > 0.2 ? 'inset(-40px 75% -40px -40px)' : scrollY > 0.1 ? 'inset(-40px 50% -40px -40px)' : 'inset(-40px 25% -40px -40px)',
    
      }}>
      <div 
        ref={contentRef}
        className={`w-fit transition-transform duration-100 ease-out relative`}
      >
        <h1 className="mb-3 text-balance text-4xl font-bold leading-[0.8] text-foreground vsm:mb-4 vsm:text-6xl vmd:mb-5 vmd:text-7xl vlg:mb-6 vlg:-ml-1 vlg:text-[5.5rem] vxl:mb-7 vxl:-ml-1 vxl:text-[6.5rem] v2xl:-ml-2 v2xl:mb-8 v2xl:text-[8rem]">
          KUBA WALCZAK
        </h1>
        <div className="flex flex-col justify-center gap-4 vsm:gap-5 vmd:gap-6 vlg:gap-7 vxl:gap-8 v2xl:gap-10">
          <div className="flex flex-col gap-1.5 vsm:gap-2">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 vsm:text-sm vmd:text-base vlg:text-base vxl:text-2xl v2xl:text-lg">Technical Artist<span className="mx-2 text-muted-foreground/40 vsm:mx-3">•</span>Warsaw, Poland</h2>
          </div>
          <div className="flex flex-col gap-1.5 vsm:gap-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 vsm:text-sm vmd:text-base vlg:text-base vxl:text-lg v2xl:text-lg">Focus</h3>
            <h2 className="text-lg font-medium tracking-tight text-foreground vsm:text-xl vmd:text-3xl vlg:text-3xl vxl:text-4xl v2xl:text-5xl">Real-time Graphics<span className="mx-2 text-muted-foreground/40 vsm:mx-3">•</span>Creative Tools</h2>
          </div>
          <Card
            className="flex w-fit flex-row items-center gap-2.5 p-3 text-muted-foreground transition-colors duration-300 hover:cursor-pointer hover:bg-white/5 hover:text-white vsm:gap-3 vsm:p-4 vmd:gap-4 vmd:p-5 vlg:gap-5 vlg:p-6 vxl:gap-6 vxl:p-7 v2xl:gap-8 v2xl:p-10"
            onClick={() => handleScroll('projects')}
          >
            <p className="text-base font-medium vsm:text-xl vmd:text-3xl vlg:text-3xl vxl:text-4xl v2xl:text-5xl">View Selected Work</p>
            <ArrowRight className="h-4 w-4 vsm:h-5 vsm:w-5 vmd:h-7 vmd:w-7 vlg:h-8 vlg:w-8 vxl:h-9 vxl:w-9 v2xl:h-10 v2xl:w-10"/>
          </Card>
        </div>
      </div>
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
      <CustomCanvas>
        <Model/>
      </CustomCanvas>
      </div>
      {laptopReady && (
        <div 
          className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ 
            width: 'calc(100vh * 1.04)', //previously 1.018
            height: 'calc(100vh * 0.78)' //previously 0.76
          }}
        >
          <Screen />
        </div>
      )}
    </section>
    </div>
  )
}
