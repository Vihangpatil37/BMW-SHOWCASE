'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ModelViewerWithLoader } from './ModelViewer'

interface Variant {
  modelPath: string
  label: string
  labelEn: string
  stripeColor: string
  accentColor: string
  description: string
}

const variants: Variant[] = [
  {
    modelPath: '/models/red-car.glb',
    label: 'HELLROT',
    labelEn: 'Hellrot Red',
    stripeColor: '#D5001C',
    accentColor: '#D5001C',
    description: 'The color of competition. The same red that crossed the finish line first at Spa, Nurburgring, and every circuit that mattered.',
  },
  {
    modelPath: '/models/silver-car.glb',
    label: 'SILBER',
    labelEn: 'Polar Silver',
    stripeColor: '#0066B1',
    accentColor: '#8C8C8C',
    description: 'Understated precision. The silver that reflected BMW\'s engineering-first philosophy — no excess, only purpose.',
  },
  {
    modelPath: '/models/black-car.glb',
    label: 'SCHWARZ',
    labelEn: 'Jet Black',
    stripeColor: '#003B7A',
    accentColor: '#1A1A1A',
    description: 'Absolute authority. Black was the color of the night races, the test mules, and the engineers\' own machines.',
  },
]

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
      className="relative min-h-[80vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Racing stripes behind model */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: stripeY }}>
        <div className="w-full h-[2px] opacity-[0.04] absolute top-1/2 -translate-y-1/2" style={{ backgroundColor: variant.stripeColor }} />
        <div className="absolute top-[30%] left-0 right-0 h-[1px] opacity-[0.03]" style={{ backgroundColor: variant.stripeColor }} />
        <div className="absolute top-[70%] left-0 right-0 h-[1px] opacity-[0.03]" style={{ backgroundColor: variant.stripeColor }} />
        {/* Diagonal accent */}
        <div
          className="absolute w-[1px] h-[200%] opacity-[0.03] left-[25%] top-[-50%]"
          style={{ backgroundColor: variant.stripeColor, transform: 'rotate(15deg)' }}
        />
      </motion.div>

      {/* Large label - moves with parallax */}
      <motion.div
        className="absolute z-0 select-none pointer-events-none"
        style={{ x: labelX }}
      >
        <span
          className="text-[100px] md:text-[200px] lg:text-[280px] font-black tracking-tighter leading-none opacity-[0.025]"
          style={{ color: variant.accentColor }}
        >
          {variant.label}
        </span>
      </motion.div>

      {/* 3D Model */}
      <motion.div
        className="relative z-10 w-full max-w-2xl h-[320px] md:h-[450px] lg:h-[500px]"
        style={{ scale: modelScale, opacity }}
      >
        <ModelViewerWithLoader
          modelPath={variant.modelPath}
          scale={1}
          position={[0, -0.5, 0]}
          className="w-full h-full"
          autoRotate
          autoRotateSpeed={0.25}
          cameraPosition={[5, 2, 5]}
        />
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
        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900">
          {variant.label}
        </h3>
        <p className="text-sm text-neutral-400 mt-1 mb-4">{variant.labelEn}</p>
        <p className="text-sm text-neutral-500 leading-relaxed">{variant.description}</p>
      </motion.div>

      {/* Right side number */}
      <motion.div
        className="absolute top-12 md:top-20 right-6 md:right-12 lg:right-20 z-20"
        style={{ opacity }}
      >
        <span
          className="text-8xl md:text-9xl font-black tracking-tighter leading-none opacity-[0.04]"
          style={{ color: variant.accentColor }}
        >
          0{index + 1}
        </span>
      </motion.div>
    </div>
  )
}

export default function VariantShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F5F3F0' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-24">
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
          <p className="text-neutral-300 text-xs tracking-wider">EXPLORE EACH VARIANT IN DETAIL</p>
        </motion.div>
      </div>
      {variants.map((variant, i) => (
        <VariantRow key={variant.label} variant={variant} index={i} />
      ))}
    </section>
  )
}
