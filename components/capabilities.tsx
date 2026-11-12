import { capabilities } from "@/lib/content";
import { SectionHead } from "./section-head";

const STACK = ["Go", "Rust", "TypeScript", "Python", "LLM agents", "RAG", "Solidity", "Arbitrum", "Kubernetes", "Postgres", "Next.js", "Realtime"];

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 pb-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionHead index="02" label="Capabilities">
          Four disciplines. <em>One</em> standard.
        </SectionHead>
        <ol className="border-b border-line">
          {capabilities.map((c, i) => (
            <li key={c.name} className="reveal border-t border-line" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}>
              <a
                href={c.href}
                className="group grid items-baseline gap-3 py-8 transition-colors sm:grid-cols-[80px_1.1fr_1.4fr_40px] sm:gap-8 sm:py-10"
              >
                <span className="font-mono text-sm text-dim">0{i + 1}</span>
                <span className="text-[clamp(1.9rem,4vw,3.4rem)] leading-none font-light tracking-[-0.035em] transition-transform duration-500 ease-out-expo group-hover:translate-x-3 group-hover:text-signal">
                  {c.name}
                </span>
                <span className="max-w-md text-xl leading-relaxed text-muted transition-colors group-hover:text-fg">{c.desc}</span>
                <span
                  aria-hidden="true"
                  className="hidden text-2xl text-dim transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-signal sm:block"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative mt-24 overflow-hidden border-y border-line py-6 [mask:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 font-mono text-lg tracking-widest text-muted uppercase">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={i} className="flex items-center gap-12">
              {s}
              <span className="text-signal" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
