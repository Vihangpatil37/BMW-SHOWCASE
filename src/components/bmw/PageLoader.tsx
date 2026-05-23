'use client'

import { useProgress } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function PageLoader() {
  const { progress } = useProgress()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHidden, setIsHidden] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Reveal at 100% using clip-path wipe out
    if (progress === 100 && mounted) {
      const timer = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => setIsHidden(true)
          })
        }
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [progress, mounted])

  if (isHidden) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ 
        backgroundColor: '#080808',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
      }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,177,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-72 flex flex-col items-center">
        {/* BMW M3 text */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <span className="text-3xl font-black tracking-tight text-white">
            BMW <span className="font-light text-neutral-400">M3</span>
          </span>
          <div className="flex gap-1">
            <div className="w-6 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-6 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-6 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-white/5 overflow-hidden relative rounded-full">
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-300 ease-out rounded-full"
            style={{ 
              width: `${Math.max(progress, 5)}%`,
              background: 'linear-gradient(to right, #0066B1, #003B7A, #D5001C)'
            }}
          />
        </div>

        {/* Loading Text */}
        <span className="mt-6 text-[10px] uppercase tracking-[0.5em] text-neutral-600 font-medium">
          Loading Experience — {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}
