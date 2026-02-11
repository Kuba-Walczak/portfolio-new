'use client'

import { CustomCanvas } from '@/components/Hero/Laptop/CustomCanvas'
import { Model } from '@/components/Hero/Laptop/Model'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'
import { Screen } from '@/components/Hero/Laptop/Screen'
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa'

export default function Hero() {
  const { projectView, laptopReady } = useApp()
  const scrollY = useScroll()
  const translateX = scrollY * 3000

  return (
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
        className={`space-y-6 w-fit transition-transform duration-100 ease-out ${scrollY > 0.17 || projectView ? 'hidden' : ''}`}
        style={{
          transform: `translateX(${translateX}px)`
        }}
      >
        <div className="flex flex-row gap-4">
        <FaGithub
          className="w-16 h-16 text-white/20 hover:text-white transition-colors duration-300"
          onClick={() => window.open('https://github.com/kuba-walczak', '_blank')}
          />
          <FaLinkedin
          className="w-16 h-16 text-white/20 hover:text-white transition-colors duration-300"
          onClick={() => window.open('https://linkedin.com/in/jakubwalczak', '_blank')}
          />
          <FaDiscord
          className="w-16 h-16 text-white/20 hover:text-white transition-colors duration-300"
          onClick={() => window.open('https://discord.com/users/1234567890', '_blank')}
          />
        </div>
        <h1 className="text-8xl font-bold text-foreground text-balance leading-tight">
          JAKUB WALCZAK
        </h1>
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">Role</span>
            <span className="text-2xl font-medium text-foreground">Programmer & Technical Artist</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-lg tracking-widest uppercase text-muted-foreground">Focus</span>
            <span className="text-2xl font-medium text-foreground">Real-time Graphics & Creative Tools</span>
          </div>
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
        <Model />
      </CustomCanvas>
      </div>
      <div style={{ opacity: laptopReady ? 1 : 0 }}>
      <div 
        className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{ 
          width: 'calc(100vh * 1.018)', 
          height: 'calc(100vh * 0.696)' 
        }}
      >
        <Screen />
      </div>
      </div>
    </section>
  )
}
