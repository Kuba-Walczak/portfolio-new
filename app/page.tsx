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
  return (
      <div className="relative pt-16">
        <Background />
          <Hero />
          <Projects />
        <SectionHeader/>
        <About />
        <SectionHeader/>
    </div>
  )
}
