"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";
import SectionNav from "@/app/components/industries/SectionNav";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Startups header — wordmark, page breadcrumb, inline section nav
 * (scroll-spy highlighted, see SectionNav), and the fullscreen blob menu.
 * Mirrors RestaurantsHeader's structure. Sticky via the site-wide `header`
 * rule in globals.css.
 */
export default function StartupHeader() {
  const t = useT();
  const navLinks = [
    { label: t("01 — Process", "01 — Proceso"), href: "#process" },
    { label: t("02 — Capabilities", "02 — Capacidades"), href: "#capabilities" },
    { label: t("03 — Connect Your Tools", "03 — Conecta tus Herramientas"), href: "#platforms" },
    { label: t("04 — Pricing", "04 — Precios"), href: "#pricing" },
    { label: t("05 — Contact", "05 — Contacto"), href: "#contact" },
  ];

  const menuLinks = [
    { num: "I", label: t("Process", "Proceso"), href: "#process" },
    { num: "II", label: t("Capabilities", "Capacidades"), href: "#capabilities" },
    { num: "III", label: t("Connect Your Tools", "Conecta tus Herramientas"), href: "#platforms" },
    { num: "IV", label: t("Pricing", "Precios"), href: "#pricing" },
    { num: "V", label: t("Contact", "Contacto"), href: "#contact" },
  ];

  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>{t("Startups", "Startups")}</span>
        </div>
        <SectionNav links={navLinks} />
      </header>
      <NavMenu
        primaryLinks={menuLinks}
        secondaryTop={[]}
        secondaryBottom={[]}
        compact
      />
    </>
  );
}
