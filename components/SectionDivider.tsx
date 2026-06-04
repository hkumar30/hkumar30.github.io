type SectionDividerProps = {
  label?: string;
};

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="section-divider">
      <hr />
      {label ? <span className="section-divider-label section-label">{label}</span> : null}
    </div>
  );
}
