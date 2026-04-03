'use client'

import { HeroCanvas } from '@/components/Hero/R3F/HeroCanvas'
import { Model } from '@/components/Hero/R3F/Model'
import { useScroll } from '@/hooks/useScroll'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../ui/button'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const scrollY = useScroll()
  const elementTopRef = useRef<number>(0)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const element = document.getElementById("projects")
    if (element) {
      elementTopRef.current = element.getBoundingClientRect().top
    }
  }, [])

  const killScrollAnimation = () => {
    if (scrollTweenRef.current) {
      scrollTweenRef.current.kill()
      scrollTweenRef.current = null
    }
  }

  const handleScrollTo = (targetY: number) => {
    killScrollAnimation()
    const scrollProxy = { y: window.pageYOffset }
    scrollTweenRef.current = gsap.to(scrollProxy, {
      y: targetY,
      duration: 2,
      overwrite: "auto",
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
      onComplete: () => {
        scrollTweenRef.current = null
      },
    })
  }

  return (
      <section
        id="home"
        className="mx-auto h-[75vh] relative flex flex-col justify-center"
    style={{ maxWidth: 'calc(100vh * 1.1)' }}
      >
      <div className={`rounded-2xl flex flex-col w-fit transition-opacity duration-200`}>
      <div className={`w-fit transition-transform duration-100 ease-out relative rounded-2xl w-full origin-center`}>
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
          <div className="gap-1.5 vsm:gap-2">
            <h2 className="type-h4">
              Bridging the gap between design and<br/>development through arts and technology
            </h2>
            <Button
              variant="default"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 px-6 py-2 type-h25"
              onClick={() => handleScrollTo(elementTopRef.current)}
            >
              View Portfolio
              <ArrowRight strokeWidth={3} className="size-6"/>
            </Button>
          </div>
        </div>
      </div>
      </div>
      <div className="absolute inset-0 w-full h-full pointer-events-none">
      <HeroCanvas>
        <Model/>
      </HeroCanvas>
      </div>
    </section>
  )
}
