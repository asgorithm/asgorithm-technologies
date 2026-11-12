import { readFileSync } from "node:fs";
import path from "node:path";
import { Marked } from "marked";

export type ArticleKind = "Case study" | "Essay";
export type ArticleTheme = "orange" | "blue" | "purple";

export type ArticleMeta = {
  slug: string;
  kind: ArticleKind;
  label: string;
  title: string;
  subtitle: string;
  excerpt: string;
  cover: string;
  theme: ArticleTheme;
  source: string;
  /** Pre-migration URL, 301-redirected by nginx. */
  legacyPath: string;
};

export const articles: ArticleMeta[] = [
  {
    slug: "ai-in-hospitality",
    kind: "Case study",
    label: "Case study 01",
    title: "AI in Hospitality",
    subtitle: "Service automation, guest support systems, and intelligent travel operations.",
    excerpt:
      "Building contextual chatbots for one of Asia's largest hotel chains during the pandemic, and what it taught us about AI.",
    cover: "/public/case-studies/hospitality/1.png",
    theme: "orange",
    source: "case-studies/ai-in-hospitality.md",
    legacyPath: "/ai-in-hospitality-case-study.html",
  },
  {
    slug: "ai-in-insurance",
    kind: "Case study",
    label: "Case study 02",
    title: "AI in Insurance",
    subtitle: "Operational intelligence for underwriting, claims, and decision support.",
    excerpt: "When the math runs out: how AI is reshaping insurance pricing, underwriting and claims.",
    cover: "/public/case-studies/insurance/1.png",
    theme: "blue",
    source: "case-studies/insurance.md",
    legacyPath: "/insurance-case-study.html",
  },
  {
    slug: "ai-in-sports",
    kind: "Case study",
    label: "Case study 03",
    title: "AI in Sports",
    subtitle: "Performance intelligence, scouting systems, and markets around human performance.",
    excerpt: "Turning fragmented grassroots sport into a measurable economy that surfaces talent.",
    cover: "/public/case-studies/sports/1.png",
    theme: "purple",
    source: "case-studies/ai-in-sports.md",
    legacyPath: "/ai-in-sports-case-study.html",
  },
  {
    slug: "content-systems-and-ai",
    kind: "Essay",
    label: "Essay 01",
    title: "Content Systems and AI",
    subtitle: "How publishing layers become programmable across research, media, and founder communication.",
    excerpt: "Publishing is becoming programmable, and content is becoming infrastructure.",
    cover: "/public/blogs/blog-1/hero.png",
    theme: "purple",
    source: "blogs/blog1.md",
    legacyPath: "/content-systems-and-ai.html",
  },
  {
    slug: "vibe-coding-pros-and-cons",
    kind: "Essay",
    label: "Essay 02",
    title: "Vibe Coding: Pros and Cons",
    subtitle: "Velocity versus architecture quality in the new generation of AI-assisted software making.",
    excerpt: "The tradeoff between velocity and architecture in AI-assisted software.",
    cover: "/public/blogs/blog-2/hero.png",
    theme: "orange",
    source: "blogs/blog2.md",
    legacyPath: "/vibe-coding-pros-and-cons.html",
  },
  {
    slug: "neuromorphic-spike-llms",
    kind: "Essay",
    label: "Essay 03",
    title: "Neuromorphic Spike LLMs",
    subtitle: "Speculative compute directions for energy-aware intelligence and next-generation model systems.",
    excerpt: "Sparse, event-driven architectures and the long road to energy-aware AI.",
    cover: "/public/blogs/blog-3/hero.png",
    theme: "blue",
    source: "blogs/blog3.md",
    legacyPath: "/neuromorphic-spike-llms.html",
  },
];

export function getArticle(slug: string): ArticleMeta | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Markdown image paths are written site-absolute (/case-studies/…); the files live under /public/. */
function assetPath(src: string): string {
  return src.startsWith("/") && !src.startsWith("/public/") ? `/public${src}` : src;
}

const marked = new Marked({
  gfm: true,
  renderer: {
    image({ href, text }) {
      return `<figure><img src="${assetPath(href)}" alt="${text}" loading="lazy" /><figcaption>${text}</figcaption></figure>`;
    },
    paragraph({ tokens }) {
      // A paragraph that is only an image becomes a bare <figure>, not <p><figure>.
      const html = this.parser.parseInline(tokens);
      return html.startsWith("<figure>") ? html : `<p>${html}</p>\n`;
    },
  },
});

/**
 * Renders an article body at build time. The leading `# Title`, hero image and
 * (for essays) `## subtitle` are dropped: the page header renders those.
 */
export function renderArticle(meta: ArticleMeta): string {
  const raw = readFileSync(path.join(process.cwd(), "content", meta.source), "utf8");
  const lines = raw.split("\n");
  let i = 0;
  const skipBlank = () => {
    while (i < lines.length && lines[i].trim() === "") i++;
  };
  skipBlank();
  if (lines[i]?.startsWith("# ")) i++;
  skipBlank();
  if (/^!\[[^\]]*\]\([^)]+\)\s*$/.test(lines[i] ?? "")) i++;
  skipBlank();
  if (meta.kind === "Essay" && lines[i]?.startsWith("## ")) i++;
  return marked.parse(lines.slice(i).join("\n")) as string;
}

export function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
