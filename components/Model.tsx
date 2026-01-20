import * as THREE from 'three'
import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'

type GLTFResult = {
  nodes: {
    LaptopBase: THREE.Mesh
    LaptopDisplay: THREE.Mesh
  }
  materials: Record<string, THREE.Material>
}

function ModelContent(props: any) {
    const { nodes } = useGLTF('https://PortfolioPullZone.b-cdn.net/temp-name/r3f.glb') as unknown as GLTFResult
    const texture = useLoader(TextureLoader, 'https://PortfolioPullZone.b-cdn.net/temp-name/Bake.png')
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return (
        <>
        <group {...props} dispose={null}>
          <mesh geometry={nodes.LaptopBase.geometry} material={new THREE.MeshBasicMaterial({ map: texture })} position={[0.3, -0.05, -0.75]} rotation={[-160 / 180 * Math.PI, 30 / 180 * Math.PI, Math.PI]}>
                <mesh geometry={nodes.LaptopDisplay.geometry} material={new THREE.MeshBasicMaterial({ map: texture })} position={[0, -0.013, -0.01]} rotation={[2.007, 0, 0]} />
            </mesh>
            </group>
        </>
      )
}

export function Model(props: any) {
    return (
        <Suspense fallback={null}>
            <ModelContent {...props} />
        </Suspense>
    )
}