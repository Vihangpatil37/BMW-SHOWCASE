'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [dragText, setDragText] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Inner dot tracks exactly (stiff spring)
  const dotX = useSpring(mouseX, { stiffness: 1500, damping: 50, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 1500, damping: 50, mass: 0.1 })

  // Outer ring tracks with lag (loose spring roughly equals 0.1 lerp lag)
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Check if hovering a button or link
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('[role="button"]')
      setHovered(!!isInteractive)

      // Check for horizontal scroll section drag trigger
      const dragArea = target.closest('[data-cursor-drag="true"]')
      setDragText(!!dragArea)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.style.cursor = 'auto'
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible || typeof window === 'undefined') return null

  // Don't render custom cursor on mobile touch devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  const ringSize = hovered || dragText ? 60 : 40

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full border border-neutral-400 mix-blend-difference transition-colors"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: hovered ? 'rgba(255, 255, 255, 1)' : 'transparent',
          borderWidth: hovered ? '0px' : '1px',
          color: hovered ? '#000' : '#fff'
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {dragText && (
          <span className="text-[8px] font-bold text-black uppercase tracking-widest absolute">
            Drag
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-difference bg-white"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hovered || dragText ? 0 : 1
        }}
      />
    </>
  )
}
