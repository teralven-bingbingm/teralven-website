import { TEAM } from "./team";

/**
 * The firm's name, address on the web and navigation. Everything the header, the footer and
 * the metadata say about Teralven comes from here. The firm has no public mailboxes yet, so the
 * site lists none: visitors write through /contact, and founders through /pitch.
 *
 * TODO before launch: add the social links (an empty string hides a link).
 */

/**
 * Where the site lives, for link previews, the sitemap and robots.txt: SITE_URL when it is set,
 * then the production domain Vercel gives the project, then the firm's own domain.
 */
const url =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://www.teralvencapital.com");

export const SITE = {
  name: "Teralven Capital",
  legalName: "Teralven Capital LLC",
  shortName: "Teralven",
  url,
  tagline: "Early conviction. Enduring companies.",
  description:
    "Teralven Capital is a venture firm partnering with founders at the frontier across AI, media, enterprise software, fintech, health, consumer and frontier technology.",
  social: {
    linkedin: "",
    x: "",
  },
} as const;

export const NAV = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Focus Areas", href: "/focus" },
  // The team page appears once content/team.ts lists someone.
  ...(TEAM.length ? [{ label: "Team", href: "/team" }] : []),
  { label: "Perspectives", href: "/perspectives" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL = [
  { label: "Disclosures", href: "/legal/disclosures" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
] as const;
