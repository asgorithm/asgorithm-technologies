import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Contact } from "@/components/contact";
import { PageHero } from "@/components/page-hero";
import { SectionHead } from "@/components/section-head";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: `${s.title} · Asgorithm`,
    description: s.heroSubtext,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.title, description: s.heroSubtext, images: [s.products[0]?.image] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const n = String(services.indexOf(s) + 1).padStart(2, "0");
  const next = services[(services.indexOf(s) + 1) % services.length];

  return (
    <>
      <Nav />
      <main id="main" data-article-theme={s.theme}>
        <PageHero
          back={{ href: "/#capabilities", label: "Capabilities" }}
          label={`Discipline ${n}`}
          meta={`${s.products.length} products · ${s.whatWeBuild.length} build areas`}
          title={s.title}
          subtitle={s.heroSubtext}
          image={s.products[0].image}
          caption={{ kicker: "What we build", text: s.summary }}
        >
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ "--delay": "380ms" } as React.CSSProperties}>
            <a href="#contact" className="rounded-full bg-fg px-6 py-4 text-lg font-medium text-ink transition-colors hover:bg-signal">
              Start a project
            </a>
            <a href="#products" className="rounded-full border border-line px-6 py-4 text-lg transition-colors hover:border-fg">
              See the products
            </a>
          </div>
        </PageHero>

        <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
          <SectionHead index="01" label="Overview">
            Built for <em>real</em> operating environments.
          </SectionHead>
          <div className="grid gap-10 md:grid-cols-[1fr_3fr]">
            <span />
            <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
              <p className="reveal text-2xl leading-relaxed font-light sm:text-3xl sm:leading-snug">{s.overview}</p>
              <ul className="reveal flex flex-col gap-5 text-lg leading-relaxed text-muted">
                <li><strong className="block font-medium text-fg">Custom product development</strong>For startups, businesses and enterprise teams with real operational requirements.</li>
                <li><strong className="block font-medium text-fg">White-labelled delivery</strong>Where speed to launch and internal ownership matter.</li>
                <li><strong className="block font-medium text-fg">Integration and strategy</strong>Into your existing stack, with consulting and on-demand execution.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8 sm:pb-32">
          <SectionHead index="02" label="What we build">
            Clear categories, <em>engineered</em> for scale.
          </SectionHead>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {s.whatWeBuild.map((item, i) => (
              <li key={item} className="reveal flex min-h-[150px] flex-col justify-between bg-ink p-7 sm:p-8" style={{ "--delay": `${(i % 3) * 70}ms` } as React.CSSProperties}>
                <span className="font-mono text-sm text-dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-8 text-2xl font-light tracking-tight">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="products" className="mx-auto max-w-[1400px] scroll-mt-20 px-4 pb-24 sm:px-8 sm:pb-32">
          <SectionHead index="03" label="Products">
            Surfaces we have <em>already built</em>.
          </SectionHead>
          <div className="flex flex-col gap-6">
            {s.products.map((p, i) => (
              <article key={p.title} className="reveal grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-ink-2 p-4 sm:p-6 lg:grid-cols-2 lg:gap-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className={`aspect-[16/10] w-full rounded-2xl object-cover ${i % 2 ? "lg:order-2" : ""}`}
                />
                <div className="px-2 pb-4 sm:px-4 lg:py-6">
                  <span className="font-mono text-sm tracking-wider text-muted uppercase">Product {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-none font-light tracking-[-0.035em]">{p.title}</h3>
                  <p className="mt-5 max-w-lg text-xl leading-relaxed text-muted">{p.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {p.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-lg">
                        <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-line">
          <a href={`/services/${next.slug}`} className="group mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-20 sm:px-8 sm:py-28">
            <span className="font-mono text-sm tracking-wider text-muted uppercase">Next discipline</span>
            <span className="text-[clamp(2.4rem,6vw,5.5rem)] leading-none font-light tracking-[-0.04em] transition-colors group-hover:text-signal">
              {next.title} <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-3">→</span>
            </span>
          </a>
        </section>
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
