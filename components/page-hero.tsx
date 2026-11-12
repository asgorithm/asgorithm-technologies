/**
 * Shared header for inner pages (articles, services): tinted glow, label chip,
 * large title, and the hero image in a glass frame with a caption badge.
 * The tint comes from data-article-theme on an ancestor.
 */
export type PageHeroProps = {
  back: { href: string; label: string };
  label: string;
  meta: string;
  title: string;
  subtitle: string;
  image: string;
  caption: { kicker: string; text: string };
  children?: React.ReactNode;
};

export function PageHero({ back, label, meta, title, subtitle, image, caption, children }: PageHeroProps) {
  return (
    <header className="article-hero relative overflow-hidden">
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-4 pt-36 pb-20 sm:px-8 sm:pt-44 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pb-28">
        <div>
          <a href={back.href} className="rise mb-10 inline-block font-mono text-sm tracking-wider text-muted uppercase hover:text-fg">
            ← {back.label}
          </a>
          <div className="rise mb-6 flex flex-wrap items-center gap-3" style={{ "--delay": "80ms" } as React.CSSProperties}>
            <strong className="inline-flex h-10 items-center rounded-full bg-fg/[0.08] px-4 text-sm font-medium tracking-[0.14em] uppercase">
              {label}
            </strong>
            <span className="font-mono text-sm tracking-wider text-muted uppercase">{meta}</span>
          </div>
          <h1
            className="rise text-[clamp(3.2rem,6.4vw,6.6rem)] leading-[0.95] font-normal tracking-[-0.045em] [text-wrap:balance]"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            {title}
          </h1>
          <p className="rise mt-6 max-w-xl text-xl leading-relaxed text-muted sm:text-2xl" style={{ "--delay": "260ms" } as React.CSSProperties}>
            {subtitle}
          </p>
          {children}
        </div>

        <figure
          className="rise article-media relative rounded-[34px] border border-fg/10 p-3 sm:p-4"
          style={{ "--delay": "300ms" } as React.CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="" className="h-[min(36rem,62vw)] min-h-[18rem] w-full rounded-[26px] object-cover" />
          <figcaption className="absolute right-7 bottom-7 max-w-[18rem] rounded-[20px] border border-white/10 bg-[#0a0c12]/65 p-4 text-white backdrop-blur-xl sm:right-9 sm:bottom-9">
            <span className="block font-mono text-sm tracking-[0.14em] text-white/70 uppercase">{caption.kicker}</span>
            <span className="mt-2 block text-lg leading-snug">{caption.text}</span>
          </figcaption>
        </figure>
      </div>
    </header>
  );
}
