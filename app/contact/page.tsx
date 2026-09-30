import type { Metadata } from "next";
import Link from "next/link";
import { MessageForm } from "@/components/contact/message-form";
import { PageHeader } from "@/components/site/page-header";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Teralven Capital for press, investor relations, careers and everything else. Founders can pitch us directly.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader kicker="Contact" title="Get in|*touch.*" lede="Press, investor relations, careers or anything else: send us a note and the right person will answer." />

      <section className="section" data-theme="light">
        <div className={`container ${styles.grid}`}>
          <div className={styles.formColumn}>
            <div className={styles.formHead}>
              <p className="kicker">Write to us</p>
              <h2 className="display d-m">
                Send us <em>a message.</em>
              </h2>
            </div>
            <MessageForm />
          </div>

          <aside className={styles.aside} aria-label="For founders">
            <Link href="/pitch" className={styles.founders}>
              <span className="meta">Founders</span>
              <span className={styles.foundersTitle}>Building something? Pitch us directly.</span>
              <span className="link">
                Pitch us <ArrowRight />
              </span>
            </Link>
            <p className={styles.disclaimer}>
              This website is for information only. Nothing on it is an offer to sell, or a solicitation of an offer to buy, any security or any interest in a fund.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
