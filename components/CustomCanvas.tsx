import { Canvas } from '@react-three/fiber';

export function CustomCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas 
      gl={{ alpha: true }}
      camera={{ position: [0, 0, 0.5], fov: 25 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}>
        <ambientLight intensity={Math.PI / 2}/>
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
        {children}
    </Canvas>
  );
}