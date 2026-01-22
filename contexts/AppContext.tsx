'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  projectView: boolean
  setProjectView: (projectView: boolean) => void
  selectedTab: string
  setSelectedTab: (selectedTab: string) => void
  laptopReady: boolean
  setLaptopReady: (laptopReady: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [projectView, setProjectView] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Showcase')
  const [laptopReady, setLaptopReady] = useState(false)

  const value: AppContextType = {
    projectView,
    setProjectView,
    selectedTab,
    setSelectedTab,
    laptopReady,
    setLaptopReady,
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
