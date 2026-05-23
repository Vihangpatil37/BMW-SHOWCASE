'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface TimelineEvent {
  year: string
  title: string
  description: string
  championship: string
  victories: string
  flag: string
}

const timeline: TimelineEvent[] = [
  {
    year: '1986',
    title: 'Birth of a Legend',
    description: 'The E30 M3 is unveiled at the Frankfurt Motor Show. Homologation requirements demand 5,000 road cars — BMW builds a masterpiece.',
    championship: 'Group A Homologation',
    victories: 'Debut',
    flag: '🇩🇪',
  },
  {
    year: '1987',
    title: 'First Championship',
    description: 'In its debut season, the M3 wins the World Touring Car Championship with Roberto Ravaglia. A champion in its first year.',
    championship: 'WTCC Champion',
    victories: '14+',
    flag: '🇮🇹',
  },
  {
    year: '1988',
    title: 'Total Dominance',
    description: 'Multiple national titles secured across Europe. The M3 becomes the weapon of choice for every works and privateer team.',
    championship: 'ETCC Champion',
    victories: '50+',
    flag: '🇪🇺',
  },
  {
    year: '1990',
    title: 'Sport Evolution',
    description: 'The M3 Sport Evolution is released — the ultimate expression of the E30 M3. Wider arches, more power, zero compromise.',
    championship: 'DTM Champion',
    victories: '1500+ (Total)',
    flag: '🇩🇪',
  },
]

const dotColors = ['#0066B1', '#003B7A', '#D5001C', '#D5001C']

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const svgLineRef = useRef<SVGLineElement>(null)
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (svgLineRef.current) {
      const length = svgLineRef.current.getTotalLength() || 2000
      gsap.set(svgLineRef.current, { strokeDasharray: length, strokeDashoffset: length })

      gsap.to(svgLineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [isMobile])

  const toggleYear = (year: string) => {
    if (activeYear === year) setActiveYear(null)
    else setActiveYear(year)
  }

  if (isMobile) {
    return (
      <section
        ref={ref}
        className="py-24"
        style={{ backgroundColor: '#0d0d0d' }}
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
            <svg className="absolute left-[3px] top-0 bottom-0 w-[2px] h-full" style={{ zIndex: 0 }}>
              <line 
                ref={svgLineRef}
                x1="0" y1="0" x2="0" y2="100%" 
                stroke="rgba(255,255,255,0.08)" strokeWidth="2"
              />
            </svg>
            
            {timeline.map((event, i) => (
              <div key={event.year} className="relative mb-12 last:mb-0">
                <button
                  onClick={() => toggleYear(event.year)}
                  className="absolute -left-10 top-1 w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center transition-transform hover:scale-110"
                  style={{ 
                    borderColor: dotColors[i],
                    backgroundColor: activeYear === event.year ? dotColors[i] + '20' : '#0d0d0d',
                  }}
                >
                  <div className={`w-2 h-2 rounded-full transition-all ${activeYear === event.year ? 'scale-100' : 'scale-0'}`}
                    style={{ backgroundColor: dotColors[i] }}
                  />
                </button>
                <div className="cursor-pointer" onClick={() => toggleYear(event.year)}>
                  <span className={`text-3xl font-black tracking-tight transition-colors ${activeYear === event.year ? 'text-white' : 'text-neutral-700'}`}>
                    {event.year}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-500 mt-1">{event.title}</h3>
                </div>
                
                <AnimatePresence>
                  {activeYear === event.year && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-neutral-500 mt-3 leading-relaxed border-l-2 pl-3" style={{ borderColor: dotColors[i] }}>
                        {event.description}
                      </p>
                      <div className="mt-4 p-4 rounded-lg flex flex-col gap-3"
                        style={{ 
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-neutral-600">Title</span>
                          <span className="text-xs font-bold text-white">{event.championship}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-neutral-600">Victories</span>
                          <span className="text-xs font-bold text-white">{event.victories}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider text-neutral-600">Nation</span>
                          <span className="text-base">{event.flag}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-16 md:mb-24">
          <div className="flex gap-0.5">
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Heritage Timeline
          </h2>
        </div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Animated SVG line */}
          <svg className="absolute top-[28px] left-0 right-0 w-full h-[4px] pointer-events-none" style={{ zIndex: 0 }}>
            <line 
              ref={svgLineRef}
              x1="0" y1="2" x2="100%" y2="2" 
              stroke="rgba(255,255,255,0.08)" strokeWidth="2"
            />
          </svg>

          <div className="grid grid-cols-4 gap-4">
            {timeline.map((event, i) => (
              <div key={event.year} className="relative pt-8 group">
                {/* Clickable Node */}
                <button
                  onClick={() => toggleYear(event.year)}
                  className="absolute top-[18px] w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center transition-all hover:scale-125 focus:outline-none"
                  style={{
                    borderColor: dotColors[i],
                    backgroundColor: activeYear === event.year ? dotColors[i] + '20' : '#0d0d0d',
                    left: i === 0 ? 0 : undefined,
                    right: i === timeline.length - 1 ? 0 : undefined,
                    boxShadow: activeYear === event.year ? `0 0 16px ${dotColors[i]}40` : 'none',
                  }}
                  aria-label={`View details for ${event.year}`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all ${activeYear === event.year ? 'scale-100' : 'scale-0'}`}
                    style={{ backgroundColor: dotColors[i] }}
                  />
                </button>

                {/* Year Label */}
                <button 
                  onClick={() => toggleYear(event.year)}
                  className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight block transition-colors focus:outline-none text-left ${
                    activeYear === event.year 
                      ? 'text-white' 
                      : 'text-neutral-800 group-hover:text-neutral-600'
                  }`}
                >
                  {event.year}
                </button>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-neutral-600 mt-3 pr-4">
                  {event.title}
                </h3>

                {/* Sliding Fact Panel */}
                <AnimatePresence>
                  {activeYear === event.year && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden mt-4 pr-4"
                    >
                      <p className="text-xs md:text-sm text-neutral-500 mb-4 leading-relaxed border-l-2 pl-3" style={{ borderColor: dotColors[i] }}>
                        {event.description}
                      </p>
                      
                      <div className="p-4 rounded-xl flex flex-col gap-3"
                        style={{ 
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          boxShadow: `0 0 40px ${dotColors[i]}10`,
                        }}
                      >
                        <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">Title</span>
                          <span className="text-xs font-bold text-white">{event.championship}</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">Victories</span>
                          <span className="text-xs font-black text-white">{event.victories}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">Nation</span>
                          <span className="text-lg">{event.flag}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
