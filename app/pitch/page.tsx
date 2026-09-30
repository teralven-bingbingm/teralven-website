import type { Metadata } from "next";
import Link from "next/link";
import { PitchForm } from "@/components/pitch/pitch-form";
import { PageHeader } from "@/components/site/page-header";
import { FOCUS } from "@/content/focus";
import { PITCH } from "@/content/pitch";
import { SITE } from "@/content/site";
import styles from "./pitch.module.css";

export const metadata: Metadata = {
  title: "Pitch us",
  description: `Pitch ${SITE.name}. We read every submission from founders building across AI, media, enterprise, fintech, health, consumer and frontier technology.`,
};

export default function PitchPage() {
  return (
    <>
      <PageHeader kicker={PITCH.kicker} title={PITCH.title} lede={PITCH.lede} />

      <section className="section" data-theme="light">
        <div className={`container ${styles.grid}`}>
          <div className={styles.form}>
            <PitchForm />
          </div>

          <aside className={styles.aside} aria-label="About pitching us">
            <div className={styles.block}>
              <h2 className="meta">What we look for</h2>
              <ul className={styles.list}>
                {PITCH.lookFor.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <h2 className="meta">What happens next</h2>
              <ol className={styles.steps}>
                {PITCH.next.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.step}>{index + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.block}>
              <h2 className="meta">Where we invest</h2>
              <ul className={styles.areas}>
                {FOCUS.map(area => (
                  <li key={area.id}>
                    <Link href={`/focus#${area.id}`}>{area.short}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <p className={styles.asideText}>{PITCH.early}</p>
              <p className={styles.asideText}>{PITCH.intro}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
