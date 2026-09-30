import type { FocusId } from "./focus";

/**
 * Perspectives: the firm's writing. Each article is a list of blocks, so the page can set
 * every paragraph, heading, quote and list in the house style. The newest article comes first
 * on /perspectives; `date` is ISO (YYYY-MM-DD).
 *
 * TODO: set each `date` to the day the article is published.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Cover = { kind: "image"; src: string; position?: string } | { kind: "glyph"; id: FocusId };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: "Portfolio" | "Thesis" | "Firm";
  date: string;
  author: string;
  cover: Cover;
  /** The portfolio company the article is about (a slug in content/portfolio.ts). */
  company?: string;
  body: Block[];
};

const ARTICLES: Article[] = [
  {
    slug: "why-we-invested-in-rim",
    title: "Why we invested in Rim",
    dek: "The next great studio will not have a backlot. It will have a crew of AI artists, and a director who has never had access to one before.",
    category: "Portfolio",
    date: "2026-09-29",
    author: "Teralven Capital",
    cover: { kind: "image", src: "/rim-website.png", position: "50% 32%" },
    company: "rim",
    body: [
      { type: "p", text: "Every few decades, the cost of telling a story with moving pictures collapses. Film gave way to video, and video to the phone in everyone's pocket. Each shift did more than make production cheaper. It changed who got to be a storyteller. We believe we are at the start of the largest of these shifts yet, and that is why Teralven Capital has invested in Rim." },
      { type: "h2", text: "A studio, not a clip generator" },
      { type: "p", text: "Most generative video products today make clips: a few seconds of footage from a prompt. They are impressive, but a clip is not a story. A series needs characters who look and sound the same from the first shot to the last, places that stay put, props that matter, a script that holds and an edit that carries an audience from one episode to the next." },
      { type: "p", text: "Rim is built around that reality. Type a single line, or paste a full script, and a crew of seven AI artists goes to work: a storyteller, a scriptwriter, a character designer, a scene designer, an item designer, a storyboard artist and an editor. Each does the job its title describes, in order, on one shared canvas." },
      { type: "h2", text: "The creator stays in the director's chair" },
      { type: "p", text: "What struck us most is what Rim chooses not to automate. Every step stops for the creator's call. Every picture and every video shows its price before it starts. Edits arrive as a readable before-and-after, never as a surprise. A character is drawn once, then carried into every shot, and a look only changes when the director changes it." },
      { type: "quote", text: "The AI does the work. The person makes the calls. That is how professional productions have always run, and how quality compounds." },
      { type: "h2", text: "Every screen, every voice" },
      { type: "p", text: "Audiences no longer watch in one shape. Rim produces in five formats (9:16, 16:9, 1:1, 3:4 and 4:3), and its characters speak many languages, from English and Spanish to Chinese, Japanese and Korean. A story made once can travel to every screen and every audience from day one." },
      { type: "h2", text: "What comes next" },
      { type: "p", text: "Rim is opening its doors through a waitlist. We are proud to support the team as they build a studio for everyone who has a story to tell and has never had the means to tell it." },
    ],
  },
  {
    slug: "five-principles-for-investing-at-the-frontier",
    title: "Five principles for investing at the frontier",
    dek: "How we think about conviction, speed and the long arc of building a company.",
    category: "Firm",
    date: "2026-09-15",
    author: "Teralven Capital",
    cover: { kind: "glyph", id: "frontier" },
    body: [
      { type: "p", text: "Teralven Capital was founded on a simple belief: the most important companies are built by founders who see the frontier before everyone else, and who need partners willing to see it with them. These are the principles that guide how we invest." },
      { type: "h2", text: "1. Conviction over consensus" },
      { type: "p", text: "By the time an idea is consensus, it is usually priced. We do our own work, form our own views and are willing to be early, and occasionally wrong, in pursuit of being right about what matters." },
      { type: "h2", text: "2. Founders first, always" },
      { type: "p", text: "We earn our place on a cap table by being useful. That means candid feedback, fast answers and showing up in the hard moments, not only the celebratory ones." },
      { type: "h2", text: "3. Concentration, with care" },
      { type: "p", text: "We would rather go deep with a small number of companies than spread thin across many. Every investment gets our full attention, from the first board meeting to the last." },
      { type: "h2", text: "4. Long horizons" },
      { type: "p", text: "Enduring companies take a decade or more to build. We shape our partnership and our capital for that timeline, and we measure ourselves by what our founders build over it." },
      { type: "h2", text: "5. Global by default" },
      { type: "p", text: "Great companies are built for the world from day one. We help our founders reach customers, talent and capital across markets, wherever their ambition takes them." },
      { type: "quote", text: "We measure ourselves by one thing: the companies our founders build." },
      { type: "p", text: "If these principles resonate, we would like to hear what you are building." },
    ],
  },
];

/** Newest first. */
export const PERSPECTIVES = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));

export const articleBySlug = (slug: string) => PERSPECTIVES.find(item => item.slug === slug);

/** "September 29, 2026". Formatted in UTC so the server and the browser always agree. */
export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** Minutes to read, at 230 words a minute. */
export function readingTime(article: Article) {
  const words = article.body
    .flatMap(block => (block.type === "list" ? block.items : [block.text]))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}
