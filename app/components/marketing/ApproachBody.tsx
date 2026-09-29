"use client";

import SiteHeader from "@/app/components/marketing/SiteHeader";
import CircularGallery from "@/app/components/marketing/CircularGallery";
import ProcessSection from "@/app/components/marketing/ProcessSection";
import BeforeAfterSplit from "@/app/components/marketing/BeforeAfterSplit";
import TestimonialsDeck from "@/app/components/marketing/TestimonialsDeck";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * /approach page body, split out from the server shell (which keeps the
 * static `metadata` export) so the copy here can switch language live.
 */
export default function ApproachBody() {
  const t = useT();
  return (
    <>
      <SiteHeader />
      <main className="grid-container">
        <CircularGallery tagline={t("The Process", "El Proceso")} />
        <ProcessSection />
        <BeforeAfterSplit />
        <TestimonialsDeck />
      </main>
    </>
  );
}
