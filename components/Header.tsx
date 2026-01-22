'use client'

import { gsap } from 'gsap'
import { useApp } from '@/contexts/AppContext'

export default function Header() {

  const { setProjectView, projectView } = useApp()

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
  ]

  const handleScroll = (href: string, e: React.MouseEvent) => {

    if (href === '#home') {
      setProjectView(false)
    }
    
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = elementPosition - 80 // 80px offset for sticky header
      
      const scrollProxy = { y: window.pageYOffset }
      
      // Start animation immediately with no delay
      gsap.to(scrollProxy, {
        y: targetPosition,
        duration: 1.5,
        overwrite: "auto",
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y)
        },
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
        <div className="flex gap-8">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={(e) => handleScroll(link.href, e)}
              className="text-foreground hover:text-accent transition-colors font-semibold text-2xl cursor-pointer bg-transparent border-none p-0"
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}