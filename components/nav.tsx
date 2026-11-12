"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#journal", label: "Journal" },
  { href: "/#studio", label: "Studio" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent bg-gradient-to-b from-ink/90 via-ink/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <a href="/" className="flex items-center gap-3.5" aria-label="Asgorithm home">
          {/* Shield cropped from the original logo; the wordmark is live text so it stays legible. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/public/mark.png" alt="" width={98} height={114} className="logo h-12 w-auto sm:h-14" />
          <span className="text-xl font-semibold tracking-[0.22em] text-fg uppercase sm:text-2xl">Asgorithm</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[17px] text-fg/80 transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href="/#contact"
          className="group rounded-full border border-line px-4 py-2 text-base text-fg transition-colors hover:border-signal hover:bg-signal hover:text-ink"
        >
          <span className="sm:hidden">Contact</span>
          <span className="hidden sm:inline">Start a project</span>{" "}
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
        </div>
      </div>
    </header>
  );
}
