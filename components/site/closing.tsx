import Link from "next/link";
import { Horizon } from "@/components/ui/horizon";
import { ArrowRight } from "@/components/ui/icons";
import { Lines } from "@/components/ui/rich";
import styles from "./closing.module.css";

/** The last word on most pages: an invitation to founders, over the horizon again. */
export function Closing({
  kicker = "For founders",
  title = "Building something enduring?|*We'd like to hear from you.*",
}: {
  kicker?: string;
  title?: string;
}) {
  return (
    <section className={styles.closing} data-theme="dark">
      <Horizon variant="cta" />
      <div className={`container ${styles.inner}`}>
        <p className="kicker kicker-plain" data-reveal>
          {kicker}
        </p>
        <h2 className="display d-l" data-reveal>
          <Lines text={title} />
        </h2>
        <div className={styles.actions} data-reveal>
          <Link href="/pitch" className="button">
            Pitch us <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
