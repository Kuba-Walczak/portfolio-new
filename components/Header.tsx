'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
        <div className="flex gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-accent transition-colors font-semibold text-2xl"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}