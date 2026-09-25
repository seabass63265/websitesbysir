import SiteMarquee from "@/app/components/marketing/SiteMarquee";

/**
 * Nonprofits hero — the same blueprint card and auto-scrolling marquee as
 * the Restaurants & Cafés hero (shared `.rc-hero*` styles and SiteMarquee),
 * with the copy written for nonprofits. Server component.
 */
export default function NonprofitHero() {
  return (
    <section className="rc-hero border-b">
      <div className="rc-hero__card">
        <span className="rc-hero__eyebrow">For Causes &amp; Communities</span>
        <h1 className="rc-hero__title">
          Nonprofits
          <br />
          &amp; Organizations
        </h1>
        <p className="rc-hero__sub">
          Websites built to share your mission, grow your community, and
          inspire action.
        </p>
        <a href="#process" className="rc-hero__cta">
          See How It Works
        </a>
        <p className="rc-hero__note">Custom quotes. Concept to launch.</p>
      </div>

      <SiteMarquee />
    </section>
  );
}
