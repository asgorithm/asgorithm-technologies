import { projects, type Project } from "@/lib/content";
import { SectionHead } from "./section-head";
import { CompassVisual, PitchVisual } from "./project-visuals";

function ProjectCard({ p }: { p: Project }) {
  return (
    <article
      data-spotlight
      className="reveal group relative grid overflow-hidden rounded-3xl border border-line bg-ink-2 lg:grid-cols-2"
    >
      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-col p-7 sm:p-12">
        <div className="mb-14 flex items-center justify-between font-mono text-sm tracking-wider text-muted uppercase">
          <span>{p.tag}</span>
          {p.status.href ? (
            <a
              href={p.status.href}
              target="_blank"
              rel="noopener"
              className="normal-case tracking-normal text-fg underline-offset-4 hover:text-signal hover:underline"
            >
              {p.status.label}
            </a>
          ) : (
            <span className="flex items-center gap-2">
              {p.status.live && <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse-dot" />}
              {p.status.label}
            </span>
          )}
        </div>
        <h3 className="text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-light tracking-[-0.045em]">{p.name}</h3>
        <p className="mt-6 max-w-lg text-2xl leading-snug text-fg">{p.lede}</p>
        <p className="mt-4 max-w-lg text-xl leading-relaxed text-muted">{p.copy}</p>
        <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-line pt-8 mt-12">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-3xl font-light tracking-tight sm:text-4xl">{f.value}</dd>
              <dd className="mt-1 text-base leading-snug text-muted">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative min-h-[320px] border-t border-line lg:border-t-0 lg:border-l">
        {p.visual === "pitch" ? <PitchVisual /> : <CompassVisual />}
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] scroll-mt-20 px-4 pb-32 sm:px-8">
      <SectionHead index="01" label="Selected work">
        Products we <em>build</em> and run.
      </SectionHead>
      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </div>
      <div className="reveal mt-16 grid gap-6 md:grid-cols-[1fr_3fr]">
        <span className="font-mono text-sm tracking-wider text-muted uppercase">Also shipped</span>
        <p className="max-w-3xl text-2xl leading-relaxed text-muted">
          <span className="text-fg">Contextual AI concierges</span> for one of Asia&apos;s largest hospitality
          chains, across WhatsApp, booking engines and payment rails. Plus insurance and sports-analytics systems.{" "}
          <a href="#journal" className="text-fg underline decoration-line underline-offset-4 hover:decoration-signal">
            Read the case studies →
          </a>
        </p>
      </div>
    </section>
  );
}
