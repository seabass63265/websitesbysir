"use client";

import SiteMarquee from "@/app/components/marketing/SiteMarquee";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Nonprofits hero — the same blueprint card and auto-scrolling marquee as
 * the Restaurants & Cafés hero (shared `.rc-hero*` styles and SiteMarquee),
 * with the copy written for nonprofits.
 */
export default function NonprofitHero() {
  const t = useT();
  return (
    <section className="rc-hero border-b">
      <div className="rc-hero__card">
        <span className="rc-hero__eyebrow">{t("For Causes & Communities", "Para Causas y Comunidades")}</span>
        <h1 className="rc-hero__title">
          {t("Nonprofits", "Organizaciones")}
          <br />
          {t("& Organizations", "sin Fines de Lucro")}
        </h1>
        <p className="rc-hero__sub">
          {t(
            "Websites built to share your mission, grow your community, and inspire action.",
            "Sitios web construidos para compartir tu misión, hacer crecer tu comunidad, e inspirar acción."
          )}
        </p>
        <a href="#process" className="rc-hero__cta">
          {t("See How It Works", "Ve Cómo Funciona")}
        </a>
        <p className="rc-hero__note">{t("Custom quotes. Concept to launch.", "Cotizaciones personalizadas. Del concepto al lanzamiento.")}</p>
      </div>

      <SiteMarquee />
    </section>
  );
}
