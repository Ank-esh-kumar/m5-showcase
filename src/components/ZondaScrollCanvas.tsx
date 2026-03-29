'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface ZondaScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function ZondaScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: ZondaScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const isLoadedRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Build frame filename from index (1-indexed, zero-padded to 3 digits)
  const getFramePath = useCallback(
    (index: number) => {
      const padded = String(index).padStart(3, '0');
      return `${imageFolderPath}/ezgif-frame-${padded}.png`;
    },
    [imageFolderPath],
  );

  // Draw a single frame onto the canvas with object-contain logic
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const iW = img.naturalWidth;
    const iH = img.naturalHeight;

    let scale = Math.min(W / iW, H / iH);
    if (window.innerWidth < 768) {
      scale *= 1.6;
    }
    
    const x = (W - iW * scale) / 2;
    const y = (H - iH * scale) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Snap to exact pixels to prevent subpixel rendering blur
    const finalX = Math.round(x * dpr);
    const finalY = Math.round(y * dpr);
    const finalW = Math.round(iW * scale * dpr);
    const finalH = Math.round(iH * scale * dpr);
    
    ctx.drawImage(img, finalX, finalY, finalW, finalH);
  }, []);

  // Resize canvas and redraw current frame
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    // Redraw current frame after resize
    const img = imagesRef.current[currentFrameRef.current];
    if (img && isLoadedRef.current) {
      drawFrame(img);
    }
  }, [drawFrame]);

  // Preload all frames
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          isLoadedRef.current = true;
          // Draw the first frame once everything is loaded
          drawFrame(imagesRef.current[0]);
        }
        // Draw first frame as soon as it loads for instant feedback
        if (i === 1) drawFrame(img);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [totalFrames, getFramePath, drawFrame, resizeCanvas]);

  // React to scroll progress changes and update the canvas frame
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const frameIndex = Math.min(
      Math.max(0, Math.round(latest * (totalFrames - 1))),
      totalFrames - 1,
    );

    if (frameIndex === currentFrameRef.current) return;
    currentFrameRef.current = frameIndex;

    const img = imagesRef.current[frameIndex];
    if (img && img.complete && img.naturalHeight > 0) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(() => {
        drawFrame(img);
      });
    }
  });

  return (
    <canvas
      ref={canvasRef}
      id="zonda-canvas"
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block', willChange: 'transform' }}
      aria-label="BMW M5 Competition rotating 360-degree view"
    />
  );
}
