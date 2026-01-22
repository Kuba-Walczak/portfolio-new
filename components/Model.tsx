import * as THREE from 'three'
import { Suspense, useEffect, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'

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

export class Vector6D {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public rotX: number,
    public rotY: number,
    public rotZ: number
  ) {}
  static lerp(from: Vector6D, to: Vector6D, t: number): Vector6D {
    return new Vector6D(
      from.x + (to.x - from.x) * t,
      from.y + (to.y - from.y) * t,
      from.z + (to.z - from.z) * t,
      from.rotX + (to.rotX - from.rotX) * t,
      from.rotY + (to.rotY - from.rotY) * t,
      from.rotZ + (to.rotZ - from.rotZ) * t
    )
  }
}

function ModelContent(props: any) {
    const { projectView } = useApp()
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

    const stage1Root: Vector6D = new Vector6D(0.2, -0.15, -1, -160 / 180 * Math.PI, 30 / 180 * Math.PI, Math.PI)
    const stage1Hinge: Vector6D = new Vector6D(0, -0.003, -0.009, 2.007, 0, 0)

    const stage2Root: Vector6D = new Vector6D(0, -0.2, -0.6, -185 / 180 * Math.PI, 0, Math.PI)
    const stage2Hinge: Vector6D = new Vector6D(0, -0.003, -0.009, Math.PI / 4, 0, 0)

    const stage3Root: Vector6D = new Vector6D(0, -0.18, -0.3, -190 / 180 * Math.PI, 0, Math.PI)
    const stage3Hinge: Vector6D = new Vector6D(0, -0.003, -0.009, 0, 0, 0)

    const stage1RootAlt = new Vector6D(0, -0.15, -0.3, -180 / 180 * Math.PI, 0, Math.PI)
    const stage1HingeAlt = new Vector6D(0, -0.003, -0.009, Math.PI / 2, 0, 0)

    const stage2RootAlt = new Vector6D(0, -0.18, -0.3, -190 / 180 * Math.PI, 0, Math.PI)
    const stage2HingeAlt = new Vector6D(0, -0.003, -0.009, 0, 0, 0)

    const getTargetValues = (progress: number) => {
      let rootTarget, hingeTarget
      let currentStage1Root, currentStage1Hinge, currentStage2Root, currentStage2Hinge
      if (projectView) {
        currentStage1Root = stage1RootAlt
        currentStage1Hinge = stage1HingeAlt
        currentStage2Root = stage2RootAlt
        currentStage2Hinge = stage2HingeAlt
      } else {
        currentStage1Root = stage1Root
        currentStage1Hinge = stage1Hinge
        currentStage2Root = stage2Root
        currentStage2Hinge = stage2Hinge
      }

      if (progress < STAGE_2_START) {
        // Stage 1 -> Stage 2: interpolate between stage1 and stage2
        const t = progress / STAGE_2_START
        rootTarget = Vector6D.lerp(currentStage1Root, currentStage2Root, t)
        hingeTarget = Vector6D.lerp(currentStage1Hinge, currentStage2Hinge, t)
      } else if (progress < STAGE_3_START) {
        // Stage 2 -> Stage 3: interpolate between stage2 and stage3
        const t = (progress - STAGE_2_START) / (STAGE_3_START - STAGE_2_START)
        rootTarget = Vector6D.lerp(currentStage2Root, stage3Root, t)
        hingeTarget = Vector6D.lerp(currentStage2Hinge, stage3Hinge, t)
      } else {
        rootTarget = stage3Root
        hingeTarget = stage3Hinge

      }

      return { rootTarget: rootTarget!, hingeTarget: hingeTarget! }
    }

    useEffect(() => {
      if (!rootRef.current || !laptopHingeRef.current) return
      const { rootTarget, hingeTarget } = getTargetValues(scrollY)
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
              <mesh geometry={nodes.LaptopLetterboxing.geometry} material={new THREE.MeshBasicMaterial({ color: 0x000000 })} position={[0, 0, 0.009]} />
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