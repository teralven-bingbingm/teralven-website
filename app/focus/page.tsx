import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Closing } from "@/components/site/closing";
import { PageHeader } from "@/components/site/page-header";
import { Glyph } from "@/components/ui/glyph";
import { ArrowRight } from "@/components/ui/icons";
import { FOCUS } from "@/content/focus";
import { COMPANIES } from "@/content/portfolio";
import styles from "./focus.module.css";

export const metadata: Metadata = {
  title: "Focus Areas",
  description:
    "Teralven Capital invests across artificial intelligence, media and entertainment, enterprise and infrastructure, fintech, health and life sciences, consumer and frontier technology.",
};

export default function FocusPage() {
  return (
    <>
      <PageHeader
        kicker="Focus areas"
        title="Seven arenas.|*One standard.*"
        lede="We invest wherever technology can change what is possible. The arenas differ, but the bar does not: exceptional founders, real conviction and the ambition to build something that lasts."
      >
        <nav className={styles.jump} aria-label="Focus areas">
          {FOCUS.map((area, index) => (
            <a key={area.id} href={`#${area.id}`}>
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              {area.short}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className={styles.areas} data-theme="light">
        <div className="container">
          {FOCUS.map((area, index) => {
            const companies = COMPANIES.filter(company => company.focus.includes(area.id));
            return (
              <article key={area.id} id={area.id} className={styles.area}>
                <div className={styles.plate} data-reveal>
                  <div className={styles.drawing}>
                    <Glyph id={area.id} />
                  </div>
                  <p className={`meta ${styles.caption}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{area.short}</span>
                  </p>
                </div>

                <div className={styles.text}>
                  <p className="num" data-reveal>
                    {String(index + 1).padStart(2, "0")} / {String(FOCUS.length).padStart(2, "0")}
                  </p>
                  <h2 className="display d-m" data-reveal>
                    {area.title}
                  </h2>
                  <p className="lede" data-reveal>
                    {area.thesis}
                  </p>

                  <div className={styles.columns}>
                    <div data-reveal>
                      <h3 className="meta">What we look for</h3>
                      <ul className={styles.list}>
                        {area.lookFor.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div data-reveal>
                      <h3 className="meta">In the portfolio</h3>
                      {companies.length ? (
                        <ul className={styles.companies}>
                          {companies.map(company => {
                            const icon = company.mark ?? company.logo;
                            const iconOnLight = company.mark ?? company.logoOnLight ?? company.logo;
                            return (
                              <li key={company.slug}>
                                <Link href={`/portfolio#${company.slug}`} className={styles.company}>
                                  <span className={styles.logo}>
                                    <Image src={icon.src} alt="" width={icon.width} height={icon.height} sizes="28px" className={styles.onDark} />
                                    <Image src={iconOnLight.src} alt="" width={iconOnLight.width} height={iconOnLight.height} sizes="28px" className={styles.onLight} />
                                  </span>
                                  <span className={styles.companyText}>
                                    <strong>{company.name}</strong>
                                    <span>{company.tagline}</span>
                                  </span>
                                  <ArrowRight />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className={styles.empty}>
                          Early days, and an open invitation.{" "}
                          <Link href="/pitch" className="link">
                            Tell us what you are building <ArrowRight />
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Closing />
    </>
  );
}
