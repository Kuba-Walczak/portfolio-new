import { Canvas } from '@react-three/fiber'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

export function CustomCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      style={{ pointerEvents: 'none' }}
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 0.5], fov: 25 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}>
        <ambientLight intensity={Math.PI / 2}/>
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
        {children}
        <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.5} radius={0.25}/>
        <Vignette eskil={false} offset={0.1} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  )
}