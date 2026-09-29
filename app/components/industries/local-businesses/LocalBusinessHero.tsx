"use client";

import CircularGallery from "@/app/components/marketing/CircularGallery";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Local Businesses hero — just the circular image gallery (same component
 * as the homepage's, with its own tagline), no separate title/intro block.
 */
export default function LocalBusinessHero() {
  const t = useT();
  return (
    <CircularGallery
      tagline={t("Puts your business online.", "Pone tu negocio en línea.")}
      ovalWidthRatio={0.36}
      // ~28% shorter than a full screen. The ring's vertical radius is a
      // fraction of the field height, so it's raised (0.29 → 0.31) to keep the
      // ring from flattening too much while the frames stay clear of the edges.
      fieldHeight="72vh"
      ovalHeightRatio={0.31}
    />
  );
}
