'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px]">
      <div className="relative flex items-center justify-center">
        {/* Outer ring - BMW Blue */}
        <motion.div
          className="absolute w-16 h-16 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#0066B1', borderRightColor: '#0066B1' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        {/* Middle ring - Dark Blue */}
        <motion.div
          className="absolute w-11 h-11 rounded-full border-2 border-transparent"
          style={{ borderBottomColor: '#003B7A', borderLeftColor: '#003B7A' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner ring - Red */}
        <motion.div
          className="absolute w-6 h-6 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#D5001C' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center dot */}
        <div className="w-2 h-2 rounded-full bg-neutral-300" />
      </div>
    </div>
  )
}
