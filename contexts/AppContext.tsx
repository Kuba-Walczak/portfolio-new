'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Project } from '@/types/project'
import { fetchProjects } from '@/lib/utils'

interface AppContextType {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  projects: Project[] | null
  setProjects: (projects: Project[] | null) => void
  animationReady: boolean
  setAnimationReady: (animationReady: boolean) => void
  heroVideoGlowRef: HTMLDivElement | null
  setHeroVideoGlowRef: (heroVideoGlowRef: HTMLDivElement | null) => void
  openContacts: boolean
  setOpenContacts: (openContacts: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [animationReady, setAnimationReady] = useState(false)
  const [heroVideoGlowRef, setHeroVideoGlowRef] = useState<HTMLDivElement | null>(null)
  const [openContacts, setOpenContacts] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1279px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    const fetchAndUpdate = async () => {
      try {
        const next = await fetchProjects('/projects.json')
        setProjects(next)
      } catch (e) {
        console.error(e)
      }
    }
    void fetchAndUpdate()
    const interval = setInterval(() => void fetchAndUpdate(), 1000)
    return () => {
      clearInterval(interval)
      media.removeEventListener('change', update)
    }

  }, [])

  const value: AppContextType = {
    isMobile,
    setIsMobile,
    projects,
    setProjects,
    animationReady,
    setAnimationReady,
    heroVideoGlowRef,
    setHeroVideoGlowRef,
    openContacts,
    setOpenContacts,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
