import type { FocusId } from "./focus";

/**
 * The team. While this list is empty, the Team page and its links stay hidden; add a person and
 * they appear everywhere. Each entry takes a real name, role, bio, focus areas and LinkedIn. A
 * `photo` is a square picture in public/team/ (for example "/team/jane-doe.jpg"); without one,
 * the card shows initials. For example:
 *
 *   { name: "Jane Doe", role: "Founding Partner", bio: "…", focus: ["ai", "media"], linkedin: "https://www.linkedin.com/in/…" }
 */

export type Member = {
  name: string;
  role: string;
  bio: string;
  focus: FocusId[];
  photo?: string;
  linkedin?: string;
};

export const TEAM: Member[] = [];

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? "")
    .join("");
