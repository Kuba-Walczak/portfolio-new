import { Canvas } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Sepia } from '@react-three/postprocessing'

export function CustomCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      style={{ pointerEvents: 'none' }}
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 1.6], fov: 10 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}>
        {children}
    </Canvas>
  )
}
