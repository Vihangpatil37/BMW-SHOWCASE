'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ModelViewerWithLoader } from './ModelViewer'

import { SketchfabEmbed } from './SketchfabEmbed'
import { variants, type Variant } from '@/constants/bmwData'

function VariantRow({ variant, index }: { variant: Variant; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: false, margin: '-20%' })
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  })

  const labelX = useTransform(scrollYProgress, [0, 1], [150, -150])
  const modelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const stripeY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <div
      ref={rowRef}
      className={`relative ${variant.heightClass} flex items-center justify-center overflow-hidden`}
      style={{ backgroundColor: variant.bgColor }}
    >
      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Ambient color glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${variant.accentColor}08 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Racing stripes behind model */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: stripeY }}>
        <div className="w-full h-[1px] opacity-[0.06] absolute top-1/2 -translate-y-1/2" style={{ backgroundColor: variant.stripeColor }} />
        <div className="absolute top-[30%] left-0 right-0 h-[1px] opacity-[0.03]" style={{ backgroundColor: variant.stripeColor }} />
        <div className="absolute top-[70%] left-0 right-0 h-[1px] opacity-[0.03]" style={{ backgroundColor: variant.stripeColor }} />
        <div
          className="absolute w-[1px] h-[200%] opacity-[0.04] left-[25%] top-[-50%]"
          style={{ backgroundColor: variant.stripeColor, transform: 'rotate(15deg)' }}
        />
      </motion.div>

      {/* Large label - moves with parallax */}
      <motion.div
        className="absolute z-0 select-none pointer-events-none"
        style={{ x: labelX }}
      >
        <span
          className="text-[100px] md:text-[200px] lg:text-[280px] font-black tracking-tighter leading-none"
          style={{ color: variant.accentColor, opacity: 0.05 }}
          aria-hidden="true"
        >
          {variant.label}
        </span>
      </motion.div>

      {/* 3D Model — Exact container sizing requested by user for uniform car sizing */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[580px] h-[200px] flex items-center justify-center"
        style={{ scale: modelScale, opacity }}
      >
        {variant.sketchfabId ? (
          // Sketchfab embed — oversized canvas to prevent horizontal clipping,
          // with CSS clip-path to hide the Sketchfab UI bars (top/bottom 50px).
            <SketchfabEmbed
              title={variant.labelEn}
              sketchfabId={variant.sketchfabId}
              lazyLoad={true}
              top="-100px"
              left="-25%"
              width="150%"
              height="calc(100% + 200px)"
              clipPath="inset(50px 0 50px 0)"
            />
        ) : (
          <ModelViewerWithLoader
            modelPath={variant.modelPath}
            scale={1}
            position={[0, -0.5, 0]}
            className="w-full h-full"
            autoRotate={false}
            cameraPosition={variant.cameraPosition}
            environmentPreset={variant.environmentPreset}
          />
        )}
      </motion.div>

      {/* Variant info */}
      <motion.div
        className="absolute bottom-12 md:bottom-20 left-6 md:left-12 lg:left-20 z-20 max-w-sm"
        style={{ opacity: isInView ? 1 : 0 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px]" style={{ backgroundColor: variant.stripeColor }} />
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: variant.stripeColor }}>
            Variant {index + 1} of 3
          </span>
        </div>
        <h3 className={`text-3xl md:text-4xl font-black tracking-tight ${variant.textColor}`}>
          {variant.label}
        </h3>
        <p className={`text-sm mt-1 mb-4 ${variant.subTextColor}`}>{variant.labelEn}</p>
        <p className={`text-sm leading-relaxed ${variant.subTextColor}`}>{variant.description}</p>
      </motion.div>

      {/* Right side number */}
      <motion.div
        className="absolute top-12 md:top-20 right-6 md:right-12 lg:right-20 z-20"
        style={{ opacity }}
      >
        <span
          className="text-8xl md:text-9xl font-black tracking-tighter leading-none text-white"
          style={{ opacity: 0.04 }}
          aria-hidden="true"
        >
          0{index + 1}
        </span>
      </motion.div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }} />
    </div>
  )
}

export default function VariantShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="flex flex-col overflow-hidden">
      <div className="w-full" style={{ backgroundColor: '#080808' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
                <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
                <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
              </div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Color Variants
              </h2>
            </div>
            <p className="text-neutral-700 text-xs tracking-wider">EXPLORE EACH VARIANT IN DETAIL</p>
          </motion.div>
        </div>
      </div>
      {variants.map((variant, i) => (
        <VariantRow key={variant.label} variant={variant} index={i} />
      ))}
    </section>
  )
}
