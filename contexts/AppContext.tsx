'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Project } from '@/types/project'
import { fetchProjects } from '@/lib/utils'

interface AppContextType {
  projectView: boolean
  setProjectView: (projectView: boolean) => void
  selectedTab: string
  setSelectedTab: (selectedTab: string) => void
  laptopReady: boolean
  setLaptopReady: (laptopReady: boolean) => void
  projects: Project[]
  setProjects: (projects: Project[]) => void
  selectedProject: Project
  setSelectedProject: (selectedProject: Project) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [projectView, setProjectView] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Showcase')
  const [laptopReady, setLaptopReady] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project)

  useEffect(() => {
    fetchProjects('/projects.json').then(setProjects).catch(console.error)
  }, [projects])

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