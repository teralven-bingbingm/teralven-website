"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { Horizon } from "@/components/ui/horizon";
import { ArrowRight } from "@/components/ui/icons";
import { FOCUS } from "@/content/focus";
import { Stars } from "./stars";
import styles from "./hero.module.css";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/**
 * The first screen: the firm's line above the horizon at first light. As the page scrolls,
 * --p runs from 0 to 1 over the height of the hero; the scene lifts and the words step back.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
      hero.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={ref} className={styles.hero} data-theme="dark">
      <Stars className={styles.stars} />
      <Horizon variant="hero" />

      <div className={`container ${styles.content}`}>
        <p className={`kicker ${styles.rise}`} style={delay(0.35)}>
          Venture capital for the frontier
        </p>
        <h1 className={`display d-xl ${styles.title}`}>
          <span className={styles.mask}>
            <span style={delay(0.45)}>Early conviction.</span>
          </span>
          <span className={styles.mask}>
            <em style={delay(0.6)}>Enduring companies.</em>
          </span>
        </h1>
        <p className={`lede ${styles.lede} ${styles.rise}`} style={delay(0.95)}>
          We partner with exceptional founders, from the first line of code to category leadership.
        </p>
        <div className={`${styles.actions} ${styles.rise}`} style={delay(1.1)}>
          <Link href="/portfolio" className="button">
            View portfolio <ArrowRight />
          </Link>
        </div>
      </div>

      <div className={`container ${styles.bar} ${styles.rise}`} style={delay(1.4)}>
        <ul className={styles.areas} aria-label="Focus areas">
          {FOCUS.map(item => (
            <li key={item.id}>
              <Link href={`/focus#${item.id}`}>{item.short}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
