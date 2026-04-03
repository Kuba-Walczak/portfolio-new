 'use client'

import { useApp } from '@/contexts/AppContext'
import { useMemo } from 'react'

export default function Background() {
  const { setHeroVideoGlowRef } = useApp()
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
        const glyphIndex = (x * 7 + y * 11 + x * y * 3) % glyphs.length
        const char = glyphs[glyphIndex]
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
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[var(--background)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden">
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
