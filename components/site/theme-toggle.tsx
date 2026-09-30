"use client";

import { useEffect, useState } from "react";
import { PALETTE, PALETTE_EVENT, type PaletteId } from "@/content/palettes";
import { applyPalette } from "./apply-palette";
import styles from "./theme-toggle.module.css";

/**
 * Night and day. The button shows where it will take you: a sun at night, a moon by day. It
 * renders as the server does, then reads the palette the boot script applied, so the page and
 * the button never disagree while React takes over.
 */
export function ThemeToggle() {
  const [palette, setPalette] = useState<PaletteId>(PALETTE);

  useEffect(() => {
    setPalette((document.documentElement.dataset.palette as PaletteId) || PALETTE);
    const onChange = (event: Event) => setPalette((event as CustomEvent<PaletteId>).detail);
    window.addEventListener(PALETTE_EVENT, onChange);
    return () => window.removeEventListener(PALETTE_EVENT, onChange);
  }, []);

  const isDay = palette === "day";
  const next: PaletteId = isDay ? "night" : "day";

  return (
    <button type="button" className={styles.toggle} onClick={() => applyPalette(next)} aria-label={isDay ? "Switch to night" : "Switch to day"} title={isDay ? "Night" : "Day"}>
      {isDay ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
