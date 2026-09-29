"use client";

import VideoWallHero from "@/app/components/industries/portfolios/VideoWallHero";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Portfolios & Personal Brands hero — a curved wall of looping videos with the
 * SIR_ wordmark and tagline over it.
 */
export default function PortfolioHero() {
  const t = useT();
  return <VideoWallHero tagline={t("Puts your work online.", "Pone tu trabajo en línea.")} />;
}
