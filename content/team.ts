import type { FocusId } from "./focus";

/**
 * The team. TODO: these three entries are placeholders — replace each one with a real person
 * (name, role, bio, focus areas and LinkedIn), or delete it. A `photo` is a square picture in
 * public/team/ (for example "/team/jane-doe.jpg"); without one, the card shows initials.
 */

export type Member = {
  name: string;
  role: string;
  bio: string;
  focus: FocusId[];
  photo?: string;
  linkedin?: string;
};

export const TEAM: Member[] = [
  {
    name: "Partner Name",
    role: "Founding Partner",
    bio: "A short biography: operating background, previous investments and the areas this partner leads for the firm.",
    focus: ["ai", "media"],
  },
  {
    name: "Partner Name",
    role: "Partner",
    bio: "A short biography: operating background, previous investments and the areas this partner leads for the firm.",
    focus: ["enterprise", "fintech"],
  },
  {
    name: "Principal Name",
    role: "Principal",
    bio: "A short biography: operating background, previous investments and the areas this person covers for the firm.",
    focus: ["health", "consumer", "frontier"],
  },
];

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? "")
    .join("");
