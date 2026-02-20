export function DoodleStar({ size = 24, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ ...style }}
      aria-hidden="true"
    >
      <path
        d="M12 2 L14.5 8.5 L21 9.5 L16 14 L17.5 21 L12 17.5 L6.5 21 L8 14 L3 9.5 L9.5 8.5 Z"
        stroke="var(--pencil)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="var(--highlighter-yellow)"
      />
    </svg>
  );
}

export function DoodleArrow({ size = 24, direction = 'right', className = '', style = {} }) {
  const rotations = { right: 0, down: 90, left: 180, up: 270 };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotations[direction]}deg)`, ...style }}
      aria-hidden="true"
    >
      <path
        d="M4 12 C8 12.5 12 11.5 18 12 M14 7 C16 9 18 11 18 12 C18 13 16 15 14 17"
        stroke="var(--pencil)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleLightbulb({ size = 28, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M14 3 C8.5 3 5 7 5 11.5 C5 15 7 16.5 8.5 18.5 C9 19.5 9 20.5 9 21 L19 21 C19 20.5 19 19.5 19.5 18.5 C21 16.5 23 15 23 11.5 C23 7 19.5 3 14 3Z"
        stroke="var(--pencil)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="var(--highlighter-yellow)"
      />
      <path d="M10 24 L18 24" stroke="var(--pencil)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 21 L11 18" stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <path d="M17 21 L17 18" stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function DoodleUnderline({ width = 120, className = '', style = {} }) {
  return (
    <svg
      width={width}
      height={8}
      viewBox="0 0 120 8"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M2 5 C20 3 40 6 60 4 C80 2 100 5 118 3"
        stroke="var(--red-pen)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodlePaperclip({ size = 32, className = '', style = {} }) {
  return (
    <svg
      width={size * 0.6}
      height={size}
      viewBox="0 0 18 32"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M4 28 L4 8 C4 4 6 2 9 2 C12 2 14 4 14 8 L14 22 C14 24.5 12.5 26 10 26 C7.5 26 6 24.5 6 22 L6 10"
        stroke="var(--pencil)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function DoodleSpiral({ size = 24, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 12 C12 10 14 8 16 10 C18 12 16 16 12 16 C8 16 6 12 6 10 C6 6 10 4 14 4 C18 4 22 8 22 12 C22 18 16 22 12 22"
        stroke="var(--pencil)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function DoodleBinaryTree({ size = 64, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Edges */}
      <path d="M32 14 L18 30" stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" />
      <path d="M32 14 L46 30" stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 30 L10 46" stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 30 L26 46" stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" />
      <path d="M46 30 L54 46" stroke="var(--pencil)" strokeWidth="1" strokeLinecap="round" />
      {/* Nodes */}
      <circle cx="32" cy="12" r="5" stroke="var(--pencil)" strokeWidth="1.2" fill="var(--highlighter-blue)" />
      <circle cx="18" cy="30" r="4.5" stroke="var(--pencil)" strokeWidth="1.2" fill="var(--highlighter-green)" />
      <circle cx="46" cy="30" r="4.5" stroke="var(--pencil)" strokeWidth="1.2" fill="var(--highlighter-yellow)" />
      <circle cx="10" cy="46" r="4" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-pink)" />
      <circle cx="26" cy="46" r="4" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-blue)" />
      <circle cx="54" cy="46" r="4" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-green)" />
      {/* Node labels */}
      <text x="32" y="15" textAnchor="middle" fontSize="5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">7</text>
      <text x="18" y="33" textAnchor="middle" fontSize="5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">3</text>
      <text x="46" y="33" textAnchor="middle" fontSize="5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">12</text>
      <text x="10" y="49" textAnchor="middle" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">1</text>
      <text x="26" y="49" textAnchor="middle" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">5</text>
      <text x="54" y="49" textAnchor="middle" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">15</text>
    </svg>
  );
}

export function DoodleStack({ size = 56, className = '', style = {} }) {
  return (
    <svg
      width={size * 0.6}
      height={size}
      viewBox="0 0 36 56"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Stack frames */}
      <rect x="4" y="4" width="28" height="10" rx="1.5" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-green)" />
      <rect x="4" y="16" width="28" height="10" rx="1.5" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-blue)" />
      <rect x="4" y="28" width="28" height="10" rx="1.5" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-yellow)" />
      <rect x="4" y="40" width="28" height="10" rx="1.5" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-pink)" />
      {/* Labels */}
      <text x="18" y="12" textAnchor="middle" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">pop()</text>
      <text x="18" y="24" textAnchor="middle" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">0x3F</text>
      <text x="18" y="36" textAnchor="middle" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">main</text>
      <text x="18" y="48" textAnchor="middle" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">init</text>
      {/* Arrow */}
      <path d="M34 9 L38 9" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" markerEnd="none" />
    </svg>
  );
}

export function DoodleCodeSnippet({ width = 100, className = '', style = {} }) {
  return (
    <svg
      width={width}
      height={width * 0.65}
      viewBox="0 0 100 65"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <text fontFamily="'JetBrains Mono', monospace" fontSize="5.5">
        <tspan x="2" y="8" fill="var(--blue-pen)" opacity="0.7">#include</tspan>
        <tspan x="2" y="17" fill="var(--pencil)" opacity="0.6">template&lt;class T&gt;</tspan>
        <tspan x="2" y="26" fill="var(--pencil)" opacity="0.55">T merge(T a, T b) {'{'}</tspan>
        <tspan x="8" y="35" fill="var(--pencil)" opacity="0.5">if (a.empty())</tspan>
        <tspan x="12" y="44" fill="var(--pencil)" opacity="0.45">return b;</tspan>
        <tspan x="8" y="53" fill="var(--pencil)" opacity="0.4">swap(a, b);</tspan>
        <tspan x="2" y="62" fill="var(--pencil)" opacity="0.35">{'}'}</tspan>
      </text>
    </svg>
  );
}

export function DoodleFlowchart({ size = 72, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 72 80"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Start oval */}
      <ellipse cx="36" cy="8" rx="16" ry="6" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-green)" />
      <text x="36" y="10.5" textAnchor="middle" fontSize="5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">n &gt; 0?</text>
      {/* Arrow down */}
      <path d="M36 14 L36 24" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" />
      {/* Diamond (decision) */}
      <path d="M36 24 L52 36 L36 48 L20 36 Z" stroke="var(--pencil)" strokeWidth="1" strokeLinejoin="round" fill="var(--highlighter-yellow)" />
      <text x="36" y="38.5" textAnchor="middle" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">left?</text>
      {/* Yes branch */}
      <path d="M20 36 L8 36 L8 58" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" />
      <text x="13" y="33" fontSize="4" fontFamily="'Caveat', cursive" fill="var(--blue-pen)">Y</text>
      <rect x="1" y="58" width="14" height="10" rx="1.5" stroke="var(--pencil)" strokeWidth="0.8" fill="var(--highlighter-blue)" />
      <text x="8" y="65" textAnchor="middle" fontSize="4" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">rec(l)</text>
      {/* No branch */}
      <path d="M52 36 L64 36 L64 58" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" />
      <text x="59" y="33" fontSize="4" fontFamily="'Caveat', cursive" fill="var(--red-pen)">N</text>
      <rect x="57" y="58" width="14" height="10" rx="1.5" stroke="var(--pencil)" strokeWidth="0.8" fill="var(--highlighter-pink)" />
      <text x="64" y="65" textAnchor="middle" fontSize="4" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">rec(r)</text>
      {/* Merge arrows */}
      <path d="M8 68 L8 75 L36 75 L64 75 L64 68" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

export function DoodleLinkedList({ width = 110, className = '', style = {} }) {
  return (
    <svg
      width={width}
      height={width * 0.3}
      viewBox="0 0 110 33"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Node 1 */}
      <rect x="2" y="8" width="20" height="14" rx="2" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-blue)" />
      <text x="12" y="18" textAnchor="middle" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">H</text>
      {/* Arrow 1 */}
      <path d="M22 15 L32 15" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M30 12 L33 15 L30 18" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      {/* Node 2 */}
      <rect x="34" y="8" width="20" height="14" rx="2" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-green)" />
      <text x="44" y="18" textAnchor="middle" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">4</text>
      {/* Arrow 2 */}
      <path d="M54 15 L64 15" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M62 12 L65 15 L62 18" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      {/* Node 3 */}
      <rect x="66" y="8" width="20" height="14" rx="2" stroke="var(--pencil)" strokeWidth="1" fill="var(--highlighter-yellow)" />
      <text x="76" y="18" textAnchor="middle" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" fill="var(--black-pen)">2</text>
      {/* Arrow 3 */}
      <path d="M86 15 L96 15" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M94 12 L97 15 L94 18" stroke="var(--pencil)" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      {/* Null */}
      <text x="102" y="18" textAnchor="middle" fontSize="5" fontFamily="'JetBrains Mono', monospace" fill="var(--red-pen)" opacity="0.7">nil</text>
      {/* "head" label */}
      <text x="12" y="6" textAnchor="middle" fontSize="4" fontFamily="'Caveat', cursive" fill="var(--pencil)">head</text>
    </svg>
  );
}
