"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useT } from "@/app/components/providers/LanguageProvider";

const DISMISS_PREFIX = "sir_promo_dismissed:";

/**
 * Small corner promo — "Limited launch offer, save 10%" — for the industry
 * pages currently running the discount. Slides in a beat after mount, links
 * straight to that page's pricing section, and can be dismissed; the
 * dismissal is remembered per page for the rest of the browser session
 * (sessionStorage) so closing it doesn't make it vanish for good, but it
 * also doesn't nag on every scroll.
 *
 * Sits at a lower z-index than the fullscreen nav (.menu, z-index 130), so
 * opening the nav covers it rather than floating on top of the menu.
 */
export default function LaunchOfferToast({
  ctaHref = "#pricing",
}: {
  /** Anchor the "Claim your discount" link scrolls to. */
  ctaHref?: string;
}) {
  const t = useT();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const storageKey = `${DISMISS_PREFIX}${pathname ?? ""}`;

  useEffect(() => {
    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(storageKey) === "1";
    } catch {
      // Ignore — private mode / blocked storage just means it shows every time.
    }
    if (alreadyDismissed) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(timer);
  }, [storageKey]);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Ignore.
    }
  }

  if (dismissed) return null;

  return (
    <div
      className={visible ? "promo-toast is-open" : "promo-toast"}
      role="status"
    >
      <button
        type="button"
        className="promo-toast__close"
        aria-label={t("Dismiss", "Cerrar")}
        onClick={dismiss}
      >
        ×
      </button>
      <div className="promo-toast__title">
        {t("Limited Launch Offer — Save 10%", "Oferta de Lanzamiento Limitada — Ahorra 10%")}
      </div>
      <p className="promo-toast__body">
        {t(
          "The next 10 projects receive 10% off their one-time website build.",
          "Los próximos 10 proyectos reciben 10% de descuento en su desarrollo de sitio web de pago único."
        )}
      </p>
      <a href={ctaHref} className="promo-toast__cta" onClick={dismiss}>
        {t("Claim Your Discount", "Reclama Tu Descuento")}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
