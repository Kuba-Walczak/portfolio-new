'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { GalleryContent, Project } from '@/types/project'
import { fetchProjects } from '@/lib/utils'

interface AppContextType {
  projectView: boolean
  setProjectView: (projectView: boolean) => void
  selectedTab: string
  setSelectedTab: (selectedTab: string) => void
  laptopReady: boolean
  setLaptopReady: (laptopReady: boolean) => void
  projects: Project[] | null
  setProjects: (projects: Project[] | null) => void
  selectedProject: Project | null
  setSelectedProject: (selectedProject: Project | null) => void
  selectedContent: GalleryContent | null
  setSelectedContent: (selectedContent: GalleryContent | null) => void
  heroVideoGlowRef: HTMLDivElement | null
  setHeroVideoGlowRef: (heroVideoGlowRef: HTMLDivElement | null) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [projectView, setProjectView] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Showcase')
  const [laptopReady, setLaptopReady] = useState(false)
  const [projects, setProjects] = useState<Project[] | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedContent, setSelectedContent] = useState<GalleryContent | null>(null)
  const [heroVideoGlowRef, setHeroVideoGlowRef] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    fetchProjects('/projects.json').then(setProjects).catch(console.error)
  }, [])

  const value: AppContextType = {
    projectView,
    setProjectView,
    selectedTab,
    setSelectedTab,
    laptopReady,
    setLaptopReady,
    projects,
    setProjects,
    selectedProject,
    setSelectedProject,
    selectedContent,
    setSelectedContent,
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
