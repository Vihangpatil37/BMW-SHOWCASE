'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RacingStripes from './RacingStripes'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const carX = useTransform(scrollYProgress, [0, 1], [0, 200])
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const stripeY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay z-0" />

      {/* Ambient glow - blue */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,102,177,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Ambient glow - red */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(213,0,28,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Background racing stripes */}
      <motion.div style={{ y: stripeY }} className="absolute inset-0 z-0">
        <RacingStripes direction="diagonal" opacity={0.03} animated />
      </motion.div>

      {/* BMW M stripe accent at top */}
      <div className="absolute top-0 left-0 right-0 flex h-[2px] z-30">
        <div className="flex-1" style={{ backgroundColor: '#0066B1' }} />
        <div className="flex-1" style={{ backgroundColor: '#003B7A' }} />
        <div className="flex-1" style={{ backgroundColor: '#D5001C' }} />
      </div>

      {/* Large decorative background number */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
        style={{ opacity }}
      >
        <span className="text-[200px] md:text-[300px] lg:text-[400px] font-black tracking-tighter leading-none text-white"
          style={{ opacity: 0.025 }}
        >
          M3
        </span>
      </motion.div>

      {/* Horizontal racing lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ top: '35%', backgroundColor: '#0066B1', opacity: 0.06, y: stripeY }}
        />
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ top: '50%', backgroundColor: '#003B7A', opacity: 0.04, y: stripeY }}
        />
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ top: '65%', backgroundColor: '#D5001C', opacity: 0.05, y: stripeY }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Text */}
        <motion.div style={{ y: textY, opacity }} className="relative z-20">
          {/* Pre-title / Eyebrow */}
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-0.5">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-neutral-500 font-bold">
              M3 E30 · 1986 · Group A Homologation
            </span>
          </motion.div>

          {/* Main headline - Staggered lines */}
          <div className="mb-6" style={{ perspective: '1000px' }}>
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'bottom' }}
            >
              <h1 className="text-[3.2rem] md:text-6xl lg:text-[5.5rem] font-black tracking-[-0.02em] text-white" style={{ lineHeight: 0.9 }}>
                BMW BELIEVES LIFE
              </h1>
            </motion.div>
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'bottom' }}
            >
              <h1 className="text-[3.2rem] md:text-6xl lg:text-[5.5rem] font-black tracking-[-0.02em] text-white" style={{ lineHeight: 0.9 }}>
                BEGINS AT <span style={{ color: '#D5001C' }}>6000 RPM.</span>
              </h1>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base text-neutral-500 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            The E30 M3. Born from homologation, raised on the racetrack, and immortalized as the most successful touring car in history.
          </motion.p>

          {/* RPM Counter */}
          <motion.div 
            className="mt-8 mb-6 flex items-baseline gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <span 
              className="text-4xl md:text-5xl font-black text-white"
              ref={(el) => {
                if (el && !el.dataset.animated) {
                  el.dataset.animated = 'true';
                  const rpmObj = { val: 0 };
                  import('gsap').then(({ gsap }) => {
                    gsap.to(rpmObj, {
                      val: 6000,
                      duration: 2.5,
                      ease: "power3.out",
                      delay: 1.5,
                      onUpdate: () => {
                        if (el) el.innerText = Math.round(rpmObj.val).toLocaleString();
                      }
                    });
                  });
                }
              }}
            >
              0
            </span>
            <span className="text-sm font-bold tracking-widest" style={{ color: '#D5001C' }}>RPM</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          >
            <button className="group relative text-sm uppercase tracking-[0.2em] font-semibold text-white pb-2 transition-all duration-300 hover:tracking-[0.35em]">
              Explore
              <span className="absolute bottom-0 left-0 h-[2px] w-full transition-all duration-300 group-hover:w-[120%]" style={{ backgroundColor: '#D5001C' }} />
            </button>
            <span className="text-neutral-700">|</span>
            <button className="text-sm uppercase tracking-[0.15em] font-medium text-neutral-600 hover:text-white transition-colors duration-300">
              Heritage
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-14 hidden md:flex gap-10 md:gap-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.8 }}
          >
            {[
              { value: '200', unit: 'HP', label: 'S14 Engine' },
              { value: '6,000', unit: 'RPM', label: 'Redline' },
              { value: '1,500+', unit: '', label: 'Race Wins' },
            ].map((stat, i) => (
              <div key={i} className="relative">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-3xl font-black text-white">{stat.value}</span>
                  {stat.unit && <span className="text-xs font-medium text-neutral-600">{stat.unit}</span>}
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 mt-1 block">{stat.label}</span>
                {i < 2 && (
                  <div className="absolute -right-5 md:-right-7 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/10" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Sketchfab BMW M3 E30 */}
        <motion.div
          className="relative h-[350px] md:h-[500px] lg:h-[650px] flex items-center justify-center lg:mt-24"
          style={{ x: carX }}
          initial={{ opacity: 0, x: 150, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-white/[0.04] pointer-events-none z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-white/[0.02] pointer-events-none z-0" />

          {/* Blue glow behind car */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(0,102,177,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Sketchfab BMW M3 E30 Embed */}
          {/* Make the iframe canvas much larger than the container so the car has 
              plenty of horizontal room to spin without hitting the edges.
              Use clipPath to hide the Sketchfab title and toolbar (top/bottom 60px). */}
          <motion.div style={{ scale: carScale }} className="relative z-10 mx-auto w-full max-w-[691px] h-[198px] flex items-center justify-center">
            <iframe
              title="BMW M3 E30"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/ac3c7013434e403e8faff87948caf422/embed?autospin=1&autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&preload=1&transparent=1&dnt=1"
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
          </motion.div>


        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-600">Scroll</span>
        <motion.div
          className="w-[1px] h-8 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ height: '40%', backgroundColor: '#0066B1' }}
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
