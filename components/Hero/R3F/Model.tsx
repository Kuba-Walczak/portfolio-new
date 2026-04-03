import * as THREE from 'three'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import { useScroll } from '@/hooks/useScroll'
import { useApp } from '@/contexts/AppContext'
import { useVideoTexture } from '@react-three/drei'
import { useCustomShader } from './CustomShader'

type GLTFResult = {
  nodes: {
    Root: THREE.Group
    LaptopHinge: THREE.Group
    LaptopBase: THREE.Mesh
    LaptopDisplay: THREE.Mesh
    LaptopLetterboxing: THREE.Mesh
    LaptopScreen: THREE.Mesh
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
    const { projectView, laptopReady, setLaptopReady, heroVideoGlowRef } = useApp()

    const [videoLooped, setVideoLooped] = useState(false)
    const isModelLoadedRef = useRef(false)

    const rootRef = useRef<THREE.Group>(null)
    const laptopHingeRef = useRef<THREE.Group>(null)
    
    const scrollY = useScroll()

    const { nodes } = useGLTF(`laptop.glb`) as unknown as GLTFResult

    const texture = useLoader(TextureLoader, 'Bake.png')
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const laptopScreenTexture = useVideoTexture("https://PortfolioPullZone.b-cdn.net/output.webm")
    laptopScreenTexture.flipY = false
    laptopScreenTexture.colorSpace = THREE.SRGBColorSpace
    laptopScreenTexture.minFilter = THREE.LinearFilter
    laptopScreenTexture.magFilter = THREE.LinearFilter

    const laptopScreenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: laptopScreenTexture, toneMapped: false }), [laptopScreenTexture])

    // laptop glow sequence is activated once when laptop mounts and each time the video loops
    useEffect(() => {
      if (heroVideoGlowRef) {
        gsap.killTweensOf(heroVideoGlowRef)
        const tl = gsap.timeline()
        tl.to(heroVideoGlowRef, {
          background: 'radial-gradient(circle,rgb(255, 251, 0) 0%, transparent 50%)',
          duration: 0.5,
        })
        tl.to({}, { duration: 4.8, })
        tl.to(heroVideoGlowRef, {
          background: 'radial-gradient(circle,rgb(0, 225, 255) 0%, transparent 50%)',
          duration: 0.5,
        })
        tl.to({}, { duration: 4.5, })
        tl.to(heroVideoGlowRef, {
          background: 'radial-gradient(circle,rgb(255, 0, 0) 0%, transparent 50%)',
          duration: 0.5,
        })
        tl.play();
      }
    }, [laptopScreenTexture, videoLooped])

    const laptopScreenRef = useRef<THREE.Mesh>(null)

    useEffect(() => {
      if (isModelLoadedRef.current) return
      if (!nodes?.Root) return
      if (!rootRef.current || !laptopHingeRef.current || !laptopScreenRef.current) return

      requestAnimationFrame(() => {
        if (isModelLoadedRef.current) return
        const root = rootRef.current
        const hinge = laptopHingeRef.current
        if (!root || !hinge || !laptopScreenRef.current) return
        setTimeout(() => {
          gsap.to(root.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1,
            overwrite: 'auto',
            ease: "power2.inOut"
          })
          gsap.to(hinge.rotation, {
            x: Math.PI * 115 / 180,
            y: 0,
            z: 0,
            duration: 2,
            overwrite: 'auto',
            ease: "power2.inOut"
          })
          setTimeout(() => {
            gsap.to(root.position, {
              x: 0.25,
              duration: 1.5,
              overwrite: 'auto',
              ease: "power2.inOut"
            })
            gsap.to(root.rotation, {
              x: -160 / 180 * Math.PI,
              duration: 1.5,
              overwrite: 'auto'
            })
            gsap.to(root.rotation, {
              y: 20 / 180 * Math.PI,
              duration: 1.5,
              overwrite: 'auto'
            })
          }, 1500)
        }, 500)
        setTimeout(() => {
          isModelLoadedRef.current = true
          document.body.style.overflowY = ""
          document.body.style.overflowX = "hidden"
          if (!rootRef.current || !laptopHingeRef.current) return
          gsap.to(rootRef.current.position, {y: "+=0.03", duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
          gsap.to(rootRef.current.rotation, {x: `+=${Math.PI * -5 / 180}`, duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
          gsap.to(rootRef.current.rotation, {y: `+=${Math.PI * 5 / 180}`, duration: 20, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
          gsap.to(rootRef.current.rotation, {z: `+=${Math.PI * 3 / 180}`, duration: 30, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
          gsap.to(laptopHingeRef.current.rotation, {x: `+=${Math.PI * -15 / 180}`, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
          gsap.to(laptopScreenMaterial.color, {
            r: 1,
            g: 1,
            b: 1,
            duration: 0.25,
            overwrite: "auto"
          })
        }, 2000)
      })
    }, [nodes])

    useEffect(() => {
      if (!isModelLoadedRef.current) return
      if (!rootRef.current || !laptopHingeRef.current) return
      if (!projectView) {
        if (scrollY === 0) {
          gsap.to(heroVideoGlowRef, {
            opacity: 0.1,
            duration: 0.5,
            overwrite: "auto"
          })
          if (laptopScreenRef.current) {
            gsap.to(laptopScreenMaterial.color, {
              r: 0,
              g: 0,
              b: 0,
              duration: 0.25,
              overwrite: "auto"
            })
          }
          gsap.to(heroVideoGlowRef, {
            opacity: 0,
            duration: 0.5,
            overwrite: "auto"
          })
        }
      }
    }, [scrollY])

    useEffect(() => {
      if (laptopScreenRef.current) {
        gsap.to(laptopScreenMaterial.color, {
          r: 0,
          g: 0,
          b: 0,
          duration: 0.25,
          overwrite: "auto"
        })
      }
    }, [])

    const shaderTest = useCustomShader(texture)

    return (
      <group {...props} dispose={null}>
  <group
    ref={rootRef}
    position={[0, -0.15, -3]}
    rotation={[-180 / 180 * Math.PI, 0, Math.PI]}
    scale={0}
  >
    <mesh
      geometry={nodes.LaptopBase.geometry}
      material={new THREE.MeshBasicMaterial({ map: texture })}
      position={[0, 0.024, 0.138]}
    >
      <group
        ref={laptopHingeRef}
        position={[0, -0.003, -0.009]}
      >
        <mesh
          geometry={nodes.LaptopDisplay.geometry}
          material={new THREE.MeshBasicMaterial({ map: texture })}
          position={[0, 0.003, 0.009]}
        />
        <mesh
          geometry={nodes.LaptopLetterboxing.geometry}
          material={new THREE.MeshBasicMaterial({ color: 0x000000 })}
          position={[0, 0, 0.009]}
        />
        <mesh
          ref={laptopScreenRef}
          geometry={nodes.LaptopScreen.geometry}
          material={laptopScreenMaterial}
          position={[0, 0.005, -0.157]}
        />
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