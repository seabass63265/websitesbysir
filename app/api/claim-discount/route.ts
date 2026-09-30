import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import { normalizeLaunchOfferPage } from "@/lib/launchOffer";

/**
 * Backs the "Limited Launch Offer — Save 10%" promo (LaunchOfferToast).
 * Each industry page gets its own KV counter (keyed by pathname), so the
 * 10-claim cap is enforced atomically per page, across every visitor — not
 * just per browser, and not shared across pages. `POST` is the only
 * mutating call (one atomic `incr` per click); `GET` is a read-only check
 * so a page that loads after its offer is gone doesn't show it at all.
 *
 * Fails open if KV isn't linked on this project (same fallback pattern as
 * the submissions counter in /api/contact): the offer still works, it just
 * isn't hard-capped without a store configured.
 */
const LIMIT = 10;

function counterKey(page: string | null): string {
  return `promo:launch10:${normalizeLaunchOfferPage(page)}`;
}

export async function GET(request: Request) {
  const page = new URL(request.url).searchParams.get("page");
  try {
    const claimed = (await kv.get<number>(counterKey(page))) ?? 0;
    return NextResponse.json({ remaining: Math.max(LIMIT - claimed, 0), limit: LIMIT });
  } catch {
    return NextResponse.json({ remaining: LIMIT, limit: LIMIT });
  }
}

export async function POST(request: Request) {
  const { page } = (await request.json().catch(() => ({}))) as { page?: string };
  try {
    const next = await kv.incr(counterKey(page ?? null));
    if (next <= LIMIT) {
      return NextResponse.json({ claimed: true, remaining: LIMIT - next });
    }
    return NextResponse.json({ claimed: false, remaining: 0 });
  } catch {
    // No KV store linked — let the claim through rather than block the offer.
    return NextResponse.json({ claimed: true, remaining: null });
  }
}
