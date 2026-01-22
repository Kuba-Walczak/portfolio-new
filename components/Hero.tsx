'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { CustomCanvas } from '@/components/CustomCanvas'
import { Model } from '@/components/Model'
import { useScroll } from '@/hooks/useScroll'

export default function Hero() {
  const scrollY = useScroll()
  const translateX = scrollY * 1000

  return (
    <section
      id="home"
      className="relative mx-76 py-156 flex flex-col gap-8 scroll-mt-20 bg-red-500"
    >
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center">
      <div 
        className="space-y-6 transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${translateX}px)`
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-muted-foreground text-pretty">
          Programming student by day, 3D artist by night.
        </p>
      </div>
      <div 
        className="flex flex-col sm:flex-row gap-4 pt-6 transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${translateX}px)`
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
      </div>
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
      <CustomCanvas>
        <Model />
      </CustomCanvas>
      </div>
    </section>
  )
}