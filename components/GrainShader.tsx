'use client';

import { useEffect, useRef } from 'react';

const TILE_SIZE = 160;
const MAX_FPS = 30;
const FRAME_MS = 1000 / MAX_FPS;

function createNoiseTile(size: number) {
  const tile = document.createElement('canvas');
  tile.width = size;
  tile.height = size;

  const tileCtx = tile.getContext('2d');
  if (!tileCtx) return tile;

  const image = tileCtx.createImageData(size, size);
  for (let index = 0; index < image.data.length; index += 4) {
    const grain = 228 + Math.floor(Math.random() * 24);
    const alpha = 9 + Math.floor(Math.random() * 18);
    image.data[index] = grain;
    image.data[index + 1] = grain;
    image.data[index + 2] = grain;
    image.data[index + 3] = alpha;
  }

  tileCtx.putImageData(image, 0, 0);
  return tile;
}

export default function GrainShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const tile = createNoiseTile(TILE_SIZE);
    const pattern = context.createPattern(tile, 'repeat');
    if (!pattern) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let latestScrollY = 0;
    let frameRequest = 0;
    let pendingFrame = false;
    let lastFrameAt = 0;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const scheduleFrame = () => {
      if (pendingFrame) return;
      pendingFrame = true;
      frameRequest = window.requestAnimationFrame(renderFrame);
    };

    const renderFrame = (timestamp: number) => {
      pendingFrame = false;

      if (timestamp - lastFrameAt < FRAME_MS) {
        scheduleFrame();
        return;
      }
      lastFrameAt = timestamp;

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = pattern;

      // Scroll offset acts as uTime/uOffset to shift grain across the paper.
      const shiftX = (latestScrollY * 0.11) % TILE_SIZE;
      const shiftY = (latestScrollY * 0.17) % TILE_SIZE;
      context.save();
      context.translate(-shiftX, -shiftY);
      context.fillRect(-TILE_SIZE, -TILE_SIZE, width + TILE_SIZE * 2, height + TILE_SIZE * 2);
      context.restore();
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY || 0;
      scheduleFrame();
    };

    const handleResize = () => {
      resizeCanvas();
      scheduleFrame();
    };

    resizeCanvas();
    latestScrollY = window.scrollY || 0;
    scheduleFrame();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameRequest);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="grain-shader-canvas" />;
}
