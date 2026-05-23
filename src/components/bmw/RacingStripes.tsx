'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface RacingStripesProps {
  className?: string
  direction?: 'horizontal' | 'diagonal'
  opacity?: number
  animated?: boolean
}

export default function RacingStripes({
  className = '',
  direction = 'diagonal',
  opacity = 0.08,
  animated = true,
}: RacingStripesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const stripeY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const stripes = [
    { color: '#0066B1', label: 'BMW Blue' },
    { color: '#003B7A', label: 'BMW Dark Blue' },
    { color: '#D5001C', label: 'BMW Red' },
  ]

  if (direction === 'horizontal') {
    return (
      <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {stripes.map((stripe, i) => (
          <motion.div
            key={stripe.label}
            className="absolute left-0 right-0"
            style={{
              top: `${30 + i * 3}%`,
              height: '3px',
              backgroundColor: stripe.color,
              opacity,
              y: animated ? stripeY : 0,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.g style={animated ? { y: stripeY } : undefined}>
          {/* Blue stripe */}
          <motion.line
            x1="100"
            y1="0"
            x2="600"
            y2="800"
            stroke="#0066B1"
            strokeWidth="4"
            opacity={opacity}
          />
          {/* Dark blue stripe */}
          <motion.line
            x1="140"
            y1="0"
            x2="640"
            y2="800"
            stroke="#003B7A"
            strokeWidth="4"
            opacity={opacity}
          />
          {/* Red stripe */}
          <motion.line
            x1="180"
            y1="0"
            x2="680"
            y2="800"
            stroke="#D5001C"
            strokeWidth="4"
            opacity={opacity}
          />
        </motion.g>
      </svg>
    </div>
  )
}
