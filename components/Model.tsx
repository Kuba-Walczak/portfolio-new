import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
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

// Helper function to lerp (linear interpolate) between two values
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

// Helper function to lerp Vector3
function lerpVector3(start: THREE.Vector3, end: THREE.Vector3, t: number): THREE.Vector3 {
  return new THREE.Vector3(
    lerp(start.x, end.x, t),
    lerp(start.y, end.y, t),
    lerp(start.z, end.z, t)
  )
}

// Helper function to lerp Euler (rotation)
function lerpEuler(start: THREE.Euler, end: THREE.Euler, t: number): THREE.Euler {
  return new THREE.Euler(
    lerp(start.x, end.x, t),
    lerp(start.y, end.y, t),
    lerp(start.z, end.z, t)
  )
}

function ModelContent(props: any) {
    const rootRef = useRef<THREE.Group>(null)
    const laptopHingeRef = useRef<THREE.Group>(null)
    const scrollY = useScroll()
    const smoothScrollY = useRef(0)
    const { nodes } = useGLTF(`https://PortfolioPullZone.b-cdn.net/temp-name/r3f.glb?t=2`) as unknown as GLTFResult
    const texture = useLoader(TextureLoader, 'https://PortfolioPullZone.b-cdn.net/temp-name/Bake.png')
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Stage 1: Current position/rotation (scroll 0-0.2)
    const stage1 = {
      root: {
        position: new THREE.Vector3(0.15, -0.2, -1),
        rotation: new THREE.Euler(-160 / 180 * Math.PI, 30 / 180 * Math.PI, Math.PI)
      },
      laptopHinge: {
        position: new THREE.Vector3(0, -0.003, -0.009),
        rotation: new THREE.Euler(2.007, 0, 0)
      }
    }

    // Stage 2: Copy of stage 1 (scroll 0.2-0.4)
    const stage2 = {
      root: {
        position: new THREE.Vector3(0, -0.2, -0.6),
        rotation: new THREE.Euler(-185 / 180 * Math.PI, 0, Math.PI)
      },
      laptopHinge: {
        position: new THREE.Vector3(0, -0.003, -0.009),
        rotation: new THREE.Euler(Math.PI / 4, 0, 0)
      }
    }

    // Stage 3: Copy of stage 1 (scroll 0.4+)
    const stage3 = {
      root: {
        position: new THREE.Vector3(0, -0.175, -0.4),
        rotation: new THREE.Euler(-185 / 180 * Math.PI, 0, Math.PI)
      },
      laptopHinge: {
        position: new THREE.Vector3(0, -0.003, -0.009),
        rotation: new THREE.Euler(0, 0, 0)
      }
    }

    // Animation based on scroll with smoothing
    useFrame(() => {
      if (rootRef.current && laptopHingeRef.current) {
        // Smooth the scroll value for fluid animations
        // Factor of 0.15 creates smooth delay (similar to CSS transition)
        const smoothingFactor = 0.15
        smoothScrollY.current = smoothScrollY.current + (scrollY - smoothScrollY.current) * smoothingFactor

        let currentStage, nextStage, t

        if (smoothScrollY.current < 0.2) {
          // Stage 1 -> Stage 2 (scroll 0 to 0.2)
          currentStage = stage1
          nextStage = stage2
          t = smoothScrollY.current / 0.2 // Normalize to 0-1
        } else if (smoothScrollY.current < 0.4) {
          // Stage 2 -> Stage 3 (scroll 0.2 to 0.4)
          currentStage = stage2
          nextStage = stage3
          t = (smoothScrollY.current - 0.2) / 0.2 // Normalize to 0-1
        } else {
          // Beyond stage 3, stay at stage 3
          currentStage = stage3
          nextStage = stage3
          t = 1
        }

        // Interpolate root position and rotation
        const rootPos = lerpVector3(currentStage.root.position, nextStage.root.position, t)
        const rootRot = lerpEuler(currentStage.root.rotation, nextStage.root.rotation, t)
        
        rootRef.current.position.set(rootPos.x, rootPos.y, rootPos.z)
        rootRef.current.rotation.set(rootRot.x, rootRot.y, rootRot.z)

        // Interpolate laptopHinge position and rotation
        const hingePos = lerpVector3(currentStage.laptopHinge.position, nextStage.laptopHinge.position, t)
        const hingeRot = lerpEuler(currentStage.laptopHinge.rotation, nextStage.laptopHinge.rotation, t)
        
        laptopHingeRef.current.position.set(hingePos.x, hingePos.y, hingePos.z)
        laptopHingeRef.current.rotation.set(hingeRot.x, hingeRot.y, hingeRot.z)
      }
    })

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