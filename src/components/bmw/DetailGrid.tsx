'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function DetailGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-0.5">
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium">
            Engineering Details
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left image - Exterior */}
          <motion.div
            className="relative h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden group cursor-pointer"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 transition-transform duration-700 ease-out group-hover:scale-105">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.05) 50px, rgba(0,0,0,0.05) 51px)`,
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium block mb-1">
                  Exterior
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-neutral-700 tracking-tight">
                  Iconic Silhouette
                </h3>
                <p className="text-xs text-neutral-400 mt-2 max-w-xs leading-relaxed hidden md:block">
                  The boxy, purposeful shape of the E30 M3 was dictated by aerodynamics, not aesthetics. Every line served a function on the track.
                </p>
              </div>
            </div>
            {/* BMW M stripe accent */}
            <div className="absolute top-6 left-6 flex gap-0.5 opacity-40">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          </motion.div>

          {/* Right image - Interior */}
          <motion.div
            className="relative h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden group cursor-pointer"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-350 transition-transform duration-700 ease-out group-hover:scale-105">
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(0,0,0,0.05) 50px, rgba(0,0,0,0.05) 51px)`,
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium block mb-1">
                  Interior
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-neutral-700 tracking-tight">
                  Racing Cockpit
                </h3>
                <p className="text-xs text-neutral-400 mt-2 max-w-xs leading-relaxed hidden md:block">
                  A cockpit designed for the track. Every gauge, every switch, every surface was engineered for the driver's absolute command.
                </p>
              </div>
            </div>
            <div className="absolute top-6 left-6 flex gap-0.5 opacity-40">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          </motion.div>
        </div>

        {/* Caption */}
        <motion.div
          className="mt-10 md:mt-14 flex items-start gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex gap-0.5 flex-shrink-0 mt-1">
            <div className="w-3 h-[1.5px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-3 h-[1.5px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-3 h-[1.5px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-lg italic leading-relaxed">
            The developers supplied the future M3 with the best components from the BMW Racing Parts shelf.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
