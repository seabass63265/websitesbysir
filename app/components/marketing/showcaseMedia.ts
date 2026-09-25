/**
 * What the device showcase plays on the MacBook and iPhone screens for each
 * business type in `businessCategories` (keyed by its slug). `desktop` is a
 * wide recording for the laptop, `mobile` a portrait one for the phone. A
 * missing entry (or a missing side of one) shows a "coming soon" screen, so
 * adding a site later is just dropping the files in /public and listing them.
 *
 * The current entries are stand-ins from past work: the swim-school site for
 * Professional Services, the student consulting group for Marketing &
 * Creative Agency, and the St. Carlo Acutis foundation site for Nonprofit.
 * Swap them freely.
 */
export type ShowcaseMedia = {
  /** Path under /public, e.g. "/seabassaq1.mp4". */
  desktop?: string;
  mobile?: string;
};

export const businessShowcase: Record<string, ShowcaseMedia> = {
  "professional-services": {
    desktop: "/seabassaq1.mp4",
    mobile: "/seabassaq1mobile.mp4",
  },
  "marketing-agency": {
    desktop: "/lmuccg9.mp4",
  },
  nonprofit: {
    desktop: "/carlo2.mp4",
    mobile: "/carlomobile.mp4",
  },
};
