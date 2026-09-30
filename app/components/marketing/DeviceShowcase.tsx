"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { TransitionLink } from "@/app/components/providers/PageTransition";
import { businessShowcase } from "@/app/components/marketing/showcaseMedia";
import { useT } from "@/app/components/providers/LanguageProvider";

const DeviceScene = dynamic(
  () => import("@/app/components/marketing/DeviceScene"),
  { ssr: false }
);

/**
 * "See it on every screen" — the business-type buttons sit beside its title in
 * BusinessShowcase on the homepage. Picking a type opens the 3D laptop and
 * phone below and plays a site for it on both. The scene (three.js + a 12MB model)
 * is loaded in the background once the page has finished loading and settled,
 * so the (heavy) setup never lands in the middle of the visitor's first scroll;
 * it also loads early if this section scrolls near first.
 */
export default function DeviceShowcase({
  selected,
  filters,
}: {
  selected: { slug: string; number: string; label: string; labelEs?: string } | null;
  /** The business-type buttons, shown beside the title. */
  filters?: React.ReactNode;
}) {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Warm the scene up shortly after the page has loaded, while the visitor is
  // still looking at the hero, instead of stalling the scroll later. It only
  // renders while on screen (DeviceScene pauses itself), so it's cheap to hold.
  useEffect(() => {
    let timer: number | undefined;
    let idle: number | undefined;
    const warm = () => {
      timer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idle = window.requestIdleCallback(() => setNear(true), {
            timeout: 4000,
          });
        } else {
          setNear(true);
        }
      }, 2500);
    };
    if (document.readyState === "complete") warm();
    else window.addEventListener("load", warm, { once: true });
    return () => {
      window.removeEventListener("load", warm);
      window.clearTimeout(timer);
      if (idle !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle);
      }
    };
  }, []);

  // A pick opened from higher up should load the scene even if it's still
  // far below the fold.
  const mount = near || selected !== null;
  // Stable between renders: the scene restarts its screens whenever this
  // changes, and zooming in re-renders this component.
  const slug = selected?.slug;
  const label = selected?.label;
  const selection = useMemo(() => {
    if (!slug || !label) return null;
    const media = businessShowcase[slug] ?? {};
    return { label, desktop: media.desktop, mobile: media.mobile, mobileZoom: media.mobileZoom };
  }, [slug, label]);

  return (
    <section
      ref={ref}
      id="showcase"
      className="device-showcase border-b"
      aria-label={t(
        "Website showcase on desktop and mobile",
        "Muestra del sitio web en escritorio y móvil"
      )}
    >
      <div className="device-showcase__caption pad-global">
        <div className="device-showcase__text">
          <div className="device-showcase__title">
            {t("Take a sneak peek.", "Échale un vistazo.")}
          </div>
          <div className="text-xs device-showcase__hint">
            {selected
              ? `${t(selected.label, selected.labelEs ?? selected.label)}. ${
                  focus
                    ? t(
                        "Tap the background to zoom back out.",
                        "Toca el fondo para alejar."
                      )
                    : t(
                        "Tap the laptop or phone to zoom in.",
                        "Toca la laptop o el teléfono para acercar."
                      )
                }`
              : t(
                  "Choose one and its website opens here, on desktop and on mobile.",
                  "Elige uno y su sitio web se abre aquí, en escritorio y en móvil."
                )}
          </div>
        </div>
        {filters}
      </div>
      <div id="showcase-stage" className="device-showcase__stage">
        {mount && <DeviceScene selection={selection} onFocusChange={setFocus} />}
        <TransitionLink href="/work" className="btn-pill device-showcase__cta">
          {t("View All Work", "Ver todo el trabajo")} <span aria-hidden="true">&nbsp;&rarr;</span>
        </TransitionLink>
      </div>
    </section>
  );
}
