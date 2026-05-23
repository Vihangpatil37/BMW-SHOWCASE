'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ModelViewerWithLoader } from './ModelViewer'

interface ShowcaseRow {
  modelPath: string
  color: string
  stripeColor: string
  label: string
  sublabel: string
  speed: number
}

const showcaseRows: ShowcaseRow[] = [
  {
    modelPath: '/models/red-car.glb',
    color: '#D5001C',
    stripeColor: '#D5001C',
    label: 'HELLROT',
    sublabel: 'Inferno Red — The Racing Color',
    speed: 1,
  },
  {
    modelPath: '/models/silver-car.glb',
    color: '#8C8C8C',
    stripeColor: '#0066B1',
    label: 'SILBER',
    sublabel: 'Arctic Silver — Engineering Precision',
    speed: 0.7,
  },
  {
    modelPath: '/models/black-car.glb',
    color: '#1A1A1A',
    stripeColor: '#003B7A',
    label: 'SCHWARZ',
    sublabel: 'Jet Black — The Stealth Variant',
    speed: 1.3,
  },
]

function ShowcaseRowItem({
  row,
  index,
}: {
  row: ShowcaseRow
  index: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: false, margin: '-10%' })
  const animFrameRef = useRef<number>(0)
  const speedRef = useRef(row.speed)
  const inViewRef = useRef(isInView)

  // Keep refs in sync
  useEffect(() => {
    speedRef.current = row.speed
    inViewRef.current = isInView
  }, [row.speed, isInView])

  useEffect(() => {
    const el = rowRef.current
    if (!el) return

    el.dataset.offset = (-window.innerWidth * (0.3 * index)).toString()

    const animate = () => {
      if (!el) return

      let offset = parseFloat(el.dataset.offset || '0')
      const speed = speedRef.current

      if (inViewRef.current) {
        offset += speed * 0.3
        if (offset > window.innerWidth * 2) offset = -window.innerWidth
        el.style.transform = `translateX(${offset}px)`
        el.dataset.offset = offset.toString()
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [index])

  return (
    <div ref={rowRef} className="flex items-center gap-0 will-change-transform">
      {/* Racing stripe behind car */}
      <div
        className="absolute left-0 right-0 h-[2px] opacity-15"
        style={{ backgroundColor: row.stripeColor, top: '50%' }}
      />
      {/* Additional decorative line */}
      <div
        className="absolute left-0 right-0 h-[1px] opacity-[0.06]"
        style={{ backgroundColor: row.stripeColor, top: 'calc(50% - 12px)' }}
      />
      <div className="relative w-[450px] md:w-[600px] h-[230px] md:h-[280px] flex-shrink-0">
        <ModelViewerWithLoader
          modelPath={row.modelPath}
          scale={0.8}
          position={[0, -0.5, 0]}
          className="w-full h-full"
          autoRotate
          autoRotateSpeed={0.4}
          cameraPosition={[4, 1.5, 4]}
        />
      </div>
      <div className="flex-shrink-0 ml-8 md:ml-12">
        <span
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter opacity-[0.05] block"
          style={{ color: row.color }}
        >
          {row.label}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.25em] font-medium block mt-1 opacity-40"
          style={{ color: row.color }}
        >
          {row.sublabel}
        </span>
      </div>
    </div>
  )
}

export default function CarShowcase() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    // Mobile: stacked vertical sections with reveal animations
    return (
      <section className="py-20" style={{ backgroundColor: '#F5F3F0' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex gap-0.5">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              The Collection
            </h2>
          </div>
          <div className="space-y-8">
            {showcaseRows.map((row, i) => (
              <motion.div
                key={row.label}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Stripe accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] opacity-20"
                  style={{ backgroundColor: row.stripeColor }}
                />
                <div className="pl-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                    <span
                      className="text-xs uppercase tracking-[0.2em] font-semibold"
                      style={{ color: row.color }}
                    >
                      {row.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-4">{row.sublabel}</p>
                  <div className="h-[280px]">
                    <ModelViewerWithLoader
                      modelPath={row.modelPath}
                      scale={0.7}
                      position={[0, -0.5, 0]}
                      className="w-full h-full"
                      autoRotate
                      autoRotateSpeed={0.3}
                      cameraPosition={[4, 1.5, 4]}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: '#F5F3F0' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            The Collection
          </h2>
        </div>
        <p className="text-neutral-300 text-xs mt-2 tracking-wider">SCROLL TO EXPLORE VARIANTS</p>
      </div>
      <div className="space-y-0">
        {showcaseRows.map((row, i) => (
          <div key={row.label} className="relative h-[260px] md:h-[300px] overflow-hidden border-b border-neutral-200/30">
            {/* Vertical racing line */}
            <div
              className="absolute top-0 bottom-0 w-[1px] opacity-[0.08]"
              style={{ backgroundColor: row.stripeColor, left: `${20 + i * 10}%` }}
            />
            {/* Horizontal stripe at center */}
            <div
              className="absolute left-0 right-0 h-[2px] opacity-[0.06]"
              style={{ backgroundColor: row.stripeColor, top: '50%', transform: 'translateY(-50%)' }}
            />
            <ShowcaseRowItem row={row} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
