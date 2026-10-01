import type { FocusId } from "./focus";

/**
 * The portfolio: every company is a tile in the "All investments" grid (home page and
 * /portfolio). A tile opens the company's profile in a side panel, which links to the
 * company's own website. To add a company, add an entry here and its logo to
 * public/portfolio/<slug>/ — a logo made for a dark ground, since the tiles are dark.
 */

export type Logo = { src: string; width: number; height: number };

/** An article about the investment, reduced to what the profile shows (content/listed.ts). */
export type News = { href: string; title: string; dek: string; date: string };

export type Company = {
  slug: string;
  name: string;
  tagline: string;
  /** The company profile, in a few sentences. */
  description: string;
  focus: FocusId[];
  /** The label on the tile, as in a16z's grid: "New", "Exit", "IPO"… */
  status: string;
  stage: string;
  invested: string;
  /** Where the company is today, in the profile's milestones. */
  milestone: string;
  website: string;
  /** The logo for a dark ground (tiles and profile on dark palettes). */
  logo: Logo;
  /** The logo for a light ground. Without one, `logo` is used everywhere. */
  logoOnLight?: Logo;
  /** For the profile: the full lockup. Defaults to `logo`. */
  lockup?: Logo;
  /** For small places, like the list on /focus. Defaults to `logo`. */
  mark?: Logo;
  social?: { x?: string; linkedin?: string };
  /** The founders, for the profile. */
  builders?: string[];
  /** An article about the investment, in content/perspectives.ts. */
  article?: string;
};

const RIM = "/portfolio/rim";

export const COMPANIES: Company[] = [
  {
    slug: "rim",
    name: "Rim Universe",
    tagline: "The AI short drama studio, for animation and live action.",
    description:
      "Rim Universe lets anyone make a short drama, animated or live-action. Type one line, or paste a full script, and a crew of seven AI artists writes, casts, draws and cuts a whole series, while the creator calls the shots at every step. A finished animated episode takes under ten minutes. Characters keep their looks and voices from shot to shot, speak many languages, and appear in every screen format.",
    focus: ["media", "ai"],
    status: "New",
    stage: "Early stage", // TODO: confirm the round (Pre-seed, Seed…)
    invested: "2026",
    milestone: "Pre-launch · Waitlist open",
    website: "https://rimuniverse.com",
    logo: { src: `${RIM}/logo.png`, width: 840, height: 611 },
    logoOnLight: { src: `${RIM}/logo-on-light.png`, width: 840, height: 611 },
    mark: { src: `${RIM}/mark.png`, width: 360, height: 413 },
    article: "why-we-invested-in-rim",
  },
];

export type Listed = Company & { news?: News };

export const companyBySlug = (slug: string) => COMPANIES.find(item => item.slug === slug);

/** "rimuniverse.com", for a link's text. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
