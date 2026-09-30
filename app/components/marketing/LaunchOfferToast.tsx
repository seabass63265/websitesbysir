"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";
import { useT } from "@/app/components/providers/LanguageProvider";
import { launchOfferClaimedKey } from "@/lib/launchOffer";

const DISMISS_PREFIX = "sir_promo_dismissed:";
const LANG_STORAGE_KEY = "sir_lang";
const LANG_CHANGE_EVENT = "sir:lang-change";
// Keep in sync with the .is-leaving animation duration in globals.css.
const CONFIRM_VISIBLE_MS = 6500;
const CONFIRM_EXIT_MS = 400;

/**
 * "Limited launch offer, save 10%" — a centered, blurred-backdrop modal for
 * the industry pages currently running the discount (same presentation as
 * LanguageToast). Clicking "Claim Your Discount" no longer scrolls to
 * pricing — it atomically claims one of 10 spots via /api/claim-discount.
 * Every page keyed here gets its own independent counter and its own
 * claimed/dismissed record (see lib/launchOffer.ts), so claiming or closing
 * the offer on one industry page has zero effect on any other page. A
 * claimed discount is remembered in localStorage so IntakeReview can show
 * it on the project review ("receipt") step, and it's sent along with the
 * final submission too.
 */
export default function LaunchOfferToast() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [confirm, setConfirm] = useState<{ claimed: boolean; leaving: boolean } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useSmoothScroll();

  const storageKey = `${DISMISS_PREFIX}${pathname ?? ""}`;
  const claimedKey = launchOfferClaimedKey(pathname);

  useEffect(() => {
    let alreadyClaimed = false;
    let alreadyDismissed = false;
    try {
      alreadyClaimed = localStorage.getItem(claimedKey) === "1";
      alreadyDismissed = sessionStorage.getItem(storageKey) === "1";
    } catch {
      // Ignore — private mode / blocked storage just means it shows every time.
    }
    if (alreadyClaimed || alreadyDismissed) {
      setDismissed(true);
      return;
    }

    let languageChosen = false;
    try {
      languageChosen = !!localStorage.getItem(LANG_STORAGE_KEY);
    } catch {
      languageChosen = true;
    }

    let cancelled = false;
    let showTimer: ReturnType<typeof setTimeout> | undefined;

    const checkAndShow = () => {
      showTimer = setTimeout(async () => {
        if (cancelled) return;
        // Don't bother opening the modal if the offer's already gone.
        try {
          const res = await fetch(`/api/claim-discount?page=${encodeURIComponent(pathname ?? "")}`);
          const data = (await res.json()) as { remaining: number };
          if (cancelled) return;
          if (data.remaining <= 0) {
            setDismissed(true);
            return;
          }
        } catch {
          // Can't confirm remaining spots — show it anyway; the actual
          // claim on click is still the real (atomic) check.
        }
        if (!cancelled) setOpen(true);
      }, 1200);
    };

    // First visit: let the language toast run its course before this one
    // shows, so the two modals never stack.
    if (languageChosen) {
      checkAndShow();
    } else {
      window.addEventListener(LANG_CHANGE_EVENT, checkAndShow, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener(LANG_CHANGE_EVENT, checkAndShow);
      clearTimeout(showTimer);
    };
  }, [storageKey, claimedKey, pathname]);

  // Lock page scroll while open, and focus the close button (same approach
  // as LanguageToast).
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 400);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lenis]);

  // Auto-hide the small confirmation toast.
  useEffect(() => {
    if (!confirm || confirm.leaving) return;
    const leave = setTimeout(() => setConfirm((c) => (c ? { ...c, leaving: true } : c)), CONFIRM_VISIBLE_MS);
    const done = setTimeout(() => setConfirm(null), CONFIRM_VISIBLE_MS + CONFIRM_EXIT_MS);
    return () => {
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, [confirm]);

  function dismiss() {
    setOpen(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // Ignore.
    }
  }

  async function claim() {
    if (claiming) return;
    setClaiming(true);
    let claimed = true;
    try {
      const res = await fetch("/api/claim-discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pathname }),
      });
      const data = (await res.json()) as { claimed: boolean };
      claimed = data.claimed;
    } catch {
      // Network hiccup — don't strand the visitor on a dead button; honor
      // the claim client-side the same way the API fails open.
      claimed = true;
    }
    if (claimed) {
      try {
        localStorage.setItem(claimedKey, "1");
      } catch {
        // Ignore.
      }
    }
    setClaiming(false);
    dismiss();
    setConfirm({ claimed, leaving: false });
  }

  return (
    <>
      {!dismissed && (
        <>
          <div
            className={open ? "promo-backdrop is-open" : "promo-backdrop"}
            aria-hidden="true"
            onClick={dismiss}
          />
          <div
            className={open ? "promo-modal is-open" : "promo-modal"}
            role="dialog"
            aria-modal="true"
            aria-label={t("Limited launch offer", "Oferta de lanzamiento limitada")}
            aria-hidden={!open}
          >
            <div className="promo-modal__panel">
              <button
                type="button"
                ref={closeRef}
                className="promo-modal__close"
                aria-label={t("Dismiss", "Cerrar")}
                tabIndex={open ? 0 : -1}
                onClick={dismiss}
              >
                ×
              </button>
              <div className="promo-modal__eyebrow">{t("Limited Time", "Tiempo Limitado")}</div>
              <h2 className="promo-modal__title">
                {t("Limited Launch Offer — Save 10%", "Oferta de Lanzamiento Limitada — Ahorra 10%")}
              </h2>
              <p className="promo-modal__body">
                {t(
                  "The next 10 projects receive 10% off their one-time website build.",
                  "Los próximos 10 proyectos reciben 10% de descuento en su desarrollo de sitio web de pago único."
                )}
              </p>
              <button
                type="button"
                className="promo-modal__cta"
                tabIndex={open ? 0 : -1}
                disabled={claiming}
                onClick={claim}
              >
                {claiming
                  ? t("Claiming…", "Reclamando…")
                  : t("Claim Your Discount", "Reclama Tu Descuento")}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </>
      )}

      {confirm && (
        <div className="promo-confirm-wrap" aria-live="polite">
          <div className={confirm.leaving ? "promo-confirm is-leaving" : "promo-confirm"}>
            {confirm.claimed
              ? t(
                  "Discount claimed! It'll be reflected in your project review.",
                  "¡Descuento reclamado! Se reflejará en la revisión de tu proyecto."
                )
              : t(
                  "Sorry — all 10 discount spots have already been claimed.",
                  "Lo sentimos — los 10 lugares de descuento ya fueron reclamados."
                )}
          </div>
        </div>
      )}
    </>
  );
}
