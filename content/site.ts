/**
 * The firm's name, addresses and navigation. Everything the header, the footer and the
 * metadata say about Teralven comes from here.
 *
 * TODO before launch: confirm the domain and the mailboxes below, and add the social links
 * (an empty string hides a link).
 */

export const SITE = {
  name: "Teralven Capital",
  legalName: "Teralven Capital LLC",
  shortName: "Teralven",
  url: "https://www.teralvencapital.com",
  tagline: "Early conviction. Enduring companies.",
  description:
    "Teralven Capital is a venture firm partnering with founders at the frontier across AI, media, enterprise software, fintech, health, consumer and frontier technology.",
  email: {
    general: "hello@teralvencapital.com",
    press: "press@teralvencapital.com",
    investors: "ir@teralvencapital.com",
    careers: "careers@teralvencapital.com",
  },
  social: {
    linkedin: "",
    x: "",
  },
} as const;

export const NAV = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Focus Areas", href: "/focus" },
  { label: "Team", href: "/team" },
  { label: "Perspectives", href: "/perspectives" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL = [
  { label: "Disclosures", href: "/legal/disclosures" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
] as const;
