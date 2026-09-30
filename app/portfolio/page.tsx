import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { Closing } from "@/components/site/closing";
import { PageHeader } from "@/components/site/page-header";
import { listedCompanies } from "@/content/listed";
import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Every company Teralven Capital has invested in, across AI, media, enterprise, fintech, health, consumer and frontier technology.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        kicker="Portfolio"
        title="The companies|*we stand behind.*"
        lede="We partner with founders across AI, media, enterprise, fintech, health, consumer and frontier technology, and stay with them for the long arc."
      />
      <section className={styles.all} data-theme="light">
        <div className="container">
          <h2 className={`display d-s ${styles.title}`}>All investments</h2>
          <PortfolioGrid companies={listedCompanies()} />
        </div>
      </section>
      <Closing />
    </>
  );
}
