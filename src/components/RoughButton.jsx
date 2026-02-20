import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import rough from 'roughjs';

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export default function RoughButton({
  children,
  onClick,
  className = '',
  style = {},
  roughness = 0.8,
  seed = 1,
  active = false,
  href,
  target,
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const { theme } = useTheme();
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || dims.w === 0) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const rect = rc.rectangle(2, 2, dims.w - 4, dims.h - 4, {
      roughness,
      stroke: getCssVar('--pencil'),
      strokeWidth: 1,
      seed,
      bowing: 1,
    });
    svg.appendChild(rect);
  }, [dims, roughness, seed, theme]);

  const Tag = href ? 'a' : 'button';
  const linkProps = href
    ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined }
    : {};

  const showGlow = hovered || active;

  return (
    <Tag
      ref={containerRef}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...linkProps}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 20px',
        fontFamily: "'Patrick Hand', cursive",
        fontSize: '1rem',
        color: 'var(--sharpie)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.15s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        ...style,
      }}
    >
      {/* Rough.js sketchy border — constant, no re-render on hover */}
      <svg
        ref={svgRef}
        width={dims.w}
        height={dims.h}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
      />
      {/* CSS-only circular glow on hover/active */}
      <span
        style={{
          position: 'absolute',
          inset: '2px',
          borderRadius: '50%',
          background: showGlow ? 'var(--highlighter-yellow)' : 'transparent',
          transition: 'background 0.2s ease',
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Tag>
  );
}
