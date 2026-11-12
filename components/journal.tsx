import { articles } from "@/lib/articles";
import { SectionHead } from "./section-head";

export function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-[1400px] scroll-mt-16 px-4 pb-32 sm:px-8">
      <SectionHead index="04" label="Journal & research">
        We write about what <em>we build</em>.
      </SectionHead>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <a
            key={a.slug}
            href={`/journal/${a.slug}`}
            data-article-theme={a.theme}
            className="reveal group flex flex-col overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500 hover:border-fg/25"
            style={{ "--delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.cover}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,var(--a1),transparent_55%)] mix-blend-screen" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <span className="flex items-center justify-between font-mono text-[13px] tracking-wider text-muted uppercase">
                {a.kind}
                <span aria-hidden="true" className="text-dim transition-all duration-500 group-hover:rotate-45 group-hover:text-signal">
                  ↗
                </span>
              </span>
              <h3 className="mt-5 text-3xl font-light tracking-tight transition-colors group-hover:text-signal">{a.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{a.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
      <a
        href="/tools/inside-a-llm.html"
        className="reveal group mt-6 flex items-center justify-between rounded-3xl border border-line px-7 py-6 transition-colors hover:border-fg/25"
      >
        <span>
          <span className="font-mono text-[13px] tracking-wider text-muted uppercase">Interactive</span>
          <span className="mt-1 block text-2xl font-light tracking-tight">Inside an LLM: watch a model turn tokens into text</span>
        </span>
        <span aria-hidden="true" className="text-2xl text-dim transition-all duration-500 group-hover:rotate-45 group-hover:text-signal">↗</span>
      </a>
    </section>
  );
}
