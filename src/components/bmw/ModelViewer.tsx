'use client'

import { Suspense, useRef, useCallback, useState, useEffect, Component } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import CarModel from './CarModel'
import LoadingSpinner from './LoadingSpinner'
import type { Group } from 'three'

interface ModelViewerProps {
  modelPath: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  enableMouseRotation?: boolean
  className?: string
  cameraPosition?: [number, number, number]
  autoRotate?: boolean
  autoRotateSpeed?: number
  environmentPreset?: string
}

// Error Boundary to catch 3D model loading errors
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function MouseRotationWrapper({
  children,
  enabled,
}: {
  children: React.ReactNode
  enabled: boolean
}) {
  const groupRef = useRef<Group>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enabled])

  useFrame(() => {
    if (!groupRef.current || !enabled) return
    targetRef.current.x += (mouseRef.current.y * 0.15 - targetRef.current.x) * 0.05
    targetRef.current.y += (mouseRef.current.x * 0.3 - targetRef.current.y) * 0.05
    groupRef.current.rotation.x = targetRef.current.x
    groupRef.current.rotation.y = targetRef.current.y
  })

  if (!enabled) return <>{children}</>

  return <group ref={groupRef}>{children}</group>
}

function ResponsiveCamera({
  position,
}: {
  position: [number, number, number]
}) {
  const { size } = useThree()
  const zoom = size.width < 768 ? 1.5 : size.width < 1024 ? 1.2 : 1

  return (
    <PerspectiveCamera
      makeDefault
      position={position}
      fov={45}
      zoom={zoom}
    />
  )
}

// Fallback 3D car placeholder when model fails to load
function CarPlaceholder() {
  const groupRef = useRef<Group>(null)

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.6, 4]} />
        <meshStandardMaterial color="#888888" transparent opacity={0.1} />
      </mesh>
      <mesh position={[0, 0.8, -0.3]}>
        <boxGeometry args={[1.8, 0.5, 2]} />
        <meshStandardMaterial color="#AAAAAA" transparent opacity={0.08} />
      </mesh>
      {[
        [-0.9, 0.25, 1.2],
        [0.9, 0.25, 1.2],
        [-0.9, 0.25, -1.2],
        [0.9, 0.25, -1.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#666666" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// The actual canvas content
function CanvasContent({
  modelPath,
  scale,
  position,
  rotation,
  enableMouseRotation,
  cameraPosition,
  autoRotate,
  autoRotateSpeed,
  environmentPreset,
}: ModelViewerProps) {
  return (
    <>
      <ResponsiveCamera position={cameraPosition || [5, 2, 5]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.5} penumbra={1} />
      <Environment
        preset={environmentPreset as 'city' | 'studio' | 'warehouse'}
        background={false}
      />
      <MouseRotationWrapper enabled={enableMouseRotation || false}>
        <ModelErrorBoundary fallback={<CarPlaceholder />}>
          <CarModel
            modelPath={modelPath}
            scale={scale}
            position={position}
            rotation={rotation}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />
        </ModelErrorBoundary>
      </MouseRotationWrapper>
    </>
  )
}

// Static fallback when canvas fails entirely
function CanvasFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-neutral-100">
      <div className="text-center p-8">
        <div className="w-20 h-8 mx-auto mb-3 flex gap-1">
          <div className="flex-1 rounded-sm" style={{ backgroundColor: '#0066B1' }} />
          <div className="flex-1 rounded-sm" style={{ backgroundColor: '#003B7A' }} />
          <div className="flex-1 rounded-sm" style={{ backgroundColor: '#D5001C' }} />
        </div>
        <p className="text-xs text-neutral-400 uppercase tracking-widest">3D Model</p>
      </div>
    </div>
  )
}

export default function ModelViewer({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  enableMouseRotation = false,
  className = '',
  cameraPosition = [5, 2, 5],
  autoRotate = true,
  autoRotateSpeed = 0.3,
  environmentPreset = 'city',
}: ModelViewerProps) {
  const [canvasError, setCanvasError] = useState(false)

  const handleCanvasError = useCallback(() => {
    setCanvasError(true)
  }, [])

  if (canvasError) {
    return <CanvasFallback />
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        onError={handleCanvasError}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CanvasContent
            modelPath={modelPath}
            scale={scale}
            position={position}
            rotation={rotation}
            enableMouseRotation={enableMouseRotation}
            cameraPosition={cameraPosition}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            environmentPreset={environmentPreset}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function ModelViewerWithLoader({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  enableMouseRotation = false,
  className = '',
  cameraPosition = [5, 2, 5],
  autoRotate = true,
  autoRotateSpeed = 0.3,
  environmentPreset = 'city',
}: ModelViewerProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ModelViewer
        modelPath={modelPath}
        scale={scale}
        position={position}
        rotation={rotation}
        enableMouseRotation={enableMouseRotation}
        className={className}
        cameraPosition={cameraPosition}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        environmentPreset={environmentPreset}
      />
    </Suspense>
  )
}
