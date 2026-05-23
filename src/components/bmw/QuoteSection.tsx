'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40 bg-white overflow-hidden"
    >
      {/* Subtle background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-[200px] md:text-[300px] font-black tracking-tighter leading-none opacity-[0.012] text-neutral-900 block">
          &ldquo;
        </span>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Avatar placeholder */}
          <motion.div
            className="mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-neutral-50 border-2 border-neutral-100 mx-auto flex items-center justify-center">
              <span className="text-xl md:text-2xl font-black text-neutral-200">JN</span>
            </div>
          </motion.div>

          {/* Name and role */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg md:text-xl font-black text-neutral-900 tracking-tight">
              Jochen Neerpasch
            </h3>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-[0.2em]">
              Founder, BMW M Division
            </p>
          </motion.div>

          {/* M stripe divider */}
          <motion.div
            className="flex justify-center gap-1 mb-10"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            className="text-xl md:text-2xl lg:text-[1.7rem] font-medium leading-[1.5] text-neutral-700 italic"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            &ldquo;The M3 was never designed to be just another car. It was built to prove that the road and the racetrack are not separate worlds — they are the same road, seen from different speeds. Every component, every line, every decision was made with one purpose: to make the driver feel what we feel on the track.&rdquo;
          </motion.blockquote>

          {/* Decorative line */}
          <motion.div
            className="mt-12 mx-auto flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-8 h-[1px] bg-neutral-200" />
            <div className="flex gap-0.5">
              <div className="w-2 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-2 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-2 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            <div className="w-8 h-[1px] bg-neutral-200" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
