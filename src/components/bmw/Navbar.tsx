'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const showAnim = gsap.from(navRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: "power2.out"
    }).progress(1)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) {
          showAnim.play()
        } else if (self.direction === 1 && self.scrollY > 50) {
          showAnim.reverse()
        }
        
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: self.progress })
        }
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const navLinks = ['Heritage', 'Models', 'Motorsport', 'Contact']

  return (
    <>
      <div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(8, 8, 8, 0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        {/* M stripe scroll-progress bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 origin-left overflow-hidden">
          <div 
            ref={progressRef} 
            className="w-full h-full origin-left m-gradient-border"
            style={{ 
              background: 'linear-gradient(to right, #0066B1, #003B7A, #D5001C)',
              transform: 'scaleX(0)'
            }} 
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20 mt-[2px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-neutral-200">
                BMW <span className="font-light text-neutral-400">M3</span>
              </span>
              <div className="flex gap-0.5 mt-0.5">
                <div className="w-3 h-[1.5px] group-hover:w-5 transition-all duration-300" style={{ backgroundColor: '#0066B1' }} />
                <div className="w-3 h-[1.5px] group-hover:w-5 transition-all duration-300 delay-75" style={{ backgroundColor: '#003B7A' }} />
                <div className="w-3 h-[1.5px] group-hover:w-5 transition-all duration-300 delay-150" style={{ backgroundColor: '#D5001C' }} />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#D5001C' }} />
              </a>
            ))}
          </div>

          {/* Right side CTA */}
          <div className="hidden md:flex items-center">
            <button
              className="px-6 py-2 rounded-full text-xs uppercase tracking-[0.1em] font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
              style={{ 
                background: 'linear-gradient(135deg, #003B7A, #0066B1)',
                border: '1px solid rgba(0,102,177,0.3)',
              }}
            >
              <span className="relative z-10">Configure</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #0066B1, #003B7A)' }} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-white"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 w-72 h-full shadow-2xl"
              style={{ 
                backgroundColor: '#0d0d0d',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="pt-24 px-8 flex flex-col h-full">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block py-4 text-lg font-medium text-neutral-300 hover:text-white border-b border-white/5 transition-colors duration-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </motion.a>
                ))}
                
                <motion.button 
                  className="mt-8 px-6 py-3 w-full rounded-full text-sm uppercase tracking-[0.1em] font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #003B7A, #0066B1)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Configure
                </motion.button>

                <div className="flex gap-0.5 mt-auto mb-12">
                  <div className="w-10 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
                  <div className="w-10 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
                  <div className="w-10 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
