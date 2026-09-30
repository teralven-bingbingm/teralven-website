import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { Closing } from "@/components/site/closing";
import { PageHeader } from "@/components/site/page-header";
import { ArrowRight, LinkedIn } from "@/components/ui/icons";
import { focusById } from "@/content/focus";
import { TEAM, initials } from "@/content/team";
import styles from "./team.module.css";

export const metadata: Metadata = {
  title: "Team",
  description: "The people of Teralven Capital: investors and operators who work alongside founders from the first check onward.",
};

export default function TeamPage() {
  if (TEAM.length === 0) notFound();
  return (
    <>
      <PageHeader
        kicker="Team"
        title="Investors, operators,|*builders.*"
        lede="A small team that works alongside founders from the first check, and answers the phone when it matters."
      />

      <section className="section" data-theme="light">
        <div className="container">
          <ul className={styles.grid}>
            {TEAM.map((member, index) => (
              <li key={`${member.name}-${index}`} className={styles.member} data-reveal style={{ "--delay": `${(index % 3) * 90}ms` } as CSSProperties}>
                <div className={styles.portrait}>
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill sizes="(max-width: 900px) 100vw, 33vw" className={styles.photo} />
                  ) : (
                    <span className={styles.initials} aria-hidden="true">
                      {initials(member.name)}
                    </span>
                  )}
                </div>
                <div className={styles.info}>
                  <div className={styles.nameRow}>
                    <h2 className="h3">{member.name}</h2>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className={styles.social} aria-label={`${member.name} on LinkedIn`}>
                        <LinkedIn />
                      </a>
                    )}
                  </div>
                  <p className="meta">{member.role}</p>
                  <p className="body">{member.bio}</p>
                  <ul className={styles.focus} aria-label="Focus areas">
                    {member.focus.map(id => (
                      <li key={id}>{focusById(id).short}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.join} data-reveal>
            <div>
              <p className="kicker">Careers</p>
              <h2 className="display d-m">
                Join us <em>on the frontier.</em>
              </h2>
            </div>
            <div className={styles.joinText}>
              <p className="lede">
                We are always glad to meet exceptional investors, operators and advisors. If our principles resonate, write to us. Tell us what you have built and what you want to build next.
              </p>
              <Link href="/contact" className="link">
                Write to us <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
