import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import rough from 'roughjs';

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function RoughBox({
  children,
  className = '',
  style = {},
  roughness = 1.5,
  strokeWidth = 1.5,
  seed = 1,
  padding = 16,
  stroke,
  tag: Tag = 'div',
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const { theme } = useTheme();
  const [dims, setDims] = useState({ w: 0, h: 0 });

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
    const node = rc.rectangle(2, 2, dims.w - 4, dims.h - 4, {
      roughness,
      stroke: stroke || getCssVar('--black-pen'),
      strokeWidth,
      seed,
    });
    svg.appendChild(node);
  }, [dims, roughness, strokeWidth, seed, stroke, theme]);

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ position: 'relative', ...style }}
    >
      <svg
        ref={svgRef}
        width={dims.w}
        height={dims.h}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, padding }}>{children}</div>
    </Tag>
  );
}

export function RoughLine({ width = '100%', roughness = 1.2, seed = 10, strokeWidth = 1, stroke }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || w === 0) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const line = rc.line(0, 4, w, 4, {
      roughness,
      stroke: stroke || getCssVar('--pencil'),
      strokeWidth,
      seed,
    });
    svg.appendChild(line);
  }, [w, roughness, strokeWidth, seed, stroke, theme]);

  return (
    <div ref={containerRef} style={{ width, height: 8, flexShrink: 0 }}>
      <svg ref={svgRef} width={w} height={8} style={{ overflow: 'visible' }} />
    </div>
  );
}

export function RoughCircle({
  size = 40,
  roughness = 1.8,
  seed = 5,
  stroke,
  strokeWidth = 1.5,
  fill,
  children,
  className = '',
  style = {},
}) {
  const svgRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc = rough.svg(svg);
    const node = rc.circle(size / 2, size / 2, size - 4, {
      roughness,
      stroke: stroke || getCssVar('--black-pen'),
      strokeWidth,
      seed,
      fill: fill || undefined,
      fillStyle: fill ? 'solid' : undefined,
    });
    svg.appendChild(node);
  }, [size, roughness, seed, stroke, strokeWidth, fill, theme]);

  return (
    <div className={className} style={{ position: 'relative', width: size, height: size, ...style }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
      />
      {children && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
