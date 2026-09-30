/**
 * The site's colour, in two modes: night (the default) and day, switched with the toggle in
 * the bar. Each is a set of tokens in app/globals.css (:root for night,
 * :root[data-palette="day"] for day); a visitor's choice is remembered.
 */

export const PALETTES = ["night", "day"] as const;

export type PaletteId = (typeof PALETTES)[number];

/** What a first visit sees. */
export const PALETTE: PaletteId = "night";

/** Where a visitor's choice is kept. */
export const PALETTE_STORAGE_KEY = "teralven-palette";

/** Sent on window whenever the palette changes, so the toggle always shows the current one. */
export const PALETTE_EVENT = "teralven:palette";
