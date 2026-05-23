'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import type { Group } from 'three'

interface CarModelProps {
  modelPath: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  autoRotate?: boolean
  autoRotateSpeed?: number
}

export default function CarModel({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  autoRotateSpeed = 0.3,
}: CarModelProps) {
  const groupRef = useRef<Group>(null)

  // useGLTF must be called unconditionally (React hooks rule)
  // If the model doesn't exist, this will throw and be caught by Suspense/ErrorBoundary
  const gltf = useGLTF(modelPath)
  const scene = gltf.scene

  useFrame((_state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * autoRotateSpeed
    }
  })

  const scaleArray = typeof scale === 'number' ? [scale, scale, scale] : scale

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scaleArray}>
      <primitive object={scene.clone()} />
    </group>
  )
}

// Preload all car models - these are best-effort and won't throw at module level
useGLTF.preload('/models/red-car.glb')
useGLTF.preload('/models/silver-car.glb')
useGLTF.preload('/models/black-car.glb')
