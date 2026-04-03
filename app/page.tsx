'use client'

import Hero from '@/components/Hero'
import Projects from '@/components/Projects/index'
import About from '@/components/About'
import Background from '@/components/Background'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const projectsStartTop = 'calc(50vh + min(50vh, calc(96vh * 9 / 32)))'
  
  return (
      <div className="relative min-h-screen text-secondary">
      <Background />
        <div className="relative h-screen">
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
        <SectionHeader/>
        <About />
        <SectionHeader/>
    </div>
  )
}
