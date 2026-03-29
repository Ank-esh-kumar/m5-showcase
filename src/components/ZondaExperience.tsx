'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { HUD_PHASES, PRICE, PRODUCTION_COUNT, YEAR } from '../../data/carData';

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
}

type PhaseId = 'hero' | 'design' | 'engine';

const fadeVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(8px)',
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const lineVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// HUD corner decoration
function HudCorner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const cls = {
    tl: 'top-0 left-0 border-t border-l',
    tr: 'top-0 right-0 border-t border-r',
    bl: 'bottom-0 left-0 border-b border-l',
    br: 'bottom-0 right-0 border-b border-r',
  }[position];

  return (
    <div
      className={`absolute w-6 h-6 border-pagani-gold/50 ${cls}`}
      aria-hidden
    />
  );
}



// Progress bar showing scroll through the sequence
function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <div className="w-48 h-px bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-pagani-gold"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <span
        className="font-rajdhani text-white/30 text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: 'var(--font-rajdhani)' }}
      >
        SCROLL TO EXPLORE
      </span>
    </div>
  );
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
  const [activePhase, setActivePhase] = useState<PhaseId>('hero');
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);

    if (latest < 0.33) setActivePhase('hero');
    else if (latest < 0.66) setActivePhase('design');
    else setActivePhase('engine');
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
      aria-live="polite"
    >
      {/* Subtle dark vignette gradient so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />



      {/* Full viewport HUD frame */}
      <div className="absolute inset-4 md:inset-8">
        <HudCorner position="tl" />
        <HudCorner position="tr" />
        <HudCorner position="bl" />
        <HudCorner position="br" />

        {/* Phase content */}
        <AnimatePresence mode="wait">
          {activePhase === 'hero' && (
            <motion.div
              key="hero"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-[10vh] left-4 md:bottom-24 md:left-6 w-[90vw] md:max-w-xl"
              id="hud-hero"
            >
              {/* Badge */}
              <motion.div variants={lineVariant} className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-pagani-gold" />
                <span
                  className="font-rajdhani text-pagani-gold text-xs tracking-[0.4em] uppercase"
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                >
                  M PERFORMANCE
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                variants={lineVariant}
                className="font-orbitron text-4xl md:text-7xl lg:text-8xl font-black text-white leading-none gold-glow mb-1"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                BMW
              </motion.h1>
              <motion.div
                variants={lineVariant}
                className="font-orbitron text-2xl md:text-4xl lg:text-5xl font-bold text-pagani-gold leading-none mb-6"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                M5 COMPETITION
              </motion.div>

              {/* Body copy */}
              <motion.p
                variants={lineVariant}
                className="font-rajdhani text-white/60 text-base md:text-lg tracking-wide leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-rajdhani)' }}
              >
                The ultimate driving machine. Track-ready precision.
                <br />
                Uncompromising luxury.
              </motion.p>

              {/* Price + CTA */}
              <motion.div variants={lineVariant} className="flex items-center gap-6">
                <div>
                  <div
                    className="font-rajdhani text-white/30 text-xs tracking-[0.3em] uppercase mb-1"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}
                  >
                    STARTING FROM
                  </div>
                  <div
                    className="font-orbitron text-pagani-gold text-xl font-bold tracking-wider"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    {PRICE}
                  </div>
                </div>
                <div className="w-px h-10 bg-pagani-gold/20" />
                <div>
                  <div
                    className="font-rajdhani text-white/30 text-xs tracking-[0.3em] uppercase mb-1"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}
                  >
                    PRODUCED
                  </div>
                  <div
                    className="font-orbitron text-white text-xl font-bold"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    {PRODUCTION_COUNT} <span className="text-sm font-normal text-white/40">UNITS</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activePhase === 'design' && (
            <motion.div
              key="design"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-[10vh] left-4 md:bottom-24 md:left-6 w-[90vw] md:max-w-lg"
              id="hud-design"
            >
              <motion.div variants={lineVariant} className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-pagani-gold" />
                <span
                  className="font-rajdhani text-pagani-gold text-xs tracking-[0.4em] uppercase"
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                >
                  ENGINEERED DYNAMICS
                </span>
              </motion.div>

              <motion.h2
                variants={lineVariant}
                className="font-orbitron text-4xl md:text-6xl font-black text-white leading-none mb-2"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                INNOVATION
              </motion.h2>
              <motion.div
                variants={lineVariant}
                className="font-orbitron text-xl md:text-2xl text-pagani-gold/80 mb-6"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                M xDrive System
              </motion.div>

              <motion.div variants={staggerContainer} className="flex flex-col gap-3">
                {[
                  { label: 'DRIVE', value: 'M xDrive AWD with 2WD mode' },
                  { label: 'TRANSMISSION', value: '8-Speed M Steptronic' },
                  { label: 'WEIGHT', value: '1,970 kg curb weight' },
                  { label: 'SUSPENSION', value: 'Adaptive M Suspension' },
                ].map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={lineVariant}
                    className="flex items-center gap-4"
                  >
                    <span
                      className="font-rajdhani text-pagani-gold/60 text-xs tracking-[0.3em] w-20"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}
                    >
                      {label}
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                    <span
                      className="font-rajdhani text-white/80 text-sm tracking-wide"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}
                    >
                      {value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activePhase === 'engine' && (
            <motion.div
              key="engine"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute bottom-[20vh] right-4 md:bottom-24 md:right-6 w-[90vw] md:max-w-sm text-right"
              id="hud-engine"
            >
              <motion.div variants={lineVariant} className="flex items-center justify-end gap-3 mb-4">
                <span
                  className="font-rajdhani text-pagani-gold text-xs tracking-[0.4em] uppercase"
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                >
                  M TWINPOWER TURBO
                </span>
                <div className="w-8 h-px bg-pagani-gold" />
              </motion.div>

              <motion.h2
                variants={lineVariant}
                className="font-orbitron text-4xl md:text-6xl font-black text-white leading-none mb-2"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                HEART OF M
              </motion.h2>
              <motion.div
                variants={lineVariant}
                className="font-orbitron text-xl md:text-2xl text-pagani-gold mb-8"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                4.4L V8 · 617 HP
              </motion.div>

              <motion.div variants={staggerContainer} className="flex flex-col gap-4">
                {[
                  { label: 'ENGINE', value: '4.4L V8 Twin-Turbo' },
                  { label: 'POWER', value: '617 HP' },
                  { label: 'TORQUE', value: '750 Nm' },
                  { label: 'MAX RPM', value: '7,200' },
                  { label: '0–100', value: '3.3 sec' },
                ].map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={lineVariant}
                    className="flex items-center gap-4 justify-end"
                  >
                    <span
                      className="font-orbitron text-white text-sm md:text-base font-bold tracking-wide"
                      style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                      {value}
                    </span>
                    <div className="w-16 h-px bg-pagani-gold/30" />
                    <span
                      className="font-rajdhani text-pagani-gold/60 text-xs tracking-[0.3em] w-14"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase indicators — top right */}
        <div className="hidden md:flex absolute top-6 right-8 flex-col gap-2">
          {(['hero', 'design', 'engine'] as PhaseId[]).map((phase, i) => (
            <div key={phase} className="flex items-center gap-2">
              <span
                className={`font-rajdhani text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                  activePhase === phase ? 'text-pagani-gold' : 'text-white/20'
                }`}
                style={{ fontFamily: 'var(--font-rajdhani)' }}
              >
                {phase === 'hero' ? '01' : phase === 'design' ? '02' : '03'}
              </span>
              <div
                className={`h-px transition-all duration-500 ${
                  activePhase === phase ? 'w-8 bg-pagani-gold' : 'w-3 bg-white/20'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Year badge top-center */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <span
            className="font-orbitron text-white/10 text-xs tracking-[0.5em]"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {YEAR}
          </span>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <ScrollProgressBar progress={progress} />
    </div>
  );
}
