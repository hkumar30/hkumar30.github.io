'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { useReducedMotion } from 'framer-motion';

type MonologueSegment = {
  text: string;
  tone?: 'accent' | 'systems';
};

type MonologueLine = {
  segments: MonologueSegment[];
};

type MonologueShot = {
  id: number;
  x: string;
  y: string;
  angle: string;
  distance: string;
};

type MonologueStyle = CSSProperties & {
  '--monologue-cursor-x': string;
  '--monologue-cursor-y': string;
  '--monologue-shift-x': string;
  '--monologue-shift-y': string;
};

type MonologueShotStyle = CSSProperties & {
  '--shot-x': string;
  '--shot-y': string;
  '--shot-angle': string;
  '--shot-distance': string;
};

const MONOLOGUE_LINES: MonologueLine[] = [
  {
    segments: [
      { text: 'I grew up in' },
      { text: 'New Delhi', tone: 'accent' },
      {
        text:
          '- surrounded by chaos but more interested in what happened when systems broke.',
      },
    ],
  },
  {
    segments: [
      {
        text: 'Today I build',
      },
      {
        text: 'Production RAG systems',
        tone: 'systems',
      },
      {
        text:
          'for workflows that do not get a second chance to hallucinate in front of a real user.',
      },
    ],
  },
  {
    segments: [
      {
        text:
          'I care as much about how a system fails as I do about how it runs on a good day.',
      },
    ],
  },
];

const MONOLOGUE_TEXT = MONOLOGUE_LINES.flatMap((line) =>
  line.segments.map((segment) => segment.text),
).join(' ');

function MonologueTextLine({
  index,
  line,
  activeLine,
  reducedMotion,
}: {
  index: number;
  line: MonologueLine;
  activeLine: number;
  reducedMotion: boolean;
}) {
  const lineState = reducedMotion
    ? 'is-reduced'
    : index === activeLine
      ? 'is-active'
      : index < activeLine
        ? 'is-before'
        : 'is-after';

  return (
    <p
      className={`home-monologue-line ${lineState}`}
      aria-hidden="true"
    >
      {line.segments.map((segment, segmentIndex) => (
        <span
          key={`${segment.text}-${segmentIndex}`}
          className={`home-monologue-mark ${
            segment.tone ? `is-${segment.tone}` : ''
          }`}
        >
          {segment.text}
        </span>
      ))}
    </p>
  );
}

