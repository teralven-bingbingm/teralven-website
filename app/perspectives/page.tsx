import type { Metadata } from "next";
import { ArticleCard } from "@/components/site/article-card";
import { Closing } from "@/components/site/closing";
import { PageHeader } from "@/components/site/page-header";
import { PERSPECTIVES } from "@/content/perspectives";
import styles from "./perspectives.module.css";

export const metadata: Metadata = {
  title: "Perspectives",
  description: "Portfolio notes and perspectives from Teralven Capital.",
};

export default function PerspectivesPage() {
  const [lead, ...rest] = PERSPECTIVES;
  return (
    <>
      <PageHeader
        kicker="Perspectives"
        title="Notes from|*the frontier.*"
        lede="Notes on the companies we back, and on how we think about technology, markets and the founders who move them."
      />

      <section className="section" data-theme="light">
        <div className="container">
          {lead && <ArticleCard article={lead} large />}
          {rest.length > 0 && (
            <div className={styles.grid}>
              {rest.map((article, index) => (
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
