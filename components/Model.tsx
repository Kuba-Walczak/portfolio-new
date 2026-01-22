import * as THREE from 'three'
import { Suspense, useEffect, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import { useScroll } from '@/hooks/useScroll'

type GLTFResult = {
  nodes: {
    Root: THREE.Group
    LaptopHinge: THREE.Group
    LaptopBase: THREE.Mesh
    LaptopDisplay: THREE.Mesh
    LaptopLetterboxing: THREE.Mesh
  }
  materials: Record<string, THREE.Material>
}

function ModelContent(props: any) {
    const rootRef = useRef<THREE.Group>(null)
    const laptopHingeRef = useRef<THREE.Group>(null)
    const scrollY = useScroll()
    const { nodes } = useGLTF(`https://PortfolioPullZone.b-cdn.net/temp-name/r3f.glb?t=2`) as unknown as GLTFResult
    const texture = useLoader(TextureLoader, 'https://PortfolioPullZone.b-cdn.net/temp-name/Bake.png')
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const STAGE_2_START = 0.2
    const STAGE_3_START = 0.4

    // Stage 1 values (initial state)
    const stage1Root = {
      x: 0.2,
      y: -0.15,
      z: -1,
      rotX: -160 / 180 * Math.PI,
      rotY: 30 / 180 * Math.PI,
      rotZ: Math.PI
    }
    const stage1Hinge = {
      x: 0,
      y: -0.003,
      z: -0.009,
      rotX: 2.007,
      rotY: 0,
      rotZ: 0
    }

    // Stage 2 values
    const stage2Root = {
      x: 0,
      y: -0.2,
      z: -0.6,
      rotX: -185 / 180 * Math.PI,
      rotY: 0,
      rotZ: Math.PI
    }
    const stage2Hinge = {
      x: 0,
      y: -0.003,
      z: -0.009,
      rotX: Math.PI / 4,
      rotY: 0,
      rotZ: 0
    }

    // Stage 3 values
    const stage3Root = {
      x: 0,
      y: -0.175,
      z: -0.4,
      rotX: -185 / 180 * Math.PI,
      rotY: 0,
      rotZ: Math.PI
    }
    const stage3Hinge = {
      x: 0,
      y: -0.003,
      z: -0.009,
      rotX: 0,
      rotY: 0,
      rotZ: 0
    }

    // Helper function to get target values based on scroll progress
    const getTargetValues = (progress: number) => {
      let rootTarget, hingeTarget

      if (progress < STAGE_2_START) {
        // Stage 1 -> Stage 2: interpolate between stage1 and stage2
        const t = progress / STAGE_2_START
        rootTarget = {
          x: stage1Root.x + (stage2Root.x - stage1Root.x) * t,
          y: stage1Root.y + (stage2Root.y - stage1Root.y) * t,
          z: stage1Root.z + (stage2Root.z - stage1Root.z) * t,
          rotX: stage1Root.rotX + (stage2Root.rotX - stage1Root.rotX) * t,
          rotY: stage1Root.rotY + (stage2Root.rotY - stage1Root.rotY) * t,
          rotZ: stage1Root.rotZ + (stage2Root.rotZ - stage1Root.rotZ) * t
        }
        hingeTarget = {
          x: stage1Hinge.x + (stage2Hinge.x - stage1Hinge.x) * t,
          y: stage1Hinge.y + (stage2Hinge.y - stage1Hinge.y) * t,
          z: stage1Hinge.z + (stage2Hinge.z - stage1Hinge.z) * t,
          rotX: stage1Hinge.rotX + (stage2Hinge.rotX - stage1Hinge.rotX) * t,
          rotY: stage1Hinge.rotY + (stage2Hinge.rotY - stage1Hinge.rotY) * t,
          rotZ: stage1Hinge.rotZ + (stage2Hinge.rotZ - stage1Hinge.rotZ) * t
        }
      } else if (progress < STAGE_3_START) {
        // Stage 2 -> Stage 3: interpolate between stage2 and stage3
        const t = (progress - STAGE_2_START) / (STAGE_3_START - STAGE_2_START)
        rootTarget = {
          x: stage2Root.x + (stage3Root.x - stage2Root.x) * t,
          y: stage2Root.y + (stage3Root.y - stage2Root.y) * t,
          z: stage2Root.z + (stage3Root.z - stage2Root.z) * t,
          rotX: stage2Root.rotX + (stage3Root.rotX - stage2Root.rotX) * t,
          rotY: stage2Root.rotY + (stage3Root.rotY - stage2Root.rotY) * t,
          rotZ: stage2Root.rotZ + (stage3Root.rotZ - stage2Root.rotZ) * t
        }
        hingeTarget = {
          x: stage2Hinge.x + (stage3Hinge.x - stage2Hinge.x) * t,
          y: stage2Hinge.y + (stage3Hinge.y - stage2Hinge.y) * t,
          z: stage2Hinge.z + (stage3Hinge.z - stage2Hinge.z) * t,
          rotX: stage2Hinge.rotX + (stage3Hinge.rotX - stage2Hinge.rotX) * t,
          rotY: stage2Hinge.rotY + (stage3Hinge.rotY - stage2Hinge.rotY) * t,
          rotZ: stage2Hinge.rotZ + (stage3Hinge.rotZ - stage2Hinge.rotZ) * t
        }
      } else {
        // Stage 3: stay at stage3 values
        rootTarget = stage3Root
        hingeTarget = stage3Hinge
      }

      return { rootTarget, hingeTarget }
    }

    // Use GSAP to smoothly animate Three.js objects directly when scroll changes
    useEffect(() => {
      if (!rootRef.current || !laptopHingeRef.current) return

      const { rootTarget, hingeTarget } = getTargetValues(scrollY)

      // Animate root position and rotation directly
      gsap.to(rootRef.current.position, {
        x: rootTarget.x,
        y: rootTarget.y,
        z: rootTarget.z,
        duration: 0.2,
        overwrite: 'auto'
      })

      gsap.to(rootRef.current.rotation, {
        x: rootTarget.rotX,
        y: rootTarget.rotY,
        z: rootTarget.rotZ,
        duration: 0.2,
        overwrite: 'auto'
      })

      // Animate hinge position and rotation directly
      gsap.to(laptopHingeRef.current.position, {
        x: hingeTarget.x,
        y: hingeTarget.y,
        z: hingeTarget.z,
        duration: 0.4,
        overwrite: 'auto'
      })

      gsap.to(laptopHingeRef.current.rotation, {
        x: hingeTarget.rotX,
        y: hingeTarget.rotY,
        z: hingeTarget.rotZ,
        duration: 0.4,
        overwrite: 'auto'
      })
    }, [scrollY])

    return (
      <group {...props} dispose={null}>
        <group ref={rootRef} position={[0.2, -0.125, -0.6]} rotation={[-160 / 180 * Math.PI, 30 / 180 * Math.PI, Math.PI]}>
          <mesh geometry={nodes.LaptopBase.geometry} material={new THREE.MeshBasicMaterial({ map: texture })} position={[0, 0.024, 0.138]}>
            <group ref={laptopHingeRef} position={[0, -0.003, -0.009]} rotation={[2.007, 0, 0]}>
              <mesh geometry={nodes.LaptopDisplay.geometry} material={new THREE.MeshBasicMaterial({ map: texture })} position={[0, 0.003, 0.009]} />
              <mesh geometry={nodes.LaptopLetterboxing.geometry} material={new THREE.MeshBasicMaterial({ map: texture })} position={[0, 0, 0.009]} />
            </group>
          </mesh>
        </group>
      </group>
    )
}

export function Model(props: any) {
    return (
        <Suspense fallback={null}>
            <ModelContent {...props} />
        </Suspense>
    )
}