export function SectionHead({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-16 grid gap-6 border-t border-line pt-8 sm:mb-24 md:grid-cols-[1fr_3fr]">
      <span className="font-mono text-[13px] tracking-wider text-muted uppercase">
        {index} / {label}
      </span>
      <h2 className="reveal text-[clamp(2.2rem,5.5vw,4.75rem)] leading-[1] font-light tracking-[-0.035em]">
        {children}
      </h2>
    </div>
  );
}
