import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, ArticleCover } from "@/components/site/article-card";
import { Closing } from "@/components/site/closing";
import { Horizon } from "@/components/ui/horizon";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { PERSPECTIVES, articleBySlug, formatDate, readingTime, type Block } from "@/content/perspectives";
import { companyBySlug, displayUrl } from "@/content/portfolio";
import { SITE } from "@/content/site";
import styles from "./article.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PERSPECTIVES.map(article => ({ slug: article.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articleBySlug((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    authors: [{ name: article.author }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      publishedTime: article.date,
      ...(article.cover.kind === "image" ? { images: [{ url: article.cover.src }] } : {}),
    },
  };
}

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return <h2 key={index}>{block.text}</h2>;
          case "quote":
            return (
              <blockquote key={index}>
                <p>{block.text}</p>
              </blockquote>
            );
          case "list":
            return (
              <ul key={index}>
                {block.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return <p key={index}>{block.text}</p>;
        }
      })}
    </>
  );
}

export default async function ArticlePage({ params }: Props) {
  const article = articleBySlug((await params).slug);
  if (!article) notFound();

  const related = PERSPECTIVES.filter(item => item.slug !== article.slug).slice(0, 2);
  const company = article.company ? companyBySlug(article.company) : undefined;
  const lockup = company ? (company.lockup ?? company.logo) : undefined;
  const lockupOnLight = company ? (company.logoOnLight ?? company.lockup ?? company.logo) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    datePublished: article.date,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: SITE.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.header} data-theme="dark">
        <Horizon variant="band" />
        <div className={`container ${styles.headerInner}`}>
          <nav className={`meta ${styles.crumbs}`} aria-label="Breadcrumb">
            <Link href="/perspectives">Perspectives</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.category}>{article.category}</span>
          </nav>
          <h1 className="display d-l">{article.title}</h1>
          <p className={`lede ${styles.dek}`}>{article.dek}</p>
          <p className="meta">
            {article.author} · <time dateTime={article.date}>{formatDate(article.date)}</time> · {readingTime(article)} min read
          </p>
        </div>
      </section>

      <section className={styles.article} data-theme="light">
        <div className="container">
          <ArticleCover cover={article.cover} sizes="(max-width: 1200px) 100vw, 1200px" priority className={styles.cover} />
          <div className={styles.prose}>
            <Body blocks={article.body} />
          </div>
          {company && lockup && lockupOnLight && (
            <aside className={styles.company} aria-label="Portfolio company">
              <div className={styles.companyLogo}>
                <Image src={lockup.src} width={lockup.width} height={lockup.height} alt={`${company.name} logo`} sizes="220px" className={styles.onDark} />
                <Image src={lockupOnLight.src} width={lockupOnLight.width} height={lockupOnLight.height} alt={`${company.name} logo`} sizes="220px" className={styles.onLight} />
              </div>
              <div className={styles.companyText}>
                <p className="meta">Portfolio company</p>
                <p className={styles.companyName}>{company.name}</p>
                <p className="body">{company.tagline}</p>
                <div className={styles.companyLinks}>
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noreferrer" className="button">
                      Visit {displayUrl(company.website)} <ArrowUpRight />
                    </a>
                  )}
                  <Link href={`/portfolio#${company.slug}`} className="link">
                    Company profile <ArrowRight />
                  </Link>
                </div>
              </div>
            </aside>
          )}
          <div className={styles.end}>
            <span className={styles.endMark} aria-hidden="true" />
            <Link href="/perspectives" className="link">
              All perspectives <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" data-theme="light" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className={styles.related}>
              <p className="kicker">Keep reading</p>
              <div className={styles.relatedGrid}>
                {related.map((item, index) => (
                  <ArticleCard key={item.slug} article={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Closing />
    </>
  );
}
