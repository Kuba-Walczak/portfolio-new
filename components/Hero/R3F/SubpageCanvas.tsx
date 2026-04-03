'use client'

import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react'

export function SubpageCanvas({ children }: { children: ReactNode }) {
  return (
    <Canvas
      style={{ pointerEvents: 'auto' }}
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 5], fov: 25 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}>
        {children}
    </Canvas>
  )
}
