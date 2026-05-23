'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export default function DetailGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: '#080808' }}
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
          {/* Left panel - Exterior */}
          <motion.div
            className="relative h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden group cursor-pointer rounded-sm"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Image background */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <Image 
                src="/images/engineering-exterior.jpg" 
                alt="Exterior Details" 
                fill 
                className="object-cover" 
              />
              {/* Dark overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* BMW blue top-left glow */}
              <div
                className="absolute top-0 left-0 w-[200px] h-[200px]"
                style={{
                  background: 'radial-gradient(circle, rgba(0,102,177,0.12) 0%, transparent 70%)',
                }}
              />
            </div>

            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 font-medium block mb-1">
                  Exterior
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Iconic Silhouette
                </h3>
                <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed hidden md:block">
                  The boxy, purposeful shape of the E30 M3 was dictated by aerodynamics, not aesthetics. Every line served a function on the track.
                </p>
              </div>
            </div>

            {/* BMW M stripe accent */}
            <div className="absolute top-6 left-6 flex gap-0.5 opacity-50">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />
            {/* Bottom border that expands on hover */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: 'linear-gradient(90deg, #0066B1, #003B7A, #D5001C)' }} />
          </motion.div>

          {/* Right panel - Interior */}
          <motion.div
            className="relative h-[300px] md:h-[450px] lg:h-[550px] overflow-hidden group cursor-pointer rounded-sm"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <Image 
                src="/images/engineering-interior.jpg" 
                alt="Interior Details" 
                fill 
                className="object-cover" 
              />
              {/* Dark overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* BMW red top-right glow */}
              <div
                className="absolute top-0 right-0 w-[200px] h-[200px]"
                style={{
                  background: 'radial-gradient(circle, rgba(213,0,28,0.08) 0%, transparent 70%)',
                }}
              />
            </div>

            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 font-medium block mb-1">
                  Interior
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Racing Cockpit
                </h3>
                <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed hidden md:block">
                  A cockpit designed for the track. Every gauge, every switch, every surface was engineered for the driver&apos;s absolute command.
                </p>
              </div>
            </div>

            <div className="absolute top-6 left-6 flex gap-0.5 opacity-50">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>

            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700" style={{ background: 'linear-gradient(90deg, #D5001C, #003B7A, #0066B1)' }} />
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
          <p className="text-sm md:text-base text-neutral-600 max-w-lg italic leading-relaxed">
            The developers supplied the future M3 with the best components from the BMW Racing Parts shelf.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
