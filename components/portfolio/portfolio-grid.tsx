"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Close, Globe, LinkedIn, Plus, XLogo } from "@/components/ui/icons";
import { FOCUS, focusById, type FocusId } from "@/content/focus";
import { displayUrl, type Listed } from "@/content/portfolio";
import styles from "./portfolio-grid.module.css";

/** The filters appear once the portfolio is large enough for them to help. */
const FILTER_FROM = 8;
/** Up to this many companies, the tiles are larger: four to a row instead of six. */
const ROOMY_UNTIL = 8;
/** How long the profile takes to slide away, as in the stylesheet. */
const EXIT_MS = 420;

/**
 * "All investments", in the manner of a16z's portfolio: a grid of logo tiles, each opening the
 * company's profile in a panel from the right. The profile links to the company's own site.
 * A profile can be linked to: /portfolio#rim opens Rim's.
 */
export function PortfolioGrid({ companies }: { companies: Listed[] }) {
  const [focus, setFocus] = useState<FocusId | "all">("all");
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState<Listed | null>(null);
  const [shown, setShown] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closing = useRef<number>(0);

  const areas = useMemo(() => FOCUS.filter(area => companies.some(company => company.focus.includes(area.id))), [companies]);
  const words = query.trim().toLowerCase();
  const visible = companies.filter(
    company => (focus === "all" || company.focus.includes(focus)) && (!words || `${company.name} ${company.tagline}`.toLowerCase().includes(words)),
  );

  const open = useCallback((company: Listed, from: HTMLElement | null) => {
    window.clearTimeout(closing.current);
    opener.current = from;
    setCurrent(company);
    history.replaceState(history.state, "", `#${company.slug}`);
  }, []);

  const close = useCallback(() => {
    const element = dialog.current;
    if (!element?.open) return;
    setShown(false);
    history.replaceState(history.state, "", `${location.pathname}${location.search}`);
    const finish = () => {
      element.close();
      document.documentElement.style.overflow = "";
      const target = opener.current ?? document.querySelector<HTMLElement>(`[data-company="${current?.slug}"]`);
      target?.focus({ preventScroll: true });
      setCurrent(null);
    };
    closing.current = window.setTimeout(finish, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : EXIT_MS);
  }, [current]);

  // Show the dialog once there is a company in it, then let it slide in on the next frame.
  useEffect(() => {
    const element = dialog.current;
    if (!current || !element) return;
    if (!element.open) element.showModal();
    document.documentElement.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, [current]);

  // A link such as /portfolio#rim opens that company's profile.
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      const company = companies.find(item => item.slug === slug);
      if (company) open(company, null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [companies, open]);

  useEffect(
    () => () => {
      window.clearTimeout(closing.current);
      document.documentElement.style.overflow = "";
    },
    [],
  );

  return (
    <div>
      {companies.length >= FILTER_FROM && (
        <div className={styles.filters}>
          <label className={styles.select}>
            <span className="sr-only">Focus area</span>
            <select value={focus} onChange={event => setFocus(event.target.value as FocusId | "all")}>
              <option value="all">All focus areas</option>
              {areas.map(area => (
                <option key={area.id} value={area.id}>
                  {area.title}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.search}>
            <span className="sr-only">Search the portfolio</span>
            <input type="search" placeholder="Search" value={query} onChange={event => setQuery(event.target.value)} />
          </label>
          <p className="num">{String(visible.length).padStart(2, "0")} companies</p>
        </div>
      )}

      <ul className={`${styles.grid} ${companies.length <= ROOMY_UNTIL ? styles.roomy : ""}`}>
        {visible.map(company => {
          const onLight = company.logoOnLight ?? company.logo;
          return (
            <li key={company.slug} id={company.slug} className={styles.cell}>
              <button
                type="button"
                className={styles.tile}
                data-company={company.slug}
                aria-haspopup="dialog"
                aria-label={`${company.name}, company profile`}
                onClick={event => open(company, event.currentTarget)}
              >
                <span className={styles.logo}>
                  <Image src={company.logo.src} width={company.logo.width} height={company.logo.height} alt="" sizes="(max-width: 600px) 40vw, 300px" className={styles.onDark} />
                  <Image src={onLight.src} width={onLight.width} height={onLight.height} alt="" sizes="(max-width: 600px) 40vw, 300px" className={styles.onLight} />
                </span>
                <span className={styles.label}>{company.status}</span>
                <Plus className={styles.plus} />
              </button>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && <p className={styles.empty}>No companies match yet.</p>}

      <dialog
        ref={dialog}
        className={styles.dialog}
        data-shown={shown || undefined}
        aria-labelledby="company-profile-name"
        onCancel={event => {
          event.preventDefault();
          close();
        }}
      >
        <div className={styles.scrim} onClick={close} aria-hidden="true" />
        {current && <Profile company={current} onClose={close} />}
      </dialog>
    </div>
  );
}

/** The company's profile: what it does, where it stands, where to find it. */
function Profile({ company, onClose }: { company: Listed; onClose: () => void }) {
  const lockup = company.lockup ?? company.logo;
  const lockupOnLight = company.logoOnLight ?? lockup;
  const links = [
    company.website && { label: displayUrl(company.website), href: company.website, icon: <Globe /> },
    company.social?.x && { label: "X", href: company.social.x, icon: <XLogo /> },
    company.social?.linkedin && { label: "LinkedIn", href: company.social.linkedin, icon: <LinkedIn /> },
  ].filter(Boolean) as { label: string; href: string; icon: ReactNode }[];

  return (
    <article className={styles.panel} data-theme="light">
      <header className={styles.panelHead}>
        <p className="meta">{company.focus.map(id => focusById(id).title).join(", ")}</p>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close the profile">
          <Close size={18} />
        </button>
      </header>

      <div className={styles.plate}>
        <Image src={lockup.src} width={lockup.width} height={lockup.height} alt={`${company.name} logo`} sizes="360px" className={styles.onDark} />
        <Image src={lockupOnLight.src} width={lockupOnLight.width} height={lockupOnLight.height} alt={`${company.name} logo`} sizes="360px" className={styles.onLight} />
      </div>

      <div className={styles.identity}>
        <div>
          <h2 id="company-profile-name" className="display d-s">
            {company.name}
          </h2>
          <p className={styles.tagline}>{company.tagline}</p>
        </div>
        {links.length > 0 && (
          <ul className={styles.links}>
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <section className={styles.block}>
        <h3 className="meta">Company profile</h3>
        <p className={styles.description}>{company.description}</p>
        {company.website && (
          <a href={company.website} target="_blank" rel="noreferrer" className="button">
            Visit {displayUrl(company.website)} <ArrowUpRight />
          </a>
        )}
      </section>

      <section className={styles.block}>
        <h3 className="meta">Milestones</h3>
        <dl className={styles.facts}>
          <div>
            <dt>Invested</dt>
            <dd>{company.invested}</dd>
          </div>
          <div>
            <dt>Stage at investment</dt>
            <dd>{company.stage}</dd>
          </div>
          <div>
            <dt>Current status</dt>
            <dd>{company.milestone}</dd>
          </div>
        </dl>
      </section>

      {company.builders && company.builders.length > 0 && (
        <section className={styles.block}>
          <h3 className="meta">Builders</h3>
          <ul className={styles.builders}>
            {company.builders.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      )}

      {company.news && (
        <section className={styles.block}>
          <h3 className="meta">Investment news</h3>
          <Link href={company.news.href} className={styles.news} onClick={onClose}>
            <span className="meta">{company.news.date}</span>
            <span className={styles.newsTitle}>{company.news.title}</span>
            <span className={styles.newsDek}>{company.news.dek}</span>
            <span className="link">
              Read more <ArrowRight />
            </span>
          </Link>
        </section>
      )}
    </article>
  );
}
