import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Glyph } from "@/components/ui/glyph";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate, readingTime, type Article, type Cover } from "@/content/perspectives";
import styles from "./article-card.module.css";

export function ArticleCover({ cover, sizes, priority = false, className }: { cover: Cover; sizes: string; priority?: boolean; className?: string }) {
  return (
    <div className={`${styles.cover} ${cover.kind === "glyph" ? styles.coverGlyph : ""} ${className ?? ""}`}>
      {cover.kind === "image" ? (
        <Image src={cover.src} alt="" fill sizes={sizes} priority={priority} className={styles.image} style={{ objectPosition: cover.position ?? "50% 50%" }} />
      ) : (
        <Glyph id={cover.id} className={styles.glyph} />
      )}
    </div>
  );
}

/** An article in a list: its cover, category, date, title and first line. */
export function ArticleCard({ article, index = 0, large = false }: { article: Article; index?: number; large?: boolean }) {
  return (
    <article className={`${styles.card} ${large ? styles.large : ""}`} data-reveal style={{ "--delay": `${index * 90}ms` } as CSSProperties}>
      <Link href={`/perspectives/${article.slug}`} className={styles.link}>
        <ArticleCover cover={article.cover} sizes={large ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 100vw, 33vw"} />
        <div className={styles.text}>
          <p className="meta">
            <span className={styles.category}>{article.category}</span> · {formatDate(article.date)} · {readingTime(article)} min read
          </p>
          <h3 className={large ? "display d-m" : "h3"}>{article.title}</h3>
          <p className="body">{article.dek}</p>
          <span className={`link ${styles.read}`}>
            Read <ArrowRight />
          </span>
        </div>
      </Link>
    </article>
  );
}
