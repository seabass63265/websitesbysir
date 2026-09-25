import SiteMarquee from "@/app/components/marketing/SiteMarquee";

/**
 * Restaurants & Cafés hero — a centered blueprint card floating on a grid
 * field, with an auto-scrolling marquee of café-site mockups beneath.
 * Ported from the "Websites For Business" hero, re-themed for hospitality
 * and mapped onto the SIR_ tokens (navy ink, white ground, Anton display).
 * Server component — the marquee scroll and hover-pause are pure CSS.
 */
export default function RestaurantsHero() {
  return (
    <section className="rc-hero border-b">
      <div className="rc-hero__card">
        <span className="rc-hero__eyebrow">For Hospitality</span>
        <h1 className="rc-hero__title">
          Restaurants
          <br />
          &amp; Cafés
        </h1>
        <p className="rc-hero__sub">
          Custom websites built around your menu, your brand, and your guest
          experience.
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
