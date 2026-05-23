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
      {/* BMW M racing stripes */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px] z-10">
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
        <span className="text-[150px] md:text-[250px] font-black tracking-tighter leading-none opacity-[0.015] text-white block">
          M3
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">
        {/* CTA section */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center gap-1 mb-6">
            <div className="w-6 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
            <div className="w-6 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
            <div className="w-6 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Experience the Legend
          </h2>
          <p className="text-neutral-500 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
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
        <div className="flex gap-1 mb-12">
          <div className="w-16 h-[2px]" style={{ backgroundColor: '#0066B1' }} />
          <div className="w-16 h-[2px]" style={{ backgroundColor: '#003B7A' }} />
          <div className="w-16 h-[2px]" style={{ backgroundColor: '#D5001C' }} />
        </div>

        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Company info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-black tracking-tight mb-1">
              Classic Autos
            </h3>
            <span className="text-xs font-light tracking-widest text-neutral-600 block mb-5">GMBH</span>
            <p className="text-sm text-neutral-500 leading-relaxed">
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
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-5 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="w-0 group-hover:w-3 h-[1px] bg-white transition-all duration-300" />
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
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-neutral-600 mb-5 font-semibold">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-400">+49 89 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-400">info@classic-autos.de</span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-neutral-600" />
                <span className="text-sm text-neutral-400">@classicautos_bmw</span>
              </li>
            </ul>

            {/* Address */}
            <div className="mt-6 pt-4 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-600 leading-relaxed">
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
