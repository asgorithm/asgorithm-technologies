/** Abstract, CSS-only visuals for the project cards. Decorative. */

const home = [
  [12, 50],
  [28, 26],
  [28, 74],
  [42, 40],
  [42, 62],
];
const away = home.map(([x, y]) => [100 - x, 100 - y]);

export function PitchVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-8 sm:p-14">
      <div className="relative aspect-[3/2] w-full max-w-xl rounded-xl border border-fg/15 [perspective:900px]">
        <div className="absolute inset-0 rounded-xl border border-fg/15 [transform:rotateX(38deg)] bg-[repeating-linear-gradient(90deg,color-mix(in_srgb,var(--color-fg)_4%,transparent)_0_10%,transparent_10%_20%)]">
          <div className="absolute inset-y-0 left-1/2 w-px bg-fg/15" />
          <div className="absolute top-1/2 left-1/2 h-[28%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/15" />
          <div className="absolute top-1/2 left-0 h-[40%] w-[12%] -translate-y-1/2 border border-l-0 border-fg/15" />
          <div className="absolute top-1/2 right-0 h-[40%] w-[12%] -translate-y-1/2 border border-r-0 border-fg/15" />
          {home.map(([x, y], i) => (
            <span
              key={`h${i}`}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_16px_color-mix(in_srgb,var(--color-signal)_70%,transparent)] animate-drift"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * -1.1}s`, "--dx": "14px", "--dy": "-8px" } as React.CSSProperties}
            />
          ))}
          {away.map(([x, y], i) => (
            <span
              key={`a${i}`}
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/70 animate-drift"
              style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * -0.9}s`, "--dx": "-12px", "--dy": "9px" } as React.CSSProperties}
            />
          ))}
          <span
            className="absolute h-1.5 w-1.5 rounded-full bg-fg animate-drift"
            style={{ left: "54%", top: "46%", "--dx": "-40px", "--dy": "18px" } as React.CSSProperties}
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-6 font-mono text-[13px] tracking-widest text-muted uppercase">
        <span>1v1 Face-off</span>
        <span className="text-signal">Split 70 / 30</span>
        <span>Auto-settled</span>
      </div>
    </div>
  );
}

const verdicts = [
  { label: "Safe", w: "86%", c: "bg-signal" },
  { label: "Target", w: "64%", c: "bg-azure" },
  { label: "Reach", w: "38%", c: "bg-fg/60" },
  { label: "Unlikely", w: "14%", c: "bg-fg/20" },
];

export function CompassVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-8 sm:p-14">
      <div className="relative aspect-square w-[min(78%,360px)]">
        <div className="absolute inset-0 rounded-full border border-fg/15 animate-spin-slow bg-[repeating-conic-gradient(color-mix(in_srgb,var(--color-fg)_22%,transparent)_0_0.4deg,transparent_0.4deg_6deg)] [mask:radial-gradient(circle,transparent_88%,#000_88.5%)]" />
        <div className="absolute inset-[14%] rounded-full border border-fg/10" />
        <div className="absolute inset-[32%] rounded-full border border-azure/30 bg-azure/[0.03]" />
        <div className="absolute top-1/2 left-1/2 h-[72%] w-[3px] animate-needle">
          <div className="h-1/2 w-full rounded-t-full bg-gradient-to-t from-signal/40 to-signal shadow-[0_0_20px_color-mix(in_srgb,var(--color-signal)_60%,transparent)]" />
          <div className="h-1/2 w-full rounded-b-full bg-fg/25" />
        </div>
        <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg bg-ink" />
        {[
          ["N", "top-[3%] left-1/2 -translate-x-1/2"],
          ["E", "right-[3%] top-1/2 -translate-y-1/2"],
          ["S", "bottom-[3%] left-1/2 -translate-x-1/2"],
          ["W", "left-[3%] top-1/2 -translate-y-1/2"],
        ].map(([l, pos]) => (
          <span key={l} className={`absolute font-mono text-[13px] text-muted ${pos}`}>
            {l}
          </span>
        ))}
      </div>
      <div className="absolute right-6 bottom-6 left-6 grid grid-cols-4 gap-3 sm:right-10 sm:left-10">
        {verdicts.map((v) => (
          <div key={v.label}>
            <div className="h-1 w-full overflow-hidden rounded-full bg-fg/10">
              <div className={`h-full ${v.c}`} style={{ width: v.w }} />
            </div>
            <span className="mt-2 block font-mono text-[13px] tracking-widest text-muted uppercase">{v.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
