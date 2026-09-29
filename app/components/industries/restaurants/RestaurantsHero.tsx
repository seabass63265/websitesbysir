"use client";

import SiteMarquee from "@/app/components/marketing/SiteMarquee";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Restaurants & Cafés hero — a centered blueprint card floating on a grid
 * field, with an auto-scrolling marquee of café-site mockups beneath.
 * Ported from the "Websites For Business" hero, re-themed for hospitality
 * and mapped onto the SIR_ tokens (navy ink, white ground, Anton display).
 * The marquee scroll and hover-pause are pure CSS.
 */
export default function RestaurantsHero() {
  const t = useT();
  return (
    <section className="rc-hero border-b">
      <div className="rc-hero__card">
        <span className="rc-hero__eyebrow">{t("For Hospitality", "Para Hospitalidad")}</span>
        <h1 className="rc-hero__title">
          {t("Restaurants", "Restaurantes")}
          <br />
          {t("& Cafés", "y Cafés")}
        </h1>
        <p className="rc-hero__sub">
          {t(
            "Custom websites built around your menu, your brand, and your guest experience.",
            "Sitios web personalizados construidos alrededor de tu menú, tu marca, y la experiencia de tus clientes."
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
