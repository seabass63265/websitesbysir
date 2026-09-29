"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * /contact header — wordmark plus a "/ Contact" page breadcrumb, matching
 * the other pages' headers, with the standard fullscreen blob menu.
 */
export default function ContactHeader() {
  const t = useT();
  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <span>{t("Contact", "Contacto")}</span>
        </div>
      </header>
      <NavMenu />
    </>
  );
}
