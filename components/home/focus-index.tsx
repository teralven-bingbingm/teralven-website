"use client";

import Link from "next/link";
import { useState } from "react";
import { Glyph } from "@/components/ui/glyph";
import { ArrowRight } from "@/components/ui/icons";
import { FOCUS } from "@/content/focus";
import styles from "./focus-index.module.css";

/**
 * The focus areas as an index. Pointing at a row (or tabbing to it) shows its drawing in the
 * plate beside the list, like a specimen in a catalogue.
 */
export function FocusIndex() {
  const [active, setActive] = useState(0);
  const current = FOCUS[active];

  return (
    <div className={styles.index}>
      <ol className={styles.list}>
        {FOCUS.map((item, index) => (
          <li key={item.id} data-reveal>
            <Link
              href={`/focus#${item.id}`}
              className={index === active ? styles.on : undefined}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.summary}>{item.summary}</span>
              <ArrowRight className={styles.arrow} size={18} />
            </Link>
          </li>
        ))}
      </ol>

      <div className={styles.plate} aria-hidden="true" data-reveal>
        <div className={styles.drawings}>
          {FOCUS.map((item, index) => (
            <Glyph key={item.id} id={item.id} className={`${styles.glyph} ${index === active ? styles.shown : ""}`} />
          ))}
        </div>
        <p className={`meta ${styles.caption}`}>
          <span>{String(active + 1).padStart(2, "0")}</span>
          <span>{current.title}</span>
        </p>
      </div>
    </div>
  );
}
