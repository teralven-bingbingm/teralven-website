import Link from "next/link";
import { LEGAL, NAV, SITE } from "@/content/site";
import { ArrowUpRight, LinkedIn, XLogo } from "@/components/ui/icons";
import { Logo } from "./logo";
import styles from "./footer.module.css";

export function Footer() {
  const social = [
    { label: "LinkedIn", href: SITE.social.linkedin, icon: <LinkedIn /> },
    { label: "X", href: SITE.social.x, icon: <XLogo /> },
  ].filter(item => item.href);

  return (
    <footer className={styles.footer} data-theme="dark">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.about}>
            <Link href="/" aria-label={`${SITE.name} home`}>
              <Logo size="footer" />
            </Link>
            <p className="body">{SITE.description}</p>
          </div>

          <div className={styles.columns}>
            <nav aria-label="Firm">
              <h2 className="meta">Firm</h2>
              <ul>
                {NAV.map(item => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="meta">Connect</h2>
              <ul>
                <li>
                  <Link href="/pitch">Pitch us</Link>
                </li>
                <li>
                  <a href={`mailto:${SITE.email.general}`}>{SITE.email.general}</a>
                </li>
                {social.map(item => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer" className={styles.social}>
                      {item.icon}
                      {item.label}
                      <ArrowUpRight size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Legal">
              <h2 className="meta">Legal</h2>
              <ul>
                {LEGAL.map(item => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any security or investment product.{" "}
            <Link href="/legal/disclosures">Disclosures</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
