'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Project } from '@/types/project'
import { fetchProjects } from '@/lib/utils'

interface AppContextType {
  projects: Project[] | null
  setProjects: (projects: Project[] | null) => void
  heroVideoGlowRef: HTMLDivElement | null
  setHeroVideoGlowRef: (heroVideoGlowRef: HTMLDivElement | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [mainHeader, setMainHeader] = useState(true)
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [heroVideoGlowRef, setHeroVideoGlowRef] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
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
    return () => clearInterval(interval)
  }, [])

  const value: AppContextType = {
    projects,
    setProjects,
    heroVideoGlowRef,
    setHeroVideoGlowRef,
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
