import { FlowField } from "./flow-field";
import { Scramble } from "./scramble";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <FlowField />
      {/* Vignette keeps type legible over the field. */}
      <div className="hero-vignette pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 pb-28 sm:px-8 sm:pb-32">
        <p className="rise mb-8 flex items-center gap-3 font-mono text-[13px] tracking-wider text-muted uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />
          Engineering studio · Coimbatore, India
        </p>
        <h1 className="text-[clamp(3.2rem,11vw,10.5rem)] leading-[0.9] font-light tracking-[-0.045em]">
          <span className="rise block">We engineer</span>
          <span className="rise block" style={{ "--delay": "150ms" } as React.CSSProperties}>
            <em className="text-signal">systems</em> that <Scramble text="think." delay={900} />
          </span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p
            className="rise max-w-lg text-xl leading-relaxed text-muted"
            style={{ "--delay": "450ms" } as React.CSSProperties}
          >
            AI, blockchain and high-performance software, built with the care of a product and the rigour
            of infrastructure.
          </p>
          <div className="rise flex gap-3" style={{ "--delay": "600ms" } as React.CSSProperties}>
            <a
              href="#contact"
              className="rounded-full bg-fg px-6 py-4 text-base font-medium text-ink transition-colors hover:bg-signal"
            >
              Start a project
            </a>
            <a
              href="#work"
              className="rounded-full border border-line px-6 py-4 text-base text-fg transition-colors hover:border-fg"
            >
              See our work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 mx-auto flex max-w-[1400px] items-center justify-between px-4 font-mono text-[13px] tracking-wider text-dim uppercase sm:px-8">
        <span className="flex items-center gap-3">
          Scroll <span className="block h-6 w-px bg-muted animate-scroll-line" />
        </span>
        <span className="hidden sm:block">11.0536° N · 76.9990° E</span>
      </div>
    </section>
  );
}
