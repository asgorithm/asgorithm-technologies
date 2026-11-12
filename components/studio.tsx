import { team } from "@/lib/content";
import { SectionHead } from "./section-head";

export function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-[1400px] scroll-mt-16 px-4 pb-32 sm:px-8">
      <SectionHead index="05" label="Studio">
        Small by design. <em>Systems-first</em> by default.
      </SectionHead>
      <div className="grid gap-6 md:grid-cols-2">
        {team.map((p, i) => (
          <figure
            key={p.name}
            className="reveal group flex gap-6 rounded-3xl border border-line p-6 sm:p-8"
            style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-28 w-28 shrink-0 rounded-2xl object-cover grayscale transition duration-700 group-hover:grayscale-0 sm:h-36 sm:w-36"
            />
            <figcaption className="flex flex-col">
              <span className="font-mono text-[13px] tracking-wider text-muted uppercase">{p.role}</span>
              <strong className="mt-2 text-2xl font-normal tracking-tight sm:text-[1.7rem]">{p.name}</strong>
              <span className="mt-3 text-base leading-relaxed text-muted">{p.bio}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
