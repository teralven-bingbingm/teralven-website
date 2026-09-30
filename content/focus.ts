/**
 * The industries the firm invests in. The order here is the order everywhere: the home page
 * list, the Focus Areas page and the portfolio filters. `id` is also the anchor on /focus
 * (/focus#media) and picks the drawing in components/ui/glyph.tsx.
 */

export type FocusId = "ai" | "media" | "enterprise" | "fintech" | "health" | "consumer" | "frontier";

export type Focus = {
  id: FocusId;
  title: string;
  /** One word, for tight spaces. */
  short: string;
  /** One line, for lists. */
  summary: string;
  /** The thesis, for the Focus Areas page. */
  thesis: string;
  lookFor: string[];
};

export const FOCUS: Focus[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    short: "AI",
    summary: "Models, agents and the products built on top of them.",
    thesis:
      "Intelligence is becoming a utility. The enduring companies of this era will turn new capabilities into products people trust every day, owning a workflow, a dataset or a relationship that gets better with every use.",
    lookFor: [
      "Products that compound with usage and data",
      "Teams at the intersection of research and product",
      "A clear path from capability to customer value",
    ],
  },
  {
    id: "media",
    title: "Media & Entertainment",
    short: "Media",
    summary: "AI-native studios, creator tools and new formats for story.",
    thesis:
      "For a century, making a film or a series required a studio. Generative tools are collapsing the cost of production and handing the director's chair to anyone with an idea. We back the studios, tools and formats of that world.",
    lookFor: [
      "Creative tools that keep people in control",
      "Formats native to how audiences watch now",
      "Distribution designed into the product",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise & Infrastructure",
    short: "Enterprise",
    summary: "The systems companies use to build, run and secure software.",
    thesis:
      "Every company is rebuilding its stack for AI. We invest in developer platforms, data infrastructure and security: the quiet layers that become indispensable once they are in place.",
    lookFor: [
      "Developer-first adoption",
      "Durable, usage-based economics",
      "Security and compliance by design",
    ],
  },
  {
    id: "fintech",
    title: "Fintech",
    short: "Fintech",
    summary: "Payments, embedded finance and the rails that move money.",
    thesis:
      "Money still moves slowly, expensively and unevenly, especially across borders. We back teams building the infrastructure and products that make it instant, transparent and accessible.",
    lookFor: [
      "Infrastructure other companies build on",
      "Underserved markets and cross-border flows",
      "Regulatory fluency as a competitive edge",
    ],
  },
  {
    id: "health",
    title: "Health & Life Sciences",
    short: "Health",
    summary: "Computational biology, clinical AI and better care.",
    thesis:
      "Biology is becoming an information science. We look for founders who pair scientific depth with product discipline to discover therapies faster, support clinicians and reach patients where they are.",
    lookFor: [
      "Proprietary data and closed-loop experimentation",
      "Measurable clinical or economic outcomes",
      "Teams fluent in both science and software",
    ],
  },
  {
    id: "consumer",
    title: "Consumer",
    short: "Consumer",
    summary: "Products people love, share and return to.",
    thesis:
      "The best consumer companies feel inevitable in hindsight: a new behavior, made effortless. We back products built around creativity, community and commerce, with the craft to earn a place on people's home screens.",
    lookFor: [
      "Organic growth and real retention",
      "A new behavior, not a new feature",
      "Taste, speed and relentless iteration",
    ],
  },
  {
    id: "frontier",
    title: "Frontier Technology",
    short: "Frontier",
    summary: "Robotics, energy, advanced manufacturing and space.",
    thesis:
      "Some of the most important problems are physical. We invest in hard technology where software, AI and new hardware combine to change what is possible, and where the outcome is measured at world scale.",
    lookFor: [
      "Breakthroughs with a path to commercial scale",
      "Founders with deep technical conviction",
      "Markets measured in industries, not niches",
    ],
  },
];

export const focusById = (id: FocusId) => FOCUS.find(item => item.id === id)!;

/** "01", "02"… in the order above. */
export const focusNumber = (id: FocusId) => String(FOCUS.findIndex(item => item.id === id) + 1).padStart(2, "0");