export default function HomeMonologue() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const shotTimersRef = useRef<number[]>([]);
  const shotIdRef = useRef(0);
  const [activeLine, setActiveLine] = useState(0);
  const [shots, setShots] = useState<MonologueShot[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const monologueStyle: MonologueStyle = {
    '--monologue-cursor-x': '54%',
    '--monologue-cursor-y': '44%',
    '--monologue-shift-x': '0px',
    '--monologue-shift-y': '0px',
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frame = 0;

    const updateActiveLine = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const rawProgress = (window.scrollY - sectionTop) / scrollableDistance;
      const progress = Math.min(0.999, Math.max(0, rawProgress));
      const nextActiveLine = Math.min(
        MONOLOGUE_LINES.length - 1,
        Math.floor(progress * MONOLOGUE_LINES.length),
      );

      setActiveLine((current) =>
        current === nextActiveLine ? current : nextActiveLine,
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveLine);
    };

    updateActiveLine();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      shotTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      shotTimersRef.current = [];
    };
  }, []);

  const syncCursorToPointer = (event: PointerEvent<HTMLElement>) => {
    const rect =
      stickyRef.current?.getBoundingClientRect() ??
      event.currentTarget.getBoundingClientRect();
    const x = Math.min(
      100,
      Math.max(0, ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100),
    );
    const y = Math.min(
      100,
      Math.max(0, ((event.clientY - rect.top) / Math.max(1, rect.height)) * 100),
    );
    const shiftX = ((x - 50) / 50) * 16;
    const shiftY = ((y - 50) / 50) * 12;

    event.currentTarget.style.setProperty('--monologue-cursor-x', `${x}%`);
    event.currentTarget.style.setProperty('--monologue-cursor-y', `${y}%`);
    event.currentTarget.style.setProperty('--monologue-shift-x', `${shiftX}px`);
    event.currentTarget.style.setProperty('--monologue-shift-y', `${shiftY}px`);

    return { rect, x, y, shiftX, shiftY };
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || event.pointerType === 'touch') return;

    syncCursorToPointer(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--monologue-cursor-x', '54%');
    event.currentTarget.style.setProperty('--monologue-cursor-y', '44%');
    event.currentTarget.style.setProperty('--monologue-shift-x', '0px');
    event.currentTarget.style.setProperty('--monologue-shift-y', '0px');
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || !event.isPrimary) return;

    const { rect, x, y } = syncCursorToPointer(event);
    const angle = Math.atan2(y - 50, x - 50) * (180 / Math.PI);
    const distance = Math.round(
      Math.min(280, Math.max(120, Math.hypot(rect.width, rect.height) * 0.13)),
    );
    const shot: MonologueShot = {
      id: shotIdRef.current,
      x: `${x}%`,
      y: `${y}%`,
      angle: `${Number.isFinite(angle) ? angle : 0}deg`,
      distance: `${distance}px`,
    };

    shotIdRef.current += 1;

    setShots((currentShots) => [...currentShots.slice(-4), shot]);

    const timer = window.setTimeout(() => {
      setShots((currentShots) =>
        currentShots.filter((currentShot) => currentShot.id !== shot.id),
      );
      shotTimersRef.current = shotTimersRef.current.filter(
        (currentTimer) => currentTimer !== timer,
      );
    }, 860);

    shotTimersRef.current.push(timer);
  };

  return (
    <section
      ref={sectionRef}
      className={`home-monologue ${
        prefersReducedMotion ? 'is-reduced' : ''
      }`}
      aria-label="About"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      style={monologueStyle}
    >
      <p className="sr-only">{MONOLOGUE_TEXT}</p>

      <div ref={stickyRef} className="home-monologue-sticky">
        <div className="home-monologue-graphic" aria-hidden="true">
          <svg
            className="home-monologue-blueprint"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            focusable="false"
          >
            <path d="M8 22 H31 V42 H55 V33 H83" />
            <path d="M12 73 H37 V61 H63 V78 H92" />
            <path d="M24 12 V82" />
            <path d="M72 15 V88" />
            <rect x="6" y="16" width="18" height="12" />
            <rect x="48" y="27" width="24" height="12" />
            <rect x="58" y="70" width="21" height="13" />
            <circle cx="31" cy="42" r="2.2" />
            <circle cx="55" cy="33" r="2.2" />
            <circle cx="37" cy="61" r="2.2" />
            <circle cx="72" cy="78" r="2.2" />
          </svg>
          <span className="home-monologue-hindi font-hindi">नमस्कार</span>
        </div>
        <div className="home-monologue-crosshair" aria-hidden="true">
          <span className="home-monologue-reticle" />
          {shots.map((shot) => (
            <span
              key={shot.id}
              className="home-monologue-shot"
              style={
                {
                  '--shot-x': shot.x,
                  '--shot-y': shot.y,
                  '--shot-angle': shot.angle,
                  '--shot-distance': shot.distance,
                } as MonologueShotStyle
              }
            />
          ))}
        </div>

        <div
          className={`home-monologue-copy ${
            prefersReducedMotion ? 'is-reduced' : ''
          }`}
          aria-hidden="true"
        >
          {MONOLOGUE_LINES.map((line, index) => (
            <MonologueTextLine
              key={index}
              index={index}
              line={line}
              activeLine={activeLine}
              reducedMotion={Boolean(prefersReducedMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
