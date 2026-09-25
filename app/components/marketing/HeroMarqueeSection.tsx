import SiteMarquee from "@/app/components/marketing/SiteMarquee";
import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * Strip under the Local Businesses closing statement — the same
 * auto-scrolling marquee of site mockups used on the Restaurants & Cafés
 * hero, giving a peek at real builds.
 *
 * `overflow: hidden` here isn't decorative — the marquee track inside is
 * intrinsically as wide as all its cards (`width: max-content`, needed for
 * the infinite-scroll animation). This section is a CSS Grid item sharing
 * `main.grid-container`'s single 1fr column with every other section on the
 * page, so without overflow:hidden zeroing out its automatic minimum size,
 * that track's width forces the whole grid column — and therefore every
 * section on the page — to widen to match it.
 */
export default function HeroMarqueeSection() {
  return (
    <section
      className="border-b"
      style={{ padding: "0 var(--pad)", overflow: "hidden" }}
    >
      <SiteMarquee />
      <div style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "var(--pad)" }}>
        <TransitionLink href="/work" className="btn-pill">
          View All Work <span aria-hidden="true">&nbsp;&rarr;</span>
        </TransitionLink>
      </div>
    </section>
  );
}
