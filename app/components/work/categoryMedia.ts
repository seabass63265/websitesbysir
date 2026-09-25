import type { Slide } from "@/app/components/marketing/WorkSlider";
import { generatedCategoryMedia } from "@/app/components/work/categoryMedia.generated";

/**
 * Generic placeholder slides — reuses the same clips in `public/work-slider/`
 * that back Sliders' "Featured" collection. Used for any category that
 * doesn't have real files yet, so the actual `WorkSlider` (not a static
 * "coming soon" box) renders everywhere.
 */
const placeholderSlides: Slide[] = Array.from({ length: 6 }, (_, i) => ({
  name: `Placeholder ${String(i + 1).padStart(2, "0")}`,
  img: `/work-slider/component-${String(i + 1).padStart(2, "0")}.mp4`,
}));

/**
 * Per-category media for every /work category that isn't already wired to
 * its own demo (Sliders has `sliderCollections.ts`, Mouse Effects has
 * `CircularGallery`). `generatedCategoryMedia` is rebuilt automatically
 * (see `scripts/generate-category-media.mjs`, run via `predev`/`prebuild`,
 * or `npm run generate:media`) from whatever image/video files sit in
 * `public/work/<category-slug>/` — drop files in, restart the dev server
 * (or rerun the script), and that category goes live with them. Falls back
 * to the generic placeholder set for any category still empty.
 */
export const categoryMedia: Record<string, Slide[]> = Object.fromEntries(
  Object.keys(generatedCategoryMedia).map((slug) => [
    slug,
    generatedCategoryMedia[slug].length > 0
      ? generatedCategoryMedia[slug]
      : placeholderSlides,
  ])
);
