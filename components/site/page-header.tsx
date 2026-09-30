import type { ReactNode } from "react";
import { Horizon } from "@/components/ui/horizon";
import { Lines } from "@/components/ui/rich";
import styles from "./page-header.module.css";

/**
 * The header of an inner page: its name, its headline and a line of context, over a lower,
 * quieter horizon than the home page's. `children` goes under the lede (facts, filters…).
 */
export function PageHeader({ kicker, title, lede, children }: { kicker: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <section className={styles.header} data-theme="dark">
      <Horizon variant="band" />
      <div className={`container ${styles.inner}`}>
        <p className={`kicker ${styles.rise}`}>{kicker}</p>
        <h1 className={`display d-l ${styles.title} ${styles.rise}`}>
          <Lines text={title} />
        </h1>
        {lede && <p className={`lede ${styles.lede} ${styles.rise}`}>{lede}</p>}
        {children && <div className={styles.rise}>{children}</div>}
      </div>
    </section>
  );
}
