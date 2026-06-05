interface HKLogoProps {
  className?: string;
}

export function HKLogo({ className = '' }: HKLogoProps) {
  return (
    <span className={`hk-logo ${className}`} aria-label="Harsh Kumar">
      <span>HARSH</span>
      <span>KUMAR</span>
    </span>
  );
}
