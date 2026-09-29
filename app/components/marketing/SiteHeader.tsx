"use client";

import NavMenu from "@/app/components/marketing/NavMenu";
import { TransitionLink } from "@/app/components/providers/PageTransition";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Sticky site header — wordmark plus the fullscreen navigation menu, which is
 * opened by the fixed blob toggle NavMenu renders.
 */
export default function SiteHeader() {
  const t = useT();
  return (
    <>
      <header className="border-b pad-global text-sm">
        <TransitionLink href="/">SIR_</TransitionLink>
        <span className="site-header__tagline">
          {t("YOUR BUSINESS", "TU NEGOCIO")}
          <br />
          {t("BELONGS ONLINE", "PERTENECE EN LÍNEA")}
        </span>
      </header>
      <NavMenu />
    </>
  );
}
