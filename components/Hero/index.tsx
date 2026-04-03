'use client'

import { HeroCanvas } from '@/components/Hero/R3F/HeroCanvas'
import { Model } from '@/components/Hero/R3F/Model'
import { useScroll } from '@/hooks/useScroll'
import { ArrowRight } from 'lucide-react'
import { Card } from '../ui/card'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../ui/button'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const scrollY = useScroll()

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {  
      const elementPosition = element.getBoundingClientRect().top + window.innerHeight * 0.25
      console.log('elementPosition', elementPosition)
      console.log('window.pageYOffset', window.pageYOffset)
      const targetPosition = elementPosition
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
          height: 'min(100vh, calc(96vh * 9 / 16))'
        }}
      >
      <div
      className={`rounded-2xl flex flex-col mx-auto w-fit transition-opacity duration-500`}
      style={{ width: 'calc(100vh * 1.1)' }}>
      <div className={`w-fit transition-transform duration-100 ease-out relative rounded-2xl w-full origin-center scale-[1.12] vsm:scale-[1.14] vmd:scale-[1.1] vlg:scale-[1.06] vxl:scale-100`}>
        <div className="flex flex-col justify-center gap-4 vsm:gap-5 vmd:gap-6 vlg:gap-7 vxl:gap-8 v2xl:gap-10">
          <div className="flex flex-col gap-1.5 vsm:gap-2 -mb-2 vsm:-mb-2 vmd:-mb-2.5 vlg:-mb-3">
            <h2 className="type-h2">
              Technical Artist
              <span className="mx-2 type-h2">•</span>
              Warsaw, Poland
            </h2>
          </div>
          <h1 className="type-h1 -ml-[0.024em] vsm:-ml-[0.03em] vmd:-ml-[0.04em] vlg:-ml-[0.044em] vxl:-ml-[0.05em] -mt-0.5 vsm:-mt-0.5 vmd:-mt-1 vlg:-mt-1">
            KUBA WALCZAK
          </h1>
          <div className="flex flex-col gap-1.5 vsm:gap-2">
            <h2 className="type-h4">
              Bridging the gap between design and<br/>development through arts and technology
            </h2>
          </div>
          <Button
              variant="default"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 px-6 py-2 type-h25"
              onClick={() => handleScroll('projects')}
            >
              View Portfolio
              <ArrowRight strokeWidth={2.75} className="h-3.5 w-3.5 vsm:h-4 vsm:w-4 vmd:h-5 vmd:w-5 vlg:h-6 vlg:w-6 vxl:h-7 vxl:w-7 v2xl:h-8 v2xl:w-8 !text-secondary"/>
            </Button>
        </div>
      </div>
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
      <HeroCanvas>
        <Model/>
      </HeroCanvas>
      </div>
    </section>
    </div>
  )
}
