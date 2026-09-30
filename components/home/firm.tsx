import type { CSSProperties } from "react";
import { Rich } from "@/components/ui/rich";
import { MISSION, PRINCIPLES } from "@/content/firm";
import styles from "./firm.module.css";

/** The firm in one sentence, and the principles behind it. */
export function Firm() {
  return (
    <section className="section" data-theme="light">
      <div className="container">
        <div className={styles.statement}>
          <p className="kicker" data-reveal>
            The firm
          </p>
          <p className="statement" data-reveal>
            <Rich text={MISSION} />
          </p>
        </div>

        <ol className={styles.principles}>
          {PRINCIPLES.slice(0, 4).map((principle, index) => (
            <li key={principle.title} data-reveal style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="h3">{principle.title}</h3>
              <p className="body">{principle.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
