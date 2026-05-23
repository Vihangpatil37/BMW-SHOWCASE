'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const paragraphs = [
    {
      text: 'Developed directly from motorsport, the BMW M3 of 1986 was the first of its kind — a road-legal vehicle derived directly from a racing car.',
      accent: false,
    },
    {
      text: 'Its engineering philosophy was simple: take the best from the track and bring it to the street. The result was nothing short of revolutionary.',
      accent: false,
    },
    {
      text: 'With its flared wheel arches, aggressive stance, and a high-revving four-cylinder engine that screamed to 6,000 RPM and beyond, the E30 M3 didn\'t just compete — it dominated.',
      accent: true,
    },
    {
      text: 'It became the most successful touring car in history, winning more races than any other model.',
      accent: false,
    },
    {
      text: 'The M3 wasn\'t just a car. It was a statement from BMW M that performance has no compromise.',
      accent: true,
    },
  ]

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      {/* Background decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-[300px] md:text-[500px] font-black tracking-tighter leading-none opacity-[0.015] text-neutral-900 block">
          M
        </span>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-24">
          {/* Left label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-medium">
              Introduction
            </span>
            <div className="mt-4 flex gap-0.5">
              <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            {/* Animated vertical line */}
            <div className="relative mt-8 h-32 w-[1px] bg-neutral-100 overflow-hidden hidden lg:block">
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{ height: lineHeight, backgroundColor: '#0066B1' }}
              />
            </div>
          </motion.div>

          {/* Right content */}
          <div className="max-w-2xl">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                className={`text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 last:mb-0 ${
                  paragraph.accent
                    ? 'font-black text-neutral-900 tracking-tight'
                    : 'font-medium text-neutral-600'
                }`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.18,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {paragraph.text}
              </motion.p>
            ))}

            {/* Bottom accent */}
            <motion.div
              className="mt-12 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex gap-0.5">
                <div className="w-6 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
                <div className="w-6 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
                <div className="w-6 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                BMW M Heritage
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
