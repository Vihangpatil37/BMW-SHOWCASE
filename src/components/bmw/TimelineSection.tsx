'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timeline: TimelineEvent[] = [
  {
    year: '1986',
    title: 'Birth of a Legend',
    description: 'The E30 M3 is unveiled at the Frankfurt Motor Show. Homologation requirements demand 5,000 road cars — BMW builds a masterpiece.',
  },
  {
    year: '1987',
    title: 'First Championship',
    description: 'In its debut season, the M3 wins the World Touring Car Championship with Roberto Ravaglia. A champion in its first year.',
  },
  {
    year: '1988',
    title: 'Total Dominance',
    description: 'Multiple national titles secured across Europe. The M3 becomes the weapon of choice for every works and privateer team.',
  },
  {
    year: '1990',
    title: 'Sport Evolution',
    description: 'The M3 Sport Evolution is released — the ultimate expression of the E30 M3. Wider arches, more power, zero compromise.',
  },
]

const dotColors = ['#0066B1', '#003B7A', '#D5001C', '#D5001C']

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    // Vertical timeline for mobile
    return (
      <section
        ref={ref}
        className="py-24"
        style={{ backgroundColor: '#F5F3F0' }}
      >
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex gap-0.5">
              <div className="w-6 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-6 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-6 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Heritage
            </h2>
          </div>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-neutral-200" />
            {timeline.map((event, i) => (
              <motion.div
                key={event.year}
                className="relative mb-12 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-8 top-1 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: dotColors[i],
                    backgroundColor: '#F5F3F0',
                  }}
                />
                <span className="text-3xl font-black text-neutral-900 tracking-tight">{event.year}</span>
                <h3 className="text-sm font-bold text-neutral-700 mt-1">{event.title}</h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{event.description}</p>
                <div className="mt-2 w-6 h-[2px]" style={{ backgroundColor: dotColors[i], opacity: 0.5 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-16 md:mb-24">
          <div className="flex gap-0.5">
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Heritage
          </h2>
        </div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Main line */}
          <motion.div
            className="absolute top-[35px] left-0 right-0 h-[1px] bg-neutral-200"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />

          <div className="grid grid-cols-4 gap-4">
            {timeline.map((event, i) => (
              <motion.div
                key={event.year}
                className="relative pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
              >
                {/* Dot on the line */}
                <motion.div
                  className="absolute top-[28px] w-4 h-4 rounded-full border-2 z-10"
                  style={{
                    borderColor: dotColors[i],
                    backgroundColor: '#F5F3F0',
                    left: i === 0 ? 0 : undefined,
                    right: i === timeline.length - 1 ? 0 : undefined,
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.2 + 0.6,
                    type: 'spring',
                  }}
                />

                {/* Year */}
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight block">
                  {event.year}
                </span>

                {/* Title and description */}
                <h3 className="text-sm md:text-base font-bold text-neutral-700 mt-3">
                  {event.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-400 mt-2 leading-relaxed">
                  {event.description}
                </p>

                {/* Accent line */}
                <motion.div
                  className="mt-4 h-[2px]"
                  style={{ backgroundColor: dotColors[i] }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 32 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.2 + 0.9 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
