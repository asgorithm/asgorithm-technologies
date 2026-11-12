import { steps } from "@/lib/content";
import { SectionHead } from "./section-head";

export function Method() {
  return (
    <section aria-label="How we work" className="mx-auto max-w-[1400px] px-4 pb-32 sm:px-8">
      <SectionHead index="03" label="Method">
        From first principle <em>to production</em>.
      </SectionHead>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="reveal group bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 sm:p-10"
            style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <span className="font-serif text-2xl text-dim italic transition-colors group-hover:text-signal">{s.n}</span>
            <h3 className="mt-16 text-3xl font-light tracking-tight">{s.title}</h3>
            <p className="mt-3 text-lg leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
