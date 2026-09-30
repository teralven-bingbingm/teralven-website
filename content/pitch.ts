/**
 * The pitch page (/pitch): its words, and the choices its form offers. The form's fields
 * follow what founders are asked most often by venture firms that take pitches directly
 * (who you are, the company, the round, the story), kept short enough to finish in minutes.
 * Required fields are marked in components/pitch/pitch-form.tsx.
 */

export const PITCH = {
  kicker: "Pitch",
  title: "Tell us what|*you're building.*",
  lede: "We read every pitch. Share the essentials, and if there is a fit, we will reach out to set up a first conversation.",
  lookFor: [
    "Founders with an unusual insight into their market",
    "Products that get better with every customer",
    "The ambition to build an enduring company",
  ],
  next: [
    { title: "We read it", text: "Every submission is read by our team, whatever the stage." },
    { title: "We reach out", text: "If there is a fit with our focus areas, we contact you to set up a first conversation." },
    { title: "We meet", text: "A first conversation with a partner: your story, your product and what you need from an investor." },
  ],
  early: "Not raising yet? Tell us anyway. We like to meet founders early.",
  intro: "Warm introductions are always welcome, from a founder we have backed or anyone who knows us.",
  note: "Please don't include confidential information. We don't sign NDAs at a first conversation, and we may be looking at companies with similar ideas.",
};

export const STAGE_OPTIONS = ["Idea or pre-product", "Pre-seed", "Seed", "Series A", "Series B or later"];

export const RAISING_OPTIONS = ["Raising now", "Raising in the next 6 months", "Not raising yet"];

export const SOURCE_OPTIONS = [
  "An introduction from someone we know",
  "A founder we have backed",
  "LinkedIn",
  "X (Twitter)",
  "An article or podcast",
  "Search",
  "Other",
];

/** The general contact form's topics (/contact). Pitches have their own page. */
export const TOPIC_OPTIONS = ["General", "Press and media", "Investor relations", "Careers", "Other"];
