'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ModelViewerWithLoader } from './ModelViewer'

export default function RacingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const stripeY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Grain/noise overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
        <filter id="grain-racing">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-racing)" opacity="0.03"/>
      </svg>

      {/* BMW M stripes accent at top */}
      <div className="absolute top-0 left-0 right-0 flex h-[2px] z-20">
        <div className="flex-1" style={{ backgroundColor: '#0066B1' }} />
        <div className="flex-1" style={{ backgroundColor: '#003B7A' }} />
        <div className="flex-1" style={{ backgroundColor: '#D5001C' }} />
      </div>

      {/* Ambient blue glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,177,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Ambient red glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(213,0,28,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Animated diagonal racing lines */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: stripeY }}>
        <div
          className="absolute w-[1px] h-[200%] opacity-[0.07] left-[15%] top-[-50%]"
          style={{ backgroundColor: '#D5001C', transform: 'rotate(20deg)' }}
        />
        <div
          className="absolute w-[1px] h-[200%] opacity-[0.05] left-[70%] top-[-50%]"
          style={{ backgroundColor: '#0066B1', transform: 'rotate(-15deg)' }}
        />
        <div
          className="absolute w-[1px] h-[200%] opacity-[0.06] left-[85%] top-[-50%]"
          style={{ backgroundColor: '#003B7A', transform: 'rotate(10deg)' }}
        />
      </motion.div>

      {/* Large background number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span className="text-[200px] md:text-[350px] font-black tracking-tighter leading-none text-white block"
          style={{ opacity: 0.02 }}
        >
          M3
        </span>
      </div>

      <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-0.5">
                <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
                <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
                <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-medium">
                Motorsport
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-[2.8rem] font-black tracking-tight leading-[1.05] text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Like the road vehicle, the racing version was also an outstanding success, becoming world champion in its first year.
            </motion.h2>

            <motion.p
              className="mt-6 text-sm text-neutral-500 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              In 1987, just one year after the M3&apos;s debut, Roberto Ravaglia secured the World Touring Car Championship title. It was the beginning of an unprecedented era of dominance that would see the M3 claim over 1,500 race victories across every major touring car series on the planet.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button className="group relative text-sm uppercase tracking-[0.2em] font-semibold text-white pb-2 transition-all duration-300 hover:tracking-[0.3em]"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}
              >
                Learn More
                <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full" style={{ backgroundColor: '#D5001C' }} />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { value: '1,500+', label: 'Race Wins' },
                { value: '50+', label: 'Championships' },
                { value: '1986', label: 'Year Founded' },
              ].map((stat, i) => (
                <div key={i} className="relative">
                  <span className="text-2xl md:text-3xl font-black text-white block">{stat.value}</span>
                  <span className="text-[10px] text-neutral-600 mt-1 uppercase tracking-wider block">{stat.label}</span>
                  {i < 2 && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-8" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Black Car */}
          <motion.div
            className="relative h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Enhanced glow behind car */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{ 
                background: 'radial-gradient(circle, rgba(0,102,177,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full"
              style={{ 
                background: 'radial-gradient(circle, rgba(213,0,28,0.07) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Sketchfab BMW M3 GTR Embed (matches Hero Section styling exactly) */}
            <div className="relative z-10 mx-auto w-full max-w-[520px] h-[170px] flex items-center justify-center">
              <iframe
                title="BMW M3 GTR E46 Street ACschnitzer BlackEdition"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src="https://sketchfab.com/models/7f060f9d44b74c34a5184399a6cfc6d7/embed?autospin=1&autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&preload=1&transparent=1&dnt=1"
                style={{
                  border: 'none',
                  background: 'transparent',
                  position: 'absolute',
                  top: '-100px',
                  left: '-20%',
                  width: '140%',
                  maxWidth: 'none',
                  height: 'calc(100% + 200px)',
                  clipPath: 'inset(60px 0 60px 0)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom stripe */}
      <div className="absolute bottom-0 left-0 right-0 flex h-[2px] z-20">
        <div className="flex-1" style={{ backgroundColor: '#0066B1' }} />
        <div className="flex-1" style={{ backgroundColor: '#003B7A' }} />
        <div className="flex-1" style={{ backgroundColor: '#D5001C' }} />
      </div>
    </section>
  )
}
