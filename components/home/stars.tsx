"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number; colour: string };

/** A small, seeded random generator, so the sky is the same on every visit. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The night sky above the horizon: a few hundred points of light, twinkling slowly, thinning
 * out as they near the glow of the atmosphere. It draws at 30 frames a second only while it is
 * on screen and the tab is visible; with reduced motion it is drawn once.
 */
export function Stars({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let visible = true;

    const make = () => {
      const random = seeded(11);
      const count = Math.round((width * height) / 4600);
      stars = Array.from({ length: count }, () => {
        const bright = random() < 0.07;
        const tint = random();
        return {
          x: random() * width,
          y: random() * height * 0.86,
          r: bright ? 0.9 + random() * 0.7 : 0.3 + random() * 0.5,
          alpha: bright ? 0.7 + random() * 0.3 : 0.2 + random() * 0.5,
          speed: 0.3 + random() * 1.2,
          phase: random() * Math.PI * 2,
          colour: tint > 0.93 ? "255,214,186" : tint > 0.85 ? "196,212,255" : "255,255,255",
        };
      });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = reduced ? 1 : 0.62 + 0.38 * Math.sin(time * 0.001 * star.speed + star.phase);
        const depth = star.y / height;
        const fade = depth < 0.4 ? 1 : Math.max(0, 1 - (depth - 0.4) * 2);
        const alpha = star.alpha * twinkle * fade;
        if (alpha < 0.02) continue;
        context.fillStyle = `rgba(${star.colour},${alpha.toFixed(3)})`;
        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fill();
      }
    };

    const resize = () => {
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      make();
      draw(performance.now());
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (time - last < 33) return;
      last = time;
      draw(time);
    };

    const start = () => {
      if (!reduced && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(canvas);
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    view.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      sizes.disconnect();
      view.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
