import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGAL_DOCS, legalBySlug } from "@/content/legal";
import { formatDate } from "@/content/perspectives";
import styles from "./legal.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return LEGAL_DOCS.map(doc => ({ slug: doc.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = legalBySlug((await params).slug);
  return doc ? { title: doc.title, description: doc.intro } : {};
}

export default async function LegalPage({ params }: Props) {
  const doc = legalBySlug((await params).slug);
  if (!doc) notFound();

  return (
    <>
      <section className={styles.header} data-theme="dark">
        <div className={`container ${styles.headerInner}`}>
          <p className="kicker">Legal</p>
          <h1 className="display d-l">{doc.title}</h1>
          <p className="meta">Last updated {formatDate(doc.updated)}</p>
        </div>
      </section>

      <section className="section" data-theme="light">
        <div className={`container ${styles.layout}`}>
          <nav className={styles.aside} aria-label="Legal">
            {LEGAL_DOCS.map(item => (
              <Link key={item.slug} href={`/legal/${item.slug}`} aria-current={item.slug === doc.slug ? "page" : undefined}>
                {item.title}
              </Link>
            ))}
          </nav>
          <article className={styles.prose}>
            <p className={styles.intro}>{doc.intro}</p>
            {doc.sections.map(section => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map(paragraph => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
