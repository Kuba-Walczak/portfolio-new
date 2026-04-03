import * as THREE from 'three'
import { useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { useScroll } from '@/hooks/useScroll'

export function useCustomShader(texture: THREE.Texture) {
  const scrollY = useScroll()

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTexture: { value: texture },
        opacity: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float opacity;
        varying vec2 vUv;
        void main() { 
          vec4 texColor = texture2D(uTexture, vUv);
          gl_FragColor = texColor;
          if (vUv.x < 0.5) {
            gl_FragColor = vec4(0.0, 0.0, 0, opacity);
          } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, opacity);
          }
        }
      `,
    })
  }, [texture])

  useEffect(() => {
    if (shaderMaterial) {
      if (scrollY > 0.125) {
        gsap.to(shaderMaterial.uniforms.opacity, {
          value: 1,
          duration: 0.5,
          overwrite: 'auto'
        })
      } else {
        gsap.to(shaderMaterial.uniforms.opacity, {
          value: 1,
          duration: 0.5,
          overwrite: 'auto'
        })
      }
    }
  }, [scrollY, shaderMaterial])

  return shaderMaterial
}
