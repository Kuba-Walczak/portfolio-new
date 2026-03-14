'use client'

import { CustomCanvas } from '@/components/Hero/Laptop/R3F/CustomCanvas'
import { Model } from '@/components/Hero/Laptop/R3F/Model'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'
import { Screen } from '@/components/Hero/Laptop/Screen'
import { ArrowRight } from 'lucide-react'
import { Card } from '../ui/card'
import { gsap } from 'gsap'

export default function Hero() {
  const { projectView, laptopReady } = useApp()
  const scrollY = useScroll()
  const translateX = scrollY * 4000
  const scale = 1 - scrollY * 2

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {  
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = elementPosition - 200
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
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col justify-center gap-8 scroll-mt-20 z-10"
        style={{
          height: 'min(100vh, calc(165vh * 9 / 16))'
        }}
      >
      <div
      className="flex flex-col mx-auto w-fit"
      style={{
        width: 'calc(100vh * 1.2)'
      }}>
      <div 
        className={`w-fit transition-transform duration-100 ease-out ${scrollY > 0.19 || projectView ? 'hidden' : ''}`}
        style={{
          transform: `translateX(${translateX}px) translateY(${translateX / 2}px)`,
          scale: scale
        }}
      >
        <h1 className="text-9xl font-bold text-foreground text-balance leading-tight -ml-2">
          KUBA WALCZAK
        </h1>
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">Role</span>
            <span className="text-2xl font-medium text-foreground">Programmer<span className="mx-2">•</span>Technical Artist</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">Focus</span>
            <span className="text-2xl font-medium text-foreground">Real-time Graphics<span className="mx-2">•</span>Creative Tools</span>
          </div>
          <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">Based in Warsaw<span className="mx-2">•</span>Poland</span>
          <Card
        className="w-fit flex flex-row items-center gap-4 p-8 hover:bg-white/10 hover:cursor-pointer text-muted-foreground hover:text-white transition-colors duration-300"
        onClick={() => handleScroll('projects')}
        >
          <p className="text-4xl font-medium">View Selected Work</p>
          <ArrowRight className="w-8 h-8"/>
        </Card>
        </div>
      </div>
      <div 
        className={`flex flex-col sm:flex-row gap-4 pt-6 w-fit transition-transform duration-100 ease-out ${scrollY > 0.17 || projectView ? 'hidden' : ''}`}
        style={{
          transform: `translateX(${translateX}px)`
        }}
      >
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
            width: 'calc(100vh * 1.018)', 
            height: 'calc(100vh * 0.76)' //previously 0.696
          }}
        >
          <Screen />
        </div>
      )}
    </section>
    </div>
  )
}
