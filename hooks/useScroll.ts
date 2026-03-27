'use client'

import { useState, useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Custom hook that returns scroll progress from 0 (top) to 1 (bottom)
 * Updates every frame using requestAnimationFrame for smooth animations
 */

export function useScroll(): number {
  const [scrollY, setScrollY] = useState(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    ScrollTrigger.refresh()
    const element = document.getElementById('projects');
    if (!element) return
    const maxScroll = element.getBoundingClientRect().top * 1.5
    const updateScroll = () => {
      if (typeof window === 'undefined') return
      const scrollTop = window.scrollY
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
      const clampedProgress = Math.max(0, Math.min(1, progress))
      setScrollY(clampedProgress)
      rafId.current = requestAnimationFrame(updateScroll)
    }
    rafId.current = requestAnimationFrame(updateScroll)
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])
  return scrollY
}