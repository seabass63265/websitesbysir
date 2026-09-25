/**
 * Shared helpers for the two scroll-driven Startups heroes (CylinderHero and
 * SkyscraperHero), ported from the Codrops "cinematic scroll animations"
 * demos (`cinematic-scroll-animations-main`).
 */

export type TextPosition =
  | "top"
  | "top-left"
  | "left"
  | "right"
  | "center"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

/** The sticky site header's height, so a pinned hero can sit right under it. */
export function headerHeight(): number {
  const value = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--header-height")
  );
  return Number.isFinite(value) ? value : 86;
}
