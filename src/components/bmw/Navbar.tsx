'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Heritage', 'Models', 'Motorsport', 'Contact']

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="transition-all duration-500"
          style={{
            backgroundColor: scrolled ? 'rgba(245, 243, 240, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
          }}
        >
          {/* BMW M stripe accent at top */}
          <div className="flex h-[2px]">
            <div className="flex-1" style={{ backgroundColor: '#0066B1' }} />
            <div className="flex-1" style={{ backgroundColor: '#003B7A' }} />
            <div className="flex-1" style={{ backgroundColor: '#D5001C' }} />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black tracking-tight text-neutral-900 transition-colors duration-300">
                  BMW <span className="font-light">M3</span>
                </span>
                <div className="flex gap-0.5 mt-0.5">
                  <div className="w-3 h-[1.5px] group-hover:w-5 transition-all duration-300" style={{ backgroundColor: '#0066B1' }} />
                  <div className="w-3 h-[1.5px] group-hover:w-5 transition-all duration-300 delay-75" style={{ backgroundColor: '#003B7A' }} />
                  <div className="w-3 h-[1.5px] group-hover:w-5 transition-all duration-300 delay-150" style={{ backgroundColor: '#D5001C' }} />
                </div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 transition-colors duration-300 relative group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#D5001C' }} />
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[1.5px] bg-neutral-900"
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-neutral-900"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-neutral-900"
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

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
            <div className="absolute inset-0 bg-black/20" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 w-72 h-full shadow-2xl"
              style={{ backgroundColor: '#F5F3F0' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="pt-24 px-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block py-4 text-lg font-medium text-neutral-800 border-b border-neutral-200/50"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </motion.a>
                ))}
                <div className="flex gap-0.5 mt-8">
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
