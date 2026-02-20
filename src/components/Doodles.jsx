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
