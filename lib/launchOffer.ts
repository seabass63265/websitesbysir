/**
 * Shared config for the "Limited Launch Offer — Save 10%" promo
 * (LaunchOfferToast, IntakeReview, IntakeForm, and the /api/claim-discount
 * route). Each page below gets its own independent 10-spot pool and its own
 * "have I claimed this?" record — claiming (or dismissing) the offer on one
 * industry page has no effect on any other page.
 */
export const LAUNCH_OFFER_PAGES = [
  "/industries/restaurants-and-cafes",
  "/industries/local-businesses",
  "/industries/portfolios-and-personal-brands",
  "/industries/startups",
  "/industries/nonprofits",
] as const;

export type LaunchOfferPage = (typeof LAUNCH_OFFER_PAGES)[number];

/** Collapses anything unrecognized to one shared bucket, so a bad/missing
 * `page` value can't be used to mint arbitrary KV keys. */
export function normalizeLaunchOfferPage(page: string | null | undefined): string {
  if (page && (LAUNCH_OFFER_PAGES as readonly string[]).includes(page)) return page;
  return "other";
}

const CLAIMED_PREFIX = "sir_promo_claimed:";

/** The localStorage key a given page's claim is recorded under. */
export function launchOfferClaimedKey(pathname: string | null | undefined): string {
  return `${CLAIMED_PREFIX}${pathname ?? ""}`;
}
