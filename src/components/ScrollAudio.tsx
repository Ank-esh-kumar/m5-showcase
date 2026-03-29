'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, MotionValue, useMotionValueEvent } from 'framer-motion';

interface ScrollAudioProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollAudio({ scrollYProgress }: ScrollAudioProps) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio tag properly
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio-editor-output.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0; // start muted
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isSoundOn) {
      audioRef.current.pause();
      audioRef.current.volume = 0;
      setIsSoundOn(false);
    } else {
      // Browsers handle play requests better when invoked directly inside the click event
      audioRef.current.play().then(() => {
        audioRef.current!.volume = 0.2;
        audioRef.current!.playbackRate = 0.8;
        setIsSoundOn(true);
      }).catch((err) => {
        console.warn("Audio autoplay blocked:", err);
        setIsSoundOn(false);
      });
    }
  };

  // Handle scroll velocity and map it to engine pitch/volume
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Reveal the button once they hit the 'Heart of M' phase (scroll > 0.66)
    // Hide it once the sticky animation ends (scroll >= 0.99)
    if (latest > 0.66 && latest < 0.99) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) setIsVisible(false);
      // Auto-pause if they scroll completely past the animation
      if (isSoundOn && audioRef.current && latest >= 0.99) {
        audioRef.current.pause();
        setIsSoundOn(false);
      }
    }

    if (!isSoundOn || !audioRef.current) return;
    
    const velocity = scrollYProgress.getVelocity();
    const absVel = Math.abs(velocity);
    
    const targetVolume = Math.min(0.2 + absVel * 0.3, 1.0);
    const targetRate = Math.min(0.8 + absVel * 0.15, 1.8);

    audioRef.current.volume = targetVolume;
    audioRef.current.playbackRate = targetRate;

    // Reset idle timeout
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    
    idleTimeout.current = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.2;
        audioRef.current.playbackRate = 0.8;
      }
    }, 150);
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end gap-3 md:gap-4 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Lucrative Description */}
      <motion.div 
        initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
        animate={{ 
          opacity: isHovering ? 1 : 0, 
          x: isHovering ? 0 : 20, 
          filter: isHovering ? 'blur(0px)' : 'blur(4px)' 
        }}
        transition={{ duration: 0.4 }}
        className="glass-dark bg-black/90 backdrop-blur-xl border border-pagani-gold/20 p-4 md:p-5 max-w-[220px] md:max-w-[260px] text-right pointer-events-none shadow-2xl"
      >
        <h3 
          className="font-orbitron text-white text-lg font-bold tracking-[0.2em] leading-tight mb-2 uppercase"
          style={{ fontFamily: 'var(--font-orbitron)' }}
        >
          <span className="text-pagani-gold">M TwinPower</span> Roar
        </h3>
        <p 
          className="font-rajdhani text-white/50 text-xs tracking-[0.15em] uppercase leading-relaxed"
          style={{ fontFamily: 'var(--font-rajdhani)' }}
        >
          Ignite the 4.4L V8. Experience the visceral symphony of 617 horses seamlessly tied to your scroll velocity. 
        </p>
      </motion.div>

      {/* Interactive Toggle */}
      <button
        onClick={toggleSound}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`font-orbitron text-xs tracking-[0.3em] uppercase px-6 py-3 border transition-all duration-500 flex items-center gap-3 backdrop-blur-md
          ${isSoundOn 
            ? 'border-pagani-gold bg-pagani-gold text-pagani-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
            : 'border-white/20 bg-black/60 text-white/60 hover:border-pagani-gold/50 hover:text-pagani-gold'
          }
        `}
        style={{ fontFamily: 'var(--font-orbitron)' }}
      >
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isSoundOn ? 'bg-pagani-black animate-pulse' : 'bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`} />
        SOUND: {isSoundOn ? 'ON' : 'OFF'}
      </button>
    </motion.div>
  );
}
