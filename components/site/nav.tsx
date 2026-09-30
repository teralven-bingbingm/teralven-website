"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { NAV, SITE } from "@/content/site";
import { ArrowRight } from "@/components/ui/icons";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import styles from "./nav.module.css";

type Theme = "dark" | "light";

/** The line the bar reads its colour from: its own middle. */
const PROBE = 38;

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/**
 * The top bar. It takes the colours of the section underneath it (every section says which
 * ground it sits on with data-theme), turns solid once the page moves, steps out of the way
 * while reading downwards and comes back on the way up. On a narrow screen the links open
 * as a full-screen menu.
 */
export function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > 24);
      if (Math.abs(y - lastY) > 8) {
        setHidden(y > lastY && y > window.innerHeight * 0.7);
        lastY = y;
      }
      // The deepest section across the probe line wins: later elements in document order.
      // Only full-width sections count, not a dark card sitting on paper.
      let next: Theme = "dark";
      for (const element of document.querySelectorAll<HTMLElement>("main section[data-theme], footer[data-theme]")) {
        const box = element.getBoundingClientRect();
        if (box.top <= PROBE && box.bottom > PROBE) next = element.dataset.theme === "light" ? "light" : "dark";
      }
      setTheme(next);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // A new page closes the menu and brings the bar back.
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const classes = [styles.nav, solid && !open && styles.solid, hidden && !open && styles.hidden, open && styles.isOpen].filter(Boolean).join(" ");

  return (
    <>
      <header className={classes} data-theme={open ? "light" : theme}>
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.brand} aria-label={`${SITE.name} home`}>
            <Logo />
          </Link>

          <nav className={styles.links} aria-label="Primary">
            {NAV.map(item => {
              const active = isActive(pathname, item.href);
              return (
                <Link key={item.href} href={item.href} className={active ? styles.active : undefined} aria-current={active ? "page" : undefined}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <Link href="/pitch" className={`button ${styles.cta}`} aria-current={isActive(pathname, "/pitch") ? "page" : undefined}>
              Pitch us
            </Link>
            <button
              type="button"
              className={styles.burger}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(value => !value)}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`${styles.menu} ${open ? styles.menuOpen : ""}`} data-theme="light" inert={!open}>
        <div className={`container ${styles.menuInner}`}>
          <nav aria-label="Menu" className={styles.menuLinks}>
            {[...NAV, { label: "Pitch us", href: "/pitch" }].map((item, index) => (
              <Link key={item.href} href={item.href} style={{ "--i": index } as CSSProperties} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
                <ArrowRight size={20} />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
