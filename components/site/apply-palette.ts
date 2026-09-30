import { PALETTE_EVENT, PALETTE_STORAGE_KEY, type PaletteId } from "@/content/palettes";

/** Repaints the page, remembers the choice, and tells the toggle about it. */
export function applyPalette(id: PaletteId) {
  document.documentElement.dataset.palette = id;
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  } catch {
    // Without storage the choice lasts for this page only.
  }
  window.dispatchEvent(new CustomEvent(PALETTE_EVENT, { detail: id }));
}
