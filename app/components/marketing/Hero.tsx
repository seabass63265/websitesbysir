"use client";

import CircularGallery from "@/app/components/marketing/CircularGallery";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Landing hero — the circular image gallery doubles as the hero visual,
 * with the headline/intro set centered in the ring instead of sitting in
 * its own section above it (see `.circular-gallery__hero-*` in globals.css
 * for the cut-down sizing that keeps it clear of the orbiting images).
 */
export default function Hero() {
  const t = useT();
  return (
    <CircularGallery hideCta>
      <h1 className="circular-gallery__hero-heading">
        {t("Websites", "Sitios Web")}
        <br />
        {t("For", "Para")}
        <br />
        {t("Business", "Negocios")}
      </h1>
      <div className="circular-gallery__hero-text">
        {t(
          "Custom websites for businesses at every stage and budget.",
          "Sitios web personalizados para negocios en cada etapa y presupuesto."
        )}
        <br />
        {t("We put your business online.", "Ponemos tu negocio en línea.")}
        <br />
        {t("Founded by", "Fundado por")}{" "}
        <strong>S</strong>ebastian <strong>I</strong>.{" "}
        <strong>R</strong>ocha.{" "}
        {t("Designed and developed by", "Diseñado y desarrollado por")}{" "}
        <strong>SIR</strong>.
      </div>
      <div className="circular-gallery__hero-location">Los Angeles, CA</div>
      <a href="#services" className="btn-pill circular-gallery__hero-cta">
        {t("Let's Start", "Comencemos")}{" "}
        <span aria-hidden="true">&nbsp;&rarr;</span>
      </a>
    </CircularGallery>
  );
}
