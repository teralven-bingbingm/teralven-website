import type { Metadata } from "next";
import Link from "next/link";
import { Horizon } from "@/components/ui/horizon";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className={styles.page} data-theme="dark">
      <Horizon variant="cta" />
      <div className={`container ${styles.inner}`}>
        <p className="kicker kicker-plain">404</p>
        <h1 className="display d-l">
          Beyond the horizon.
          <em className="line">This page isn&rsquo;t here.</em>
        </h1>
        <Link href="/" className="button">
          Back to the home page <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
