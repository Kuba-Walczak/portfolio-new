'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { CustomCanvas } from '@/components/Hero/Laptop/CustomCanvas'
import { Model } from '@/components/Hero/Laptop/Model'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'
import { LaptopScreen } from '@/components/Hero/Laptop/LaptopScreen'

export default function Hero() {
  const { projectView, setSelectedTab, laptopReady, selectedTab } = useApp()
  const scrollY = useScroll()
  const translateX = scrollY * 3000

  return (
    <section
      id="home"
      className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex flex-col gap-8 scroll-mt-20 z-10"
      style={{
        height: 'min(100vh, calc(165vh * 9 / 16))'
      }}
    >
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center">
      {/* <div 
        className="space-y-6 transition-transform duration-100 ease-out"
        style={{
          transform: `translateX(${translateX}px)`,
          opacity: scrollY > 0.185 || projectView ? 0 : 1
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Computer Science Student with a passion for 3D Art.
        </p>
      </div>
      <div 
        className="flex flex-col sm:flex-row gap-4 pt-6 transition-transform duration-100 ease-out"
        style={{
          transform: `translateX(${translateX}px)`,
          opacity: scrollY > 0.185 || projectView ? 0 : 1
        }}
      >
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Contact Me
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-foreground text-foreground hover:bg-secondary bg-transparent"
        >
          My Projects
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div> */}
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
      <CustomCanvas>
        <Model />
      </CustomCanvas>
      </div>
      <div style={{ opacity: laptopReady ? 1 : 0 }}>
      <div 
        className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          width: 'calc(100vh * 0.94)', 
          height: 'calc(100vh * 0.64)' 
        }}
      >
        <LaptopScreen />
      </div>
      </div>
    </section>
  )
}
