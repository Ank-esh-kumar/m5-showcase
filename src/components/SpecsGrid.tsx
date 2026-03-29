'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ENGINE_SPECS } from '../../data/carData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SpecsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="specs"
      className="py-32 px-6 max-w-screen-xl mx-auto"
      aria-label="Technical Specifications"
    >
      {/* Section header */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-20 h-px bg-pagani-gold mx-auto mb-6 origin-left"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-orbitron text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          TECHNICAL
          <span className="text-pagani-gold"> SPECS</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-rajdhani text-white/40 text-lg tracking-wider max-w-md mx-auto"
          style={{ fontFamily: 'var(--font-rajdhani)' }}
        >
          Numbers don't lie. The M5 Competition speaks in absolutes.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {ENGINE_SPECS.map((spec) => (
          <motion.div
            key={spec.label}
            variants={cardVariants}
            whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.5)' }}
            className="group relative p-6 md:p-8 border border-white/10 bg-carbon-gray/50 hover:bg-carbon-gray transition-all duration-300"
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-pagani-gold/0 group-hover:border-pagani-gold/60 transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-pagani-gold/0 group-hover:border-pagani-gold/60 transition-all duration-300" />

            <div
              className="font-rajdhani text-white/30 text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: 'var(--font-rajdhani)' }}
            >
              {spec.label}
            </div>
            <div className="flex items-end gap-2">
              <span
                className="font-orbitron text-3xl md:text-4xl font-black text-white group-hover:text-pagani-gold transition-colors duration-300"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                {spec.value}
              </span>
              <span
                className="font-rajdhani text-pagani-gold/60 text-sm pb-1"
                style={{ fontFamily: 'var(--font-rajdhani)' }}
              >
                {spec.unit}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
