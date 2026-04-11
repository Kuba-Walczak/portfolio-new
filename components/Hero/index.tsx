'use client'

import { HeroCanvas } from '@/components/Hero/R3F/HeroCanvas'
import { Model } from '@/components/Hero/R3F/Model'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../ui/button'
import { useEffect, useRef } from 'react'
import { useApp } from "@/contexts/AppContext"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { animationReady, isMobile, content } = useApp()
  const heroContainerRef = useRef<HTMLDivElement>(null)
  const elementTopRef = useRef<number>(0)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null)
  const isPhone = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

  useEffect(() => {
    const element = document.getElementById("projects")
    if (element) {
      elementTopRef.current = element.getBoundingClientRect().top + window.scrollY
    }
    if (!isMobile) {
      gsap.set(heroContainerRef.current, { x: "150%", opacity: 1 })
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      gsap.set(heroContainerRef.current, { x: 0, opacity: 1 })
    }
  }, [isMobile])

  useEffect(() => {
    if (!animationReady) return
    gsap.to(heroContainerRef.current, {
      x: 0,
      duration: 2.5,
      ease: "power2.inOut",
    })
  }, [animationReady])

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
        className="mx-auto h-[75vh] px-6 relative flex flex-col justify-center items-center xl:items-start"
    style={{ maxWidth: 'calc(100vh * 1.1)' }}
      >
      <div
      className="w-fit relative origin-center overflow-hidden"
      style={{ clipPath: 'inset(0px -25% 0px 0px)' }}>
        <div
        ref={heroContainerRef}
        className="flex flex-col justify-center gap-4 vsm:gap-5 vmd:gap-6 vlg:gap-7 vxl:gap-8 v2xl:gap-10 items-center xl:items-start opacity-0">
          <div className="flex flex-col gap-1.5 vsm:gap-2 -mb-2 vsm:-mb-2 vmd:-mb-2.5 vlg:-mb-4">
            <h2 className="type-h2">
              {content?.role || "Technical Artist"}
              <span className="mx-2 type-h2">•</span>
              Warsaw<span className="hidden sm:inline">, Poland</span>
            </h2>
          </div>
          <h1 className={`type-h1 uppercase ${isPhone ? '!text-[2.75rem]' : ''} -ml-[0.024em] vsm:-ml-[0.03em] vmd:-ml-[0.04em] vlg:-ml-[0.044em] vxl:-ml-[0.05em] -mt-0.5 vsm:-mt-0.5 vmd:-mt-1 vlg:-mt-1`}>
            KUBA WALCZAK
          </h1>
          <div className="flex flex-col items-center xl:items-start gap-1.5 vsm:gap-2 text-center xl:text-left w-full xl:w-3/5">
            <h2 className="type-h4">
            {content?.description || "I build scalable procedural systems by combining computer graphics and computer science."}
            </h2>
            <Button
              variant="default"
              className="mt-6 inline-flex cursor-pointer gap-2 px-6 py-2 type-h25"
              onClick={() => handleScrollTo(elementTopRef.current)}
            >
              View Portfolio
              <ArrowRight strokeWidth={3} className="size-6"/>
            </Button>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="absolute inset- w-full h-full pointer-events-none xl:block hidden">
        <HeroCanvas>
          <Model/>
        </HeroCanvas>
        </div>
      )}
    </section>
  )
}
