'use client'

import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react'

export function HeroCanvas({ children }: { children: ReactNode }) {
  return (
    <Canvas
      dpr={[1.25, 2]}
      style={{ pointerEvents: 'none' }}
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 0], fov: 25 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}>
        {children}
    </Canvas>
  )
}
