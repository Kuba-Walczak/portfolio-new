import * as THREE from 'three'
import { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
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

function ModelContent(props: any) {
    const { heroVideoGlowRef, setAnimationReady, animationReady } = useApp()

    const [videoLooped, setVideoLooped] = useState(false)
    const isModelLoadedRef = useRef(false)

    const rootRef = useRef<THREE.Group>(null)
    const laptopHingeRef = useRef<THREE.Group>(null)

    const { nodes } = useGLTF(`r3fFinal.glb`) as unknown as GLTFResult

    const texture = useLoader(TextureLoader, 'BakeFinal.png')
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const laptopScreenTexture = useVideoTexture("showcase.mp4", { loop: true, muted: true, playsInline: true, crossOrigin: 'anonymous', start: false })
    laptopScreenTexture.flipY = false
    laptopScreenTexture.colorSpace = THREE.SRGBColorSpace
    laptopScreenTexture.minFilter = THREE.LinearFilter
    laptopScreenTexture.magFilter = THREE.LinearFilter

    const laptopScreenMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: laptopScreenTexture, toneMapped: false }), [laptopScreenTexture])

    const lastTimeRef = useRef(0);

    useEffect(() => {
      const loopDetection = () => {
        if (laptopScreenTexture.image.currentTime < lastTimeRef.current) {
          setVideoLooped(prev => !prev)
        }
        lastTimeRef.current = laptopScreenTexture.image.currentTime;
      };
      laptopScreenTexture.image.addEventListener("timeupdate", loopDetection);

      if (laptopScreenRef.current) {
        gsap.to(laptopScreenMaterial.color, {
          r: 0,
          g: 0,
          b: 0,
          duration: 0.25,
          overwrite: "auto"
        })
      }
      
      return () => {
        laptopScreenTexture.image.removeEventListener("timeupdate", loopDetection);
      };
    }, []);
    
    useEffect(() => {
      if (!animationReady) return
      if (heroVideoGlowRef) {
        gsap.killTweensOf(heroVideoGlowRef)
        const tl = gsap.timeline()
        tl.to(heroVideoGlowRef, {
          background: 'radial-gradient(circle,rgb(255, 255, 255) 0%, transparent 50%)',
          duration: 0.5,
        })
        tl.to({}, { duration: 4.5 })
        tl.to(heroVideoGlowRef, {
          background: 'radial-gradient(circle,rgb(255, 0, 0) 0%, transparent 50%)',
          duration: 0.5,
        })
        tl.to({}, { duration: 4.5 })
        tl.to(heroVideoGlowRef, {
          background: 'radial-gradient(circle,rgb(0, 225, 255) 0%, transparent 50%)',
          duration: 0.5,
        })
        tl.to({}, { duration: 4.5 })
        tl.to(heroVideoGlowRef, {
          background: 'radial-gradient(circle,rgb(255, 251, 0) 0%, transparent 50%)',
          duration: 0.5,
        })
        tl.play();
      }
    }, [animationReady, videoLooped])

    const laptopScreenRef = useRef<THREE.Mesh>(null)

    useEffect(() => {
      if (isModelLoadedRef.current) return
      if (!nodes?.Root) return

      requestAnimationFrame(() => {
        const root = rootRef.current
        const hinge = laptopHingeRef.current
        if (!root || !hinge) return
        setTimeout(() => {
          gsap.to(root.scale, {
            x: 1.25,
            y: 1.25,
            z: 2,
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
          gsap.to(root.rotation, {
            x: -160 / 180 * Math.PI,
            duration: 2,
            overwrite: 'auto'
          })
          setTimeout(() => {
            laptopScreenTexture.image.play()
          isModelLoadedRef.current = true
          setAnimationReady(true)
          gsap.to(laptopScreenMaterial.color, {
            r: 1,
            g: 1,
            b: 1,
            duration: 3,
            overwrite: "auto"
          })
            gsap.to(root.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 1.5,
              overwrite: 'auto',
              ease: "power2.inOut"
            })
            gsap.to(root.position, {
              x: 0.2,
              duration: 2.5,
              overwrite: 'auto',
              ease: "power2.inOut"
            })
            gsap.to(root.rotation, {
              y: 20 / 180 * Math.PI,
              duration: 1.5,
              overwrite: 'auto',
              ease: "power2.inOut"
            })
          }, 1000)
          setTimeout(() => {
            if (!rootRef.current || !laptopHingeRef.current) return
            const tl = gsap.timeline({ repeat: -1 });
  tl.to(rootRef.current.position, {
    y: "+=0.03",
    duration: 6,
    ease: "sine.out"
  })
  .to(rootRef.current.position, {
    y: "-=0.06",
    duration: 12,
    ease: "sine.inOut"
  })
  .to(rootRef.current.position, {
    y: "+=0.03",
    duration: 6,
    ease: "sine.in"
  });
            gsap.to(rootRef.current.rotation, {x: `+=${Math.PI * -5 / 180}`, duration: 10, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
            gsap.to(rootRef.current.rotation, {y: `+=${Math.PI * 5 / 180}`, duration: 20, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
            gsap.to(rootRef.current.rotation, {z: `+=${Math.PI * 3 / 180}`, duration: 30, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
            gsap.to(laptopHingeRef.current.rotation, {x: `+=${Math.PI * -15 / 180}`, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut", overwrite: "auto"})
          }, 2500)
        }, 500)
      })
    }, [nodes])

    return (
      <group {...props} dispose={null}>
  <group
    ref={rootRef}
    position={[0, -0.15, -1.6]}
    rotation={[-140 / 180 * Math.PI, 0, Math.PI]}
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