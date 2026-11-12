import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle, readingTime, renderArticle } from "@/lib/articles";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ArticleHeader } from "@/components/article-header";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: `${a.title} · Asgorithm`,
    description: a.subtitle,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { title: a.title, description: a.subtitle, images: [a.cover], type: "article" },
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();

  const html = renderArticle(a);
  const idx = articles.indexOf(a);
  const next = articles[(idx + 1) % articles.length];

  return (
    <>
      <Nav />
      <main id="main" data-article-theme={a.theme}>
        <ArticleHeader article={a} minutes={readingTime(html)} />
        <article
          className="article-body mx-auto max-w-[760px] px-4 pb-24 sm:px-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <section className="border-t border-line">
          <a
            href={`/journal/${next.slug}`}
            className="group mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-20 sm:px-8 sm:py-28"
          >
            <span className="font-mono text-[13px] tracking-wider text-muted uppercase">Next · {next.label}</span>
            <span className="text-[clamp(2.4rem,6vw,5.5rem)] leading-none font-light tracking-[-0.04em] transition-colors group-hover:text-signal">
              {next.title} <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-3">→</span>
            </span>
          </a>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
