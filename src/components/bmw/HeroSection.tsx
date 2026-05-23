'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ModelViewerWithLoader } from './ModelViewer'
import RacingStripes from './RacingStripes'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const carX = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const stripeY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const headline = "BMW BELIEVES LIFE BEGINS AT 6000 RPM."
  const words = headline.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.5,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#F5F3F0' }}
    >
      {/* Background racing stripes */}
      <motion.div style={{ y: stripeY }} className="absolute inset-0">
        <RacingStripes direction="diagonal" opacity={0.05} animated />
      </motion.div>

      {/* BMW M stripe accent at top */}
      <div className="absolute top-0 left-0 right-0 flex h-1 z-30">
        <div className="flex-1" style={{ backgroundColor: '#0066B1' }} />
        <div className="flex-1" style={{ backgroundColor: '#003B7A' }} />
        <div className="flex-1" style={{ backgroundColor: '#D5001C' }} />
      </div>

      {/* Large decorative background number */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
        style={{ opacity }}
      >
        <span className="text-[200px] md:text-[300px] lg:text-[400px] font-black tracking-tighter leading-none opacity-[0.02] text-neutral-900">
          M3
        </span>
      </motion.div>

      {/* Horizontal racing lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ top: '35%', backgroundColor: '#0066B1', opacity: 0.04, y: stripeY }}
        />
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ top: '50%', backgroundColor: '#003B7A', opacity: 0.04, y: stripeY }}
        />
        <motion.div
          className="absolute left-0 right-0 h-[1px]"
          style={{ top: '65%', backgroundColor: '#D5001C', opacity: 0.04, y: stripeY }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24 md:pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Text */}
        <motion.div style={{ y: textY, opacity }} className="relative z-20">
          {/* Pre-title */}
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-0.5">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-neutral-400 font-medium">
              BMW M Division — Since 1972
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-[3.2rem] md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[0.88] text-neutral-900"
            style={{ perspective: '1000px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.22em]"
                style={{ transformOrigin: 'bottom' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-sm md:text-base text-neutral-400 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            The E30 M3. Born from homologation, raised on the racetrack, and immortalized as the most successful touring car in history.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-10 flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <button className="group relative text-sm uppercase tracking-[0.2em] font-semibold text-neutral-900 pb-2 transition-all duration-300 hover:tracking-[0.35em]">
              Explore
              <span className="absolute bottom-0 left-0 h-[2px] w-full transition-all duration-300 group-hover:w-[120%]" style={{ backgroundColor: '#D5001C' }} />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 delay-75 group-hover:w-full" style={{ backgroundColor: '#0066B1' }} />
            </button>
            <span className="text-neutral-300">|</span>
            <button className="text-sm uppercase tracking-[0.15em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-300">
              Heritage
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="mt-14 flex gap-10 md:gap-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {[
              { value: '200', unit: 'HP', label: 'S14 Engine' },
              { value: '6,000', unit: 'RPM', label: 'Redline' },
              { value: '1,500+', unit: '', label: 'Race Wins' },
            ].map((stat, i) => (
              <div key={i} className="relative">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-3xl font-black text-neutral-900">{stat.value}</span>
                  {stat.unit && <span className="text-xs font-medium text-neutral-400">{stat.unit}</span>}
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mt-1 block">{stat.label}</span>
                {i < 2 && (
                  <div className="absolute -right-5 md:-right-7 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-neutral-200" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - 3D Car */}
        <motion.div
          className="relative h-[350px] md:h-[500px] lg:h-[650px]"
          style={{ x: carX }}
          initial={{ opacity: 0, x: 150, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative circle behind car */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-neutral-200/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-neutral-200/20" />

          <ModelViewerWithLoader
            modelPath="/models/red-car.glb"
            scale={1.2}
            position={[0, -0.5, 0]}
            enableMouseRotation
            className="w-full h-full"
            cameraPosition={[5, 2, 5]}
            autoRotate
            autoRotateSpeed={0.2}
          />

          {/* Model label */}
          <motion.div
            className="absolute bottom-4 md:bottom-8 right-0 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-300 block">E30 Generation</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-300">1986—1991</span>
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
        <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400">Scroll</span>
        <motion.div
          className="w-[1px] h-8 bg-neutral-300 relative overflow-hidden"
        >
          <motion.div
            className="absolute top-0 left-0 w-full bg-neutral-600"
            style={{ height: '40%' }}
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
