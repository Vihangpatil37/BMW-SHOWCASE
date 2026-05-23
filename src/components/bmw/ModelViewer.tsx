'use client'

import { Suspense, useRef, useCallback, useState, useEffect, Component } from 'react'
import type { ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, PerspectiveCamera, ContactShadows, OrbitControls } from '@react-three/drei'
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

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
    </group>
  )
}

function CanvasContent({
  modelPath,
  scale,
  position,
  rotation,
  enableMouseRotation,
  cameraPosition,
  autoRotate,
  autoRotateSpeed,
  environmentPreset = 'studio',
  isMobile
}: ModelViewerProps & { isMobile: boolean }) {
  return (
    <>
      <ResponsiveCamera position={cameraPosition || [5, 2, 5]} />
      
      {/* Global Lighting & Environment */}
      <ambientLight intensity={environmentPreset === 'night' ? 0.1 : 0.4} />
      <Environment
        preset={environmentPreset as any}
        background={false}
      />
      
      {environmentPreset === 'night' && (
        <spotLight position={[0, 10, 0]} intensity={3} angle={0.8} penumbra={1} color="#ffffff" castShadow />
      )}
      {environmentPreset !== 'night' && (
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
      )}

      {/* Grounding Shadows */}
      <ContactShadows position={[0, -1.4, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />

      <OrbitControls 
        enabled={!isMobile && !enableMouseRotation} 
        autoRotate={isMobile || autoRotate} 
        autoRotateSpeed={autoRotateSpeed || 1} 
        enableZoom={false} 
        enablePan={false} 
      />

      <MouseRotationWrapper enabled={enableMouseRotation && !isMobile}>
        <ModelErrorBoundary fallback={<CarPlaceholder />}>
          <CarModel
            modelPath={modelPath}
            scale={scale}
            position={position}
            rotation={rotation}
            autoRotate={false} // OrbitControls handles it now
          />
        </ModelErrorBoundary>
      </MouseRotationWrapper>
    </>
  )
}

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

export default function ModelViewer(props: ModelViewerProps) {
  const [canvasError, setCanvasError] = useState(false)
  const isMobile = useIsMobile()

  const handleCanvasError = useCallback(() => {
    setCanvasError(true)
  }, [])

  if (canvasError) {
    return <CanvasFallback />
  }

  return (
    <div 
      className={`w-full ${props.className || ''}`}
      style={{ height: isMobile ? '300px' : '100vh', maxHeight: isMobile ? '300px' : 'none' }}
    >
      <Canvas
        onError={handleCanvasError}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? 1 : [1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CanvasContent {...props} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export function ModelViewerWithLoader(props: ModelViewerProps) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ModelViewer {...props} />
    </Suspense>
  )
}
