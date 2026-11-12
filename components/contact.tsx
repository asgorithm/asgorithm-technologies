import { contact } from "@/lib/content";
import { Clock } from "./clock";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px] px-4 py-32 sm:px-8 sm:py-44">
        <span className="font-mono text-[13px] tracking-wider text-muted uppercase">06 / Contact</span>
        <h2 className="reveal mt-10 text-[clamp(3rem,10vw,9rem)] leading-[0.92] font-light tracking-[-0.045em]">
          Have something
          <br />
          <em className="text-signal">worth building?</em>
        </h2>
        <a
          href={`mailto:${contact.email}`}
          className="reveal group mt-14 inline-flex items-center gap-4 border-b border-line pb-2 text-[clamp(1.4rem,3vw,2.4rem)] font-light tracking-tight transition-colors hover:border-signal"
        >
          {contact.email}
          <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
            →
          </span>
        </a>

        <div className="mt-24 grid gap-10 border-t border-line pt-10 text-base sm:grid-cols-3">
          <div>
            <span className="font-mono text-[13px] tracking-wider text-muted uppercase">Studio</span>
            <p className="mt-3 leading-relaxed">
              {contact.address[0]}
              <br />
              {contact.address[1]}
            </p>
          </div>
          <div>
            <span className="font-mono text-[13px] tracking-wider text-muted uppercase">Elsewhere</span>
            <p className="mt-3 flex flex-col gap-1">
              <a href={contact.linkedin} target="_blank" rel="noopener" className="hover:text-signal">
                LinkedIn ↗
              </a>
              <a href={contact.github} target="_blank" rel="noopener" className="hover:text-signal">
                GitHub ↗
              </a>
            </p>
          </div>
          <div>
            <span className="font-mono text-[13px] tracking-wider text-muted uppercase">Local time</span>
            <p className="mt-3">
              <Clock />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
