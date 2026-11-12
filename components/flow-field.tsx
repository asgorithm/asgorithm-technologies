"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a few thousand particles following a slowly evolving
 * vector field, leaving faint trails. The cursor bends the field into a vortex.
 */
export function FlowField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    type P = { x: number; y: number; px: number; py: number; life: number; hue: 0 | 1 | 2 };
    let ps: P[] = [];

    // Colours come from the theme tokens so the field follows dark/light.
    const rgb = (name: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      const m = v.match(/^#([0-9a-f]{6})$/i);
      if (!m) return "128,128,128";
      const n = parseInt(m[1], 16);
      return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
    };
    let bg = "";
    let fade = "";
    let colors: string[] = [];
    const readPalette = () => {
      const light = document.documentElement.dataset.theme === "light";
      bg = `rgb(${rgb("--color-ink")})`;
      fade = `rgba(${rgb("--color-ink")},${light ? 0.06 : 0.045})`;
      colors = [
        `rgba(${rgb("--color-fg")},${light ? 0.22 : 0.32})`,
        `rgba(${rgb("--color-signal")},${light ? 0.6 : 0.75})`,
        `rgba(${rgb("--color-azure")},${light ? 0.55 : 0.65})`,
      ];
    };
    readPalette();

    const spawn = (p?: P): P => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random();
      const hue: P["hue"] = r < 0.04 ? 1 : r < 0.07 ? 2 : 0;
      if (p) {
        p.x = p.px = x;
        p.y = p.py = y;
        p.life = 80 + Math.random() * 220;
        p.hue = hue;
        return p;
      }
      return { x, y, px: x, py: y, life: Math.random() * 300, hue };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      const count = Math.round(Math.min(2600, (w * h) / 650));
      ps = Array.from({ length: count }, () => spawn());
    };

    // Smooth pseudo-noise built from layered trig: cheap and good enough here.
    const angle = (x: number, y: number) => {
      const s = 0.0016;
      const a =
        Math.sin(x * s + t * 0.6) +
        Math.cos(y * s * 1.3 - t * 0.45) +
        Math.sin((x + y) * s * 0.7 + t * 0.3) * 0.8;
      return a * Math.PI * 0.85;
    };


    const step = () => {
      t += 0.0035;
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 0.8;

      for (let pass = 0; pass < 3; pass++) {
        ctx.strokeStyle = colors[pass];
        ctx.beginPath();
        for (const p of ps) {
          if (p.hue !== pass) continue;
          let a = angle(p.x, p.y);
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 52000) {
              const k = 1 - d2 / 52000;
              a = a * (1 - k) + (Math.atan2(dy, dx) + Math.PI / 2) * k;
            }
          }
          p.px = p.x;
          p.py = p.y;
          p.x += Math.cos(a) * 1.7;
          p.y += Math.sin(a) * 1.7;
          p.life--;
          if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
            spawn(p);
            continue;
          }
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    };

    const loop = () => {
      if (visible) step();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y > 0 && mouse.y < r.height;
    };
    const onLeave = () => (mouse.active = false);

    resize();
    if (reduced) {
      for (let i = 0; i < 320; i++) step();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readPalette();
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      if (reduced) for (let i = 0; i < 320; i++) step();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
