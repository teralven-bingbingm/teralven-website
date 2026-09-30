import type { MetadataRoute } from "next";
import { LEGAL_DOCS } from "@/content/legal";
import { PERSPECTIVES } from "@/content/perspectives";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/portfolio", "/focus", "/team", "/perspectives", "/pitch", "/contact"];
  return [
    ...pages.map(path => ({ url: `${SITE.url}${path}`, changeFrequency: "monthly" as const, priority: path ? 0.8 : 1 })),
    ...PERSPECTIVES.map(article => ({ url: `${SITE.url}/perspectives/${article.slug}`, lastModified: article.date, priority: 0.6 })),
    ...LEGAL_DOCS.map(doc => ({ url: `${SITE.url}/legal/${doc.slug}`, lastModified: doc.updated, priority: 0.2 })),
  ];
}
