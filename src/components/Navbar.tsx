'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-pagani-black/95 backdrop-blur-xl border-b border-pagani-gold/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-screen-xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span
            className="font-orbitron text-pagani-gold text-xl font-bold tracking-[0.3em] uppercase gold-glow"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            BMW
          </span>
          <span
            className="font-rajdhani text-white/60 text-xs tracking-[0.5em] uppercase mt-0.5"
            style={{ fontFamily: 'var(--font-rajdhani)' }}
          >
            M5 COMPETITION
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {['DESIGN', 'PERFORMANCE', 'HERITAGE', 'CONFIGURE'].map((item) => (
            <button
              key={item}
              className="font-rajdhani text-xs tracking-[0.25em] text-white/50 hover:text-pagani-gold transition-colors duration-300 uppercase"
              style={{ fontFamily: 'var(--font-rajdhani)' }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          id="navbar-inquire-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:block font-orbitron text-xs tracking-[0.3em] uppercase px-6 py-2.5 border border-pagani-gold text-pagani-gold hover:bg-pagani-gold hover:text-pagani-black transition-all duration-300"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          INQUIRE
        </motion.button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-pagani-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-pagani-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-pagani-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-dark border-t border-pagani-gold/20 px-6 py-4 flex flex-col gap-4"
        >
          {['DESIGN', 'PERFORMANCE', 'HERITAGE', 'CONFIGURE'].map((item) => (
            <button
              key={item}
              className="font-rajdhani text-xs tracking-[0.25em] text-white/50 hover:text-pagani-gold text-left uppercase"
              style={{ fontFamily: 'var(--font-rajdhani)' }}
            >
              {item}
            </button>
          ))}
          <button
            className="font-orbitron text-xs tracking-[0.3em] uppercase px-6 py-2.5 border border-pagani-gold text-pagani-gold w-fit"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            INQUIRE
          </button>
        </motion.div>
      )}
    </header>
  );
}
