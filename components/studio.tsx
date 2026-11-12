import { team } from "@/lib/content";
import { SectionHead } from "./section-head";

export function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-[1400px] scroll-mt-20 px-4 pb-32 sm:px-8">
      <SectionHead index="05" label="Studio">
        Small by design. <em>Systems-first</em> by default.
      </SectionHead>
      <div className="grid gap-6 md:grid-cols-2">
        {team.map((p, i) => (
          <figure
            key={p.name}
            className="reveal group overflow-hidden rounded-3xl border border-line bg-ink-2"
            style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              width={1400}
              height={1120}
              className="aspect-[5/4] w-full object-cover object-[50%_30%] grayscale transition duration-700 ease-out-expo group-hover:scale-[1.02] group-hover:grayscale-0"
            />
            <figcaption className="flex flex-col p-7 sm:p-9">
              <span className="font-mono text-sm tracking-wider text-muted uppercase">{p.role}</span>
              <strong className="mt-2 text-2xl font-normal tracking-tight sm:text-[1.7rem]">{p.name}</strong>
              <span className="mt-3 text-lg leading-relaxed text-muted">{p.bio}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
