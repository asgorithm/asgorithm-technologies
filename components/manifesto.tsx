"use client";

import { useEffect, useRef } from "react";

const TEXT =
  "Most software is assembled. Ours is engineered: designed around the decisions it has to make, the scale it has to hold, and the people who rely on it. We take on few projects, and we take each one all the way to production.";

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => (w.style.opacity = "1"));
      return;
    }
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = progress * words.length;
      words.forEach((w, i) => (w.style.opacity = String(Math.min(1, Math.max(0.14, lit - i + 0.14)))));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section aria-label="What we believe" className="mx-auto max-w-[1400px] px-4 py-32 sm:px-8 sm:py-48">
      <p
        ref={ref}
        className="max-w-5xl text-[clamp(1.75rem,4.2vw,3.6rem)] leading-[1.12] font-light tracking-[-0.025em]"
      >
        {TEXT.split(" ").map((w, i) => (
          <span key={i} data-w className="transition-opacity duration-300" style={{ opacity: 0.14 }}>
            {w === "engineered:" ? <em className="text-signal">{w}</em> : w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
