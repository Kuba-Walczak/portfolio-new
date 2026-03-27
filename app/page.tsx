'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects/index'
import About from '@/components/About'
import Footer from '@/components/Footer'
import SectionHeader from '@/components/SectionHeader'
import Background from '@/components/Background'
import { Separator } from '@/components/ui/separator'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const projectsStartTop = 'calc(50vh + min(50vh, calc(165vh * 9 / 32)))'
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)

  // Lock scroll from scrollY 0-0.2 using ScrollTrigger pin
  useEffect(() => {
    if (!wrapperRef.current) return

    const calculateEnd = () => {
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const maxScroll = documentHeight - windowHeight
      return maxScroll * 0.3
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: () => {
        // return a relative pixel offset equal to 20% of the total scrollable height
        return `+=${Math.round(calculateEnd())}`
      },
      pin: true
    })

    // ensure ScrollTrigger recalculates after load/resize/assets
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    // refresh now in case layout is already stable
    ScrollTrigger.refresh()

    const simulateResize = () => {
      document.documentElement.style.overflow = 'hidden'
      window.dispatchEvent(new Event('resize'))
      requestAnimationFrame(() => {
        document.documentElement.style.overflow = ''
        window.dispatchEvent(new Event('resize'))
      })
    }
    simulateResize()
    document.body.style.overflow = "hidden"
    window.scrollTo({ top: 0 })
    // window.scrollTo(0, 1000)
    // setTimeout(() => {
    //   window.scrollTo(0, 0)
    // }, 1000)

    return () => {
      scrollTrigger.kill()
      window.removeEventListener('load', onLoad)
    }
  }, [])
  
  return (
    <div className="h-[300vh]">
      <div ref={wrapperRef} className="relative min-h-screen">
      <Background />
        <Header />
        <div 
        className="relative h-screen"
        >
          <Hero />
        </div>
        <div
          className="relative"
          style={{
            marginTop: `calc(${projectsStartTop} - 100vh)`
          }}
        >
          <Projects />
        </div>
        <About />
          <Footer />
    </div>
    </div>
  )
}
