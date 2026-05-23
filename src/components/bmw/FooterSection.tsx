'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, Instagram, ArrowUpRight } from 'lucide-react'

export default function FooterSection() {
  const navLinks = [
    { name: 'Heritage', href: '#heritage' },
    { name: 'Models', href: '#models' },
    { name: 'Motorsport', href: '#motorsport' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer id="contact" className="relative bg-neutral-950 text-white overflow-hidden">
      {/* BMW M racing stripes - THICK top border */}
      <div className="absolute top-0 left-0 right-0 flex h-[12px] z-10">
        <div className="flex-1" style={{ backgroundColor: '#0066B1' }} />
        <div className="flex-1" style={{ backgroundColor: '#003B7A' }} />
        <div className="flex-1" style={{ backgroundColor: '#D5001C' }} />
      </div>

      {/* Background stripe accents */}
      <div className="absolute top-0 left-[10%] w-[1px] h-full opacity-[0.03]" style={{ backgroundColor: '#0066B1' }} />
      <div className="absolute top-0 left-[12%] w-[1px] h-full opacity-[0.03]" style={{ backgroundColor: '#003B7A' }} />
      <div className="absolute top-0 left-[14%] w-[1px] h-full opacity-[0.03]" style={{ backgroundColor: '#D5001C' }} />

      {/* Large background text */}
      <div className="absolute bottom-0 right-0 select-none pointer-events-none">
        <span className="text-[150px] md:text-[250px] font-black tracking-tighter leading-none opacity-[0.02] text-white block">
          M3
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        {/* CTA section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center gap-1 mb-8">
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-8 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Experience the Legend
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed font-mono">
            Discover the heritage of BMW M and the cars that defined an era of motorsport excellence. Schedule a private viewing.
          </p>
          <button className="group relative inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-semibold text-white pb-3 border-b border-white/20 transition-all duration-300 hover:border-white/80 hover:tracking-[0.3em]">
            Schedule a Viewing
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full" style={{ backgroundColor: '#D5001C' }} />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-700 delay-100 group-hover:w-full" style={{ backgroundColor: '#0066B1' }} />
          </button>
        </motion.div>

        {/* Divider with M colors */}
        <div className="flex gap-1 mb-16">
          <div className="w-24 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
          <div className="w-24 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
          <div className="w-24 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
        </div>

        {/* Footer content - Massive 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-black tracking-tight mb-2">
              Classic Autos
            </h3>
            <span className="text-xs font-mono tracking-widest text-neutral-500 block mb-6">GMBH</span>
            <p className="text-sm font-mono text-neutral-500 leading-relaxed">
              Dedicated to preserving and celebrating the legacy of BMW&apos;s most iconic motorsport vehicles. Every car tells a story of speed, precision, and unrelenting ambition.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-sm font-mono text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-white transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-6 font-semibold">
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-neutral-500" />
                <span className="text-sm font-mono text-neutral-400">+49 89 123 456</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-neutral-500" />
                <span className="text-sm font-mono text-neutral-400">info@classic-autos.de</span>
              </li>
              <li className="flex items-center gap-4">
                <Instagram className="w-4 h-4 text-neutral-500" />
                <span className="text-sm font-mono text-neutral-400">@classicautos_bmw</span>
              </li>
            </ul>

            {/* Address */}
            <div className="mt-8 pt-6 border-t border-neutral-800/50">
              <p className="text-sm font-mono text-neutral-500 leading-relaxed">
                Petuelring 130<br />
                80809 Munchen<br />
                Germany
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-600 tracking-wider">
            &copy; {new Date().getFullYear()} Classic Autos GmbH. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5">
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
              <div className="w-4 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
            </div>
            <span className="text-[9px] text-neutral-700 tracking-widest uppercase">BMW M Heritage</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
