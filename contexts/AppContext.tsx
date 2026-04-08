'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Project } from '@/types/project'
import { fetchProjects } from '@/lib/utils'

interface AppContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  isLandingPage: boolean
  setIsLandingPage: (isLandingPage: boolean) => void
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
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isLandingPage, setIsLandingPage] = useState(true)
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [animationReady, setAnimationReady] = useState(false)
  const [heroVideoGlowRef, setHeroVideoGlowRef] = useState<HTMLDivElement | null>(null)
  const [openContacts, setOpenContacts] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1279px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener("change", update)
  
    const fetchAndUpdate = async () => {
      try {
        const projects = await fetchProjects("projects.json")
        setProjects(projects)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
    void fetchAndUpdate()
    return () => media.removeEventListener("change", update)
  }, [])

  const value: AppContextType = {
    isLoading,
    setIsLoading,
    isMobile,
    setIsMobile,
    isLandingPage,
    setIsLandingPage,
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
