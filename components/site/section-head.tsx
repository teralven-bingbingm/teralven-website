import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { Lines } from "@/components/ui/rich";
import styles from "./section-head.module.css";

/**
 * The head of a section: a kicker and a headline on the left, a few words and a link on the
 * right. The headline takes the copy's markup (*italic*, "|" for a new line).
 */
export function SectionHead({
  kicker,
  title,
  text,
  link,
  size = "l",
  as: Heading = "h2",
}: {
  kicker: string;
  title: string;
  text?: string;
  link?: { href: string; label: string };
  size?: "l" | "m";
  as?: "h1" | "h2";
}) {
  return (
    <div className={styles.head}>
      <div className={styles.main}>
        <p className="kicker" data-reveal>
          {kicker}
        </p>
        <Heading className={`display ${size === "l" ? "d-l" : "d-m"} ${styles.title}`} data-reveal>
          <Lines text={title} />
        </Heading>
      </div>
      {(text || link) && (
        <div className={styles.aside} data-reveal style={{ "--delay": "120ms" } as CSSProperties}>
          {text && <p className="lede">{text}</p>}
          {link && (
            <Link href={link.href} className="link">
              {link.label} <ArrowRight />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
