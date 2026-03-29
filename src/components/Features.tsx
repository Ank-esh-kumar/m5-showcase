'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FEATURES } from '../../data/carData';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const featureVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="features"
      className="py-28 px-6 border-t border-white/5"
      aria-label="Key Features"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-20 h-px bg-pagani-gold mb-6 origin-left"
          />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-orbitron text-4xl md:text-5xl font-black text-white tracking-tight"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            ENGINEERED FOR
            <br />
            <span className="text-pagani-gold">PERFECTION</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8"
        >
          {FEATURES.map((feature, i) => (
            <motion.article
              key={feature.title}
              variants={featureVariants}
              className="group relative"
            >
              {/* Gold number */}
              <div
                className="font-orbitron text-7xl font-black text-white/5 group-hover:text-pagani-gold/10 transition-colors duration-500 leading-none mb-4 select-none"
                style={{ fontFamily: 'var(--font-orbitron)' }}
                aria-hidden
              >
                0{i + 1}
              </div>

              <div className="w-8 h-px bg-pagani-gold mb-4" />

              <h3
                className="font-orbitron text-lg font-bold text-white mb-2 tracking-widest"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                {feature.title}
              </h3>
              <p
                className="font-rajdhani text-pagani-gold/70 text-sm tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: 'var(--font-rajdhani)' }}
              >
                {feature.description}
              </p>
              <p
                className="font-rajdhani text-white/40 text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-rajdhani)' }}
              >
                {feature.detail}
              </p>

              {/* Hover bottom line */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-pagani-gold/30 transition-all duration-500" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
