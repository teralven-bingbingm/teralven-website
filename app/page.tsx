import Link from "next/link";
import { Firm } from "@/components/home/firm";
import { FocusIndex } from "@/components/home/focus-index";
import { Hero } from "@/components/home/hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { ArticleCard } from "@/components/site/article-card";
import { Closing } from "@/components/site/closing";
import { SectionHead } from "@/components/site/section-head";
import { ArrowRight } from "@/components/ui/icons";
import { listedCompanies } from "@/content/listed";
import { PERSPECTIVES } from "@/content/perspectives";
import styles from "./home.module.css";

/**
 * The home page tells the firm's story in the order most venture firms do: who we are
 * (hero, the firm), where we invest (focus areas), who we have backed (all investments),
 * what we think (perspectives), and an invitation to founders. While the portfolio is young
 * the firm leads; once it is long, All investments can move up to follow the hero.
 * Everything between the hero and the closing call sits on the reading ground, so a palette
 * with two grounds turns from dark to light once, and back once.
 */
export default function Home() {
  const latest = PERSPECTIVES.slice(0, 3);
  return (
    <>
      <Hero />
      <Firm />

      <section className="section" data-theme="light" style={{ paddingTop: 0 }}>
        <div className="container">
          <hr className={`rule ${styles.divider}`} />
          <SectionHead
            kicker="Focus areas"
            title="Seven arenas.|*One standard.*"
            text="We invest wherever technology can change what is possible, and we hold every company to the same bar: exceptional founders, real conviction, enduring ambition."
            link={{ href: "/focus", label: "All focus areas" }}
          />
          <FocusIndex />
        </div>
      </section>

      <section id="portfolio" className={styles.portfolio} data-theme="light">
        <div className="container">
          <div className={styles.portfolioHead}>
            <h2 className="display d-m" data-reveal>
              All investments
            </h2>
            <Link href="/portfolio" className="link" data-reveal>
              View portfolio <ArrowRight />
            </Link>
          </div>
          <div data-reveal>
            <PortfolioGrid companies={listedCompanies()} />
          </div>
        </div>
      </section>

      <section className="section" data-theme="light">
        <div className="container">
          <SectionHead kicker="Perspectives" title="Notes from|*the frontier.*" link={PERSPECTIVES.length > 1 ? { href: "/perspectives", label: "All perspectives" } : undefined} size="m" />
          {latest.length === 1 ? (
            <ArticleCard article={latest[0]} large />
          ) : (
            <div className={styles.articles} data-count={latest.length}>
              {latest.map((article, index) => (
                <ArticleCard key={article.slug} article={article} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Closing />
    </>
  );
}
