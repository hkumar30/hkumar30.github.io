import { useState } from 'react';
import { useTheme } from '../ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Toggle theme"
      title="Toggle notebook / chalkboard"
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        zIndex: 20,
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: hovered ? 'var(--highlighter-yellow)' : 'transparent',
        border: '1.5px solid var(--pencil-light)',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="crayonHalf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--sharpie)" />
            <stop offset="48%" stopColor="var(--sharpie)" />
            <stop offset="52%" stopColor="var(--paper-bg)" />
            <stop offset="100%" stopColor="var(--paper-bg)" />
          </linearGradient>
        </defs>
        {/* Crayon body */}
        <rect
          x="10" y="4" width="12" height="20" rx="2.5"
          fill="url(#crayonHalf)"
          stroke="var(--black-pen)"
          strokeWidth="1.4"
        />
        {/* Tip */}
        <path
          d="M10 24 L16 30 L22 24 Z"
          fill="url(#crayonHalf)"
          stroke="var(--black-pen)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Label band */}
        <rect
          x="10" y="10" width="12" height="6" rx="0.5"
          fill="none"
          stroke="var(--black-pen)"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </svg>
    </button>
  );
}
