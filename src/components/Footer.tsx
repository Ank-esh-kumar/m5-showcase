'use client';

import { motion } from 'framer-motion';

const links = [
  { heading: 'MODELS', items: ['M2', 'M3', 'M4', 'M5'] },
  { heading: 'COMPANY', items: ['History', 'Atelier', 'Racing', 'Press'] },
  { heading: 'SERVICES', items: ['Private Config', 'Track Experience', 'Restoration', 'Contact'] },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/10 pt-20 pb-10 px-6"
      aria-label="Site footer"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Top row */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div
              className="font-orbitron text-pagani-gold text-2xl font-bold tracking-[0.3em] mb-1 gold-glow"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              BMW
            </div>
            <div
              className="font-rajdhani text-white/30 text-xs tracking-[0.5em] mb-6"
              style={{ fontFamily: 'var(--font-rajdhani)' }}
            >
              M GMBH
            </div>
            <p
              className="font-rajdhani text-white/30 text-sm leading-relaxed max-w-52"
              style={{ fontFamily: 'var(--font-rajdhani)' }}
            >
              Daimlerstraße 19, 85748 Garching bei München, Germany.
            </p>
          </div>

          {/* Link columns */}
          {links.map(({ heading, items }) => (
            <div key={heading}>
              <div
                className="font-orbitron text-pagani-gold text-xs tracking-[0.4em] mb-5"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                {heading}
              </div>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <button
                      className="font-rajdhani text-white/40 text-sm tracking-wide hover:text-pagani-gold transition-colors duration-300 text-left"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-rajdhani text-white/20 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-rajdhani)' }}
          >
            © {year} BMW M GmbH. All rights reserved. <span className="mx-2 opacity-50">|</span> Created by <span className="text-pagani-gold">Ankesh _kumar_singh</span>
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Cookies', 'Legal'].map((item) => (
              <button
                key={item}
                className="font-rajdhani text-white/20 text-xs tracking-[0.3em] uppercase hover:text-pagani-gold transition-colors duration-300"
                style={{ fontFamily: 'var(--font-rajdhani)' }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
