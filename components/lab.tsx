import { SectionHead } from "./section-head";

const TOKENS = [
  { t: "We", id: 1135 },
  { t: " engineer", id: 22543 },
  { t: " systems", id: 3341 },
  { t: " that", id: 326 },
];

const NEXT = [
  { t: "think", p: 0.62 },
  { t: "scale", p: 0.17 },
  { t: "learn", p: 0.11 },
  { t: "work", p: 0.06 },
];

/** Homepage feature for the in-browser LLM tool. The preview is illustrative. */
export function Lab() {
  return (
    <section id="lab" className="mx-auto max-w-[1400px] scroll-mt-20 px-4 pb-32 sm:px-8">
      <SectionHead index="04" label="Lab">
        Watch a model <em>think</em>, live in your browser.
      </SectionHead>

      <a
        href="/tools/inside-a-llm.html"
        data-spotlight
        className="lab-card reveal group relative grid overflow-hidden rounded-[32px] p-px lg:grid-cols-[1fr_1.1fr]"
      >
        <div className="spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex flex-col rounded-t-[31px] bg-ink-2 p-8 sm:p-12 lg:rounded-l-[31px] lg:rounded-tr-none">
          <span className="flex items-center gap-3 font-mono text-sm tracking-wider text-signal uppercase">
            <span className="h-2 w-2 rounded-full bg-signal animate-pulse-dot" />
            Interactive · Inside an LLM
          </span>
          <h3 className="mt-8 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1] font-light tracking-[-0.04em]">
            A real language model, running on <em className="text-signal">your</em> machine.
          </h3>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-muted">
            Load a model in the browser, then see how it splits your words into tokens, maps them into vectors and
            chooses what comes next. Nothing is sent to a server.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {["No server", "No API key", "WebGPU", "Real probabilities"].map((f) => (
              <li key={f} className="rounded-full border border-line px-4 py-2 font-mono text-sm text-fg/85">
                {f}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex w-fit items-center gap-3 self-start rounded-full bg-signal px-7 py-4 pt-4 text-lg font-medium text-ink transition-transform duration-500 ease-out-expo group-hover:translate-x-1 max-lg:mt-10 lg:mt-12">
            Open the lab <span aria-hidden="true">→</span>
          </span>
        </div>

        <div aria-hidden="true" className="relative flex flex-col justify-center gap-8 rounded-b-[31px] bg-ink p-8 sm:p-12 lg:rounded-r-[31px] lg:rounded-bl-none">
          <div>
            <span className="font-mono text-sm tracking-wider text-muted uppercase">01 · Tokens</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {TOKENS.map((tok, i) => (
                <span
                  key={tok.id}
                  className="lab-token flex flex-col rounded-xl border border-line bg-ink-2 px-3.5 py-2.5"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="text-xl whitespace-pre">{tok.t}</span>
                  <span className="mt-1 font-mono text-xs text-muted">#{tok.id}</span>
                </span>
              ))}
              <span className="lab-caret self-center text-3xl font-light text-signal">▍</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-sm tracking-wider text-muted uppercase">02 · Next token</span>
            <div className="mt-4 flex flex-col gap-3">
              {NEXT.map((n, i) => (
                <div key={n.t} className="grid grid-cols-[88px_1fr_56px] items-center gap-4">
                  <span className={`text-xl ${i === 0 ? "text-signal" : "text-fg/80"}`}>{n.t}</span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-fg/10">
                    <span
                      className={`lab-bar block h-full rounded-full ${i === 0 ? "bg-signal" : "bg-fg/45"}`}
                      style={{ "--w": `${n.p * 100}%`, "--i": i } as React.CSSProperties}
                    />
                  </span>
                  <span className="text-right font-mono text-sm text-muted tabular-nums">{n.p.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
