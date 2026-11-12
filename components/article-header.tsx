import type { ArticleMeta } from "@/lib/articles";
import { PageHero } from "./page-hero";

export function ArticleHeader({ article: a, minutes }: { article: ArticleMeta; minutes: number }) {
  return (
    <PageHero
      back={{ href: "/#journal", label: "Journal" }}
      label={a.label}
      meta={`${a.kind} · ${minutes} min read`}
      title={a.title}
      subtitle={a.subtitle}
      image={a.cover}
      caption={{ kicker: a.kind, text: a.excerpt }}
    />
  );
}
