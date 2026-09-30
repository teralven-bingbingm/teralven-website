import { COMPANIES, type Listed } from "./portfolio";
import { articleBySlug, formatDate } from "./perspectives";

/**
 * The portfolio as the grid receives it: each company with the article about the investment,
 * cut down to its title, first line and date. Kept apart from content/portfolio.ts so the
 * articles themselves never travel to the browser with the grid.
 */
export function listedCompanies(): Listed[] {
  return COMPANIES.map(company => {
    const article = company.article ? articleBySlug(company.article) : undefined;
    return article
      ? { ...company, news: { href: `/perspectives/${article.slug}`, title: article.title, dek: article.dek, date: formatDate(article.date) } }
      : company;
  });
}
