 'use client'

import { useApp } from '@/contexts/AppContext'
import { useMemo } from 'react'
import { useScroll } from '@/hooks/useScroll'

export default function Background() {
  const { projectView, setHeroVideoGlowRef } = useApp()
  const scrollY = useScroll()
  const backgroundOpacity = projectView ? Math.max(0, Math.min(1, scrollY / 0.2)) : 1
  const tiledJapaneseChar = useMemo(() => {
    const glyphs = ['未', '来', '日', '月', '火', '水', '木', '金', '土']
    const cols = 6
    const rows = 3
    const cell = 72
    const width = cols * cell
    const height = rows * cell

    let texts = ''
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)]
        const tx = x * cell + 18
        const ty = y * cell + 62
        texts += `<text x="${tx}" y="${ty}" font-size="52" fill="#ffffff" fill-opacity="0.08" font-family="serif">${char}</text>`
      }
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${texts}</svg>`
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  }, [])
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0D0D19]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '-5%',
            left: '6%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          未
        </p>
        <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '22%',
            left: '65%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          未
        </p>
        <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '48%',
            left: '5%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          来
        </p> */}
        <div
        className="absolute inset-0"
        style={{
          backgroundImage: tiledJapaneseChar,
          backgroundRepeat: 'repeat',
          backgroundSize: '432px 216px',
          opacity: 0.06,
        }}
      />
      </div>
      <div
        ref={setHeroVideoGlowRef}
        className="absolute rounded-full opacity-0"
        style={{
          width: '200vw',
          height: '200vw',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
        }}
      />
    </div>
  )
}
