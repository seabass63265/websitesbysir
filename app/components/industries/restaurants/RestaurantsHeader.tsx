"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";
import SectionNav from "@/app/components/industries/SectionNav";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Industry-page header — wordmark, page breadcrumb, inline section nav,
 * and a "Menu" link. Distinct from the marketing <SiteHeader> (which
 * drives the fullscreen blob menu); this page carries its own visible
 * nav as in the design. Nav labels mirror the page's own numbered
 * sections (01–04) plus Contact. In-page anchors are smooth-scrolled by
 * the shared Lenis provider.
 */
export default function RestaurantsHeader() {
  const t = useT();
  const navLinks = [
    { label: t("01 — Process", "01 — Proceso"), href: "#process" },
    { label: t("02 — Pages", "02 — Páginas"), href: "#capabilities" },
    { label: t("03 — Connect Your Tools", "03 — Conecta tus Herramientas"), href: "#tools" },
    { label: t("04 — Pricing", "04 — Precios"), href: "#pricing" },
    { label: t("05 — Contact", "05 — Contacto"), href: "#contact" },
  ];

  const menuLinks = [
    { num: "I", label: t("Process", "Proceso"), href: "#process" },
    { num: "II", label: t("Pages", "Páginas"), href: "#capabilities" },
    { num: "III", label: t("Connect Your Tools", "Conecta tus Herramientas"), href: "#tools" },
    { num: "IV", label: t("Pricing", "Precios"), href: "#pricing" },
    { num: "V", label: t("Contact", "Contacto"), href: "#contact" },
  ];

  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>{t("Restaurants & Cafés", "Restaurantes y Cafés")}</span>
        </div>
        <SectionNav links={navLinks} />
      </header>
      <NavMenu primaryLinks={menuLinks} secondaryTop={[]} secondaryBottom={[]} />
    </>
  );
}
