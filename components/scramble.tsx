"use client";

import { useEffect, useState } from "react";

const GLYPHS = "01<>/{}[]#$%&*+=λΣΔ";

/** Decodes `text` from random glyphs, left to right, once on mount. */
export function Scramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let raf = 0;
    const total = text.length * 4 + 10;
    const tick = () => {
      frame++;
      const settled = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split("")
          .map((c, i) => (i < settled || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join(""),
      );
      if (frame < total) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    const id = window.setTimeout(() => (raf = requestAnimationFrame(tick)), delay);
    return () => {
      clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
