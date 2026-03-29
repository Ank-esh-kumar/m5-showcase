'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ZondaScrollCanvas from '@/components/ZondaScrollCanvas';
import ZondaExperience from '@/components/ZondaExperience';
import SpecsGrid from '@/components/SpecsGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import ScrollAudio from '@/components/ScrollAudio';

const TOTAL_FRAMES = 240;
const IMAGE_FOLDER = '/images/zonda-sequence';

export default function Home() {
  // The scroll container that locks the user for 600vh
  const containerRef = useRef<HTMLElement>(null);

  // Single source of truth for scroll progress — passed to all children
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offsetEnd 'end end' means scrollYProgress hits 1.0 when the
    // bottom of the container aligns with the bottom of the viewport
    offset: ['start start', 'end end'],
  });

  return (
    <main className="bg-pagani-black">
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <Navbar />

      {/* ── SCROLL-LOCKED IMAGE SEQUENCE (600vh) ───────────────── */}
      <section
        ref={containerRef}
        className="relative"
        style={{ height: '600vh' }}
        aria-label="BMW M5 Competition 360-degree showcase"
      >
        {/* Sticky viewport that pins the canvas + HUD for the full 600vh */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh' }}
        >
          {/* Layer 0 — Image sequence canvas */}
          <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <ZondaScrollCanvas
              scrollYProgress={scrollYProgress}
              totalFrames={TOTAL_FRAMES}
              imageFolderPath={IMAGE_FOLDER}
            />
          </div>

          {/* Layer 10 — HUD text overlay */}
          <div className="absolute inset-0" style={{ zIndex: 10 }}>
            <ZondaExperience scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </section>

      {/* ── BELOW-THE-FOLD CONTENT (scrolls freely) ────────────── */}
      <div className="relative bg-pagani-black" style={{ zIndex: 20 }}>
        {/* Separator gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-pagani-gold/30 to-transparent" />

        <SpecsGrid />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <Features />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <Footer />
      </div>

      {/* Global Scroll Audio Player */}
      <ScrollAudio scrollYProgress={scrollYProgress} />
    </main>
  );
}
