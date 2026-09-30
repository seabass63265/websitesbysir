"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import WorkSlider, { type Slide } from "@/app/components/marketing/WorkSlider";
import SliderContent from "@/app/components/work/SliderContent";
import MediaLightbox from "@/app/components/work/MediaLightbox";
import { PlaceholderDemo } from "@/app/components/work/CategorySection";
import { ALL_FEATURES_SLUG, workCategories } from "@/app/components/work/categories";
import { sliderCollections } from "@/app/components/work/sliderCollections";
import { categoryMedia } from "@/app/components/work/categoryMedia";
import { businessShowcase } from "@/app/components/marketing/showcaseMedia";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";
import {
  ALL_BUSINESSES_SLUG,
  businessCategories,
} from "@/app/components/work/businessCategories";
import { useT } from "@/app/components/providers/LanguageProvider";

/** How long the outgoing slider fades before the next one mounts. */
const LEAVE_MS = 350;

/**
 * `categoryMedia`'s slide names are auto-generated in English only
 * ("Grid Animations 01", or "Placeholder 01" for categories still waiting
 * on real files — see categoryMedia.ts/categoryMedia.generated.ts). Swap
 * the English prefix for its translation so the slider's on-screen title
 * (WorkSlider sets it as plain textContent, not through `t()`) matches the
 * selected language instead of always showing the generated English name.
 */
const PLACEHOLDER_NAME_EN = "Placeholder";
const PLACEHOLDER_NAME_ES = "Marcador";
function localizeSlideName(
  name: string,
  category: { title: string; titleEs: string },
  t: (en: string, es: string) => string
) {
  // Every generated/placeholder name is "<prefix> <NN>" — split off the
  // trailing number and swap whatever's left (the humanized-from-slug
  // title, which may differ from `category.title` in case/punctuation, e.g.
  // "3d Animation" vs "3D Animation", or "Webgl Threejs Effects" vs
  // "Webgl & ThreeJS Effects") for the translated title wholesale.
  const numberMatch = name.match(/\s*\d+$/);
  const suffix = numberMatch ? numberMatch[0] : "";
  const prefix = numberMatch ? name.slice(0, -suffix.length) : name;
  if (prefix.trim().toLowerCase() === PLACEHOLDER_NAME_EN.toLowerCase()) {
    return t(PLACEHOLDER_NAME_EN, PLACEHOLDER_NAME_ES) + suffix;
  }
  return t(category.title, category.titleEs) + suffix;
}

/**
 * /work's category picker — one filter bar covering all 14 categories,
 * floated as a compact overlay in the top-left corner of the content pane
 * (like the slider's own title/counter overlay) instead of sitting in its
 * own white strip above it. "Sliders" always shows its "Featured" set —
 * no in-page picker for the other (still-empty) collections.
 *
 * Every category besides Sliders (which has its own dedicated collection
 * picker) shares the same `WorkSlider` structure via `categoryMedia.ts` —
 * a `{ name, img }[]` per category, empty until real images/videos are
 * uploaded. While empty, `PlaceholderDemo` renders instead; populating a
 * category's array is enough to swap it for a live slider, no other
 * wiring needed.
 *
 * The page is meant to be locked to one screen: scrolling should only ever
 * drive the slider's own internal wheel handling, never the page itself.
 * The site-wide Lenis instance intercepts wheel events at `window` before
 * the slider's own `preventDefault` can stop them, so it's paused for as
 * long as this page is mounted. Once stopped, Lenis also stops calling
 * `preventDefault()` itself, handing wheel input back to native scroll —
 * which scrolls `<html>` (the document's scrolling element), not `<body>` —
 * so `overflow: hidden` is set on both, and everything is restored on
 * unmount.
 *
 * The Browse By toggle switches between category and business-type options.
 * A business type with real media in showcaseMedia.ts plays it the same way
 * (its desktop/mobile recordings become WorkSlider slides); one without
 * shows the same "coming soon" placeholder as its filter pill.
 */
export default function WorkShowcase() {
  const t = useT();
  const [browseBy, setBrowseBy] = useState<"category" | "business">("category");
  const [activeSlug, setActiveSlug] = useState(workCategories[0].slug);
  const [activeBusinessSlug, setActiveBusinessSlug] = useState(
    ALL_BUSINESSES_SLUG
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  // `activeSlug` is what the picker says; `shownSlug` is what's on screen. On
  // a change the old slider fades out first, then the new one mounts, fades
  // in and glides into place, so switching never hard-cuts.
  const [shownSlug, setShownSlug] = useState(workCategories[0].slug);
  const [leaving, setLeaving] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [lightboxSlide, setLightboxSlide] = useState<Slide | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lenis = useSmoothScroll();

  useEffect(() => () => clearTimeout(swapTimer.current), []);

  function selectCategory(slug: string) {
    setActiveSlug(slug);
    setFiltersOpen(false);
    if (slug === shownSlug && !leaving) return;
    setLeaving(true);
    clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => {
      setShownSlug(slug);
      setSwitched(true);
      setLeaving(false);
    }, LEAVE_MS);
  }

  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      lenis.start();
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [lenis]);

  const activeIsAllFeatures = activeSlug === ALL_FEATURES_SLUG;
  const shownIsAllFeatures = shownSlug === ALL_FEATURES_SLUG;
  const active = activeIsAllFeatures
    ? null
    : workCategories.find((category) => category.slug === activeSlug) ?? workCategories[0];
  const shown = shownIsAllFeatures
    ? null
    : workCategories.find((category) => category.slug === shownSlug) ?? workCategories[0];
  const activeBusiness = businessCategories.find(
    (category) => category.slug === activeBusinessSlug
  );
  const allFeaturesLabel = t("All Features", "Todas las Funciones");
  const allBusinessesLabel = t("All Businesses", "Todos los Negocios");
  const currentLabel =
    browseBy === "category"
      ? activeIsAllFeatures
        ? allFeaturesLabel
        : t(active!.title, active!.titleEs)
      : activeBusinessSlug === ALL_BUSINESSES_SLUG
      ? allBusinessesLabel
      : (activeBusiness && t(activeBusiness.label, activeBusiness.labelEs)) ?? allBusinessesLabel;
  // "All Features" pools every category's slides (real uploads or their
  // placeholder fallback) into one slider — "Sliders" is skipped since it's
  // a different component/data source (sliderCollections), not categoryMedia.
  const allFeatureSlides: Slide[] = useMemo(() => {
    const slides: Slide[] = [];
    for (const category of workCategories) {
      if (category.slug === "sliders") continue;
      const media = categoryMedia[category.slug];
      if (media?.length) {
        slides.push(
          ...media.map((slide) => ({
            ...slide,
            name: localizeSlideName(slide.name, category, t),
          }))
        );
      }
    }
    return slides;
  }, [t]);
  const shownSlides: Slide[] = useMemo(() => {
    if (!shown) return [];
    const media = categoryMedia[shown.slug];
    if (!media?.length) return [];
    return media.map((slide) => ({
      ...slide,
      name: localizeSlideName(slide.name, shown, t),
    }));
  }, [shown, t]);
  // When browsing by business, the main stage should reflect whichever
  // business is selected instead of whatever feature slider was left
  // showing before switching tabs: its real desktop/mobile recordings as
  // scrollable slides (same WorkSlider used for feature categories) when it
  // has them, or the same "coming soon" placeholder its filter pill shows
  // when it doesn't. "All Businesses" pools every category's real
  // recordings into one slider instead of picking just one.
  const activeBusinessMedia = activeBusiness && businessShowcase[activeBusiness.slug];
  const businessLabel = activeBusiness
    ? t(activeBusiness.label, activeBusiness.labelEs)
    : currentLabel;
  // Desktop recordings only — the mobile ones are for the homepage device
  // showcase's phone screen, not this slider.
  const allBusinessSlides: Slide[] = useMemo(() => {
    const slides: Slide[] = [];
    for (const category of businessCategories) {
      const media = businessShowcase[category.slug];
      if (media?.desktop) {
        slides.push({ name: t(category.label, category.labelEs), img: media.desktop });
      }
    }
    return slides;
  }, [t]);
  const businessSlides: Slide[] = useMemo(() => {
    if (activeBusinessSlug === ALL_BUSINESSES_SLUG) return allBusinessSlides;
    if (!activeBusinessMedia?.desktop) return [];
    return [{ name: businessLabel, img: activeBusinessMedia.desktop }];
  }, [activeBusinessSlug, allBusinessSlides, activeBusinessMedia, businessLabel]);
  const showingBusiness = browseBy === "business";

  return (
    <section className="border-b work-showcase">
      <div
        className={`demo-filter-overlay${
          filtersOpen ? " is-open" : ""
        }`}
      >
        <button
          type="button"
          className="demo-filter-overlay__toggle"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
        >
          <span className="text-sm demo-filter-overlay__label">
            {t("Browse By", "Explorar Por")}
          </span>
          <span className="text-sm demo-filter-overlay__current">
            {currentLabel}
          </span>
          <svg
            className="demo-filter-overlay__chevron"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="demo-filter-overlay__body">
          <div className="demo-filter-overlay__body-inner">
            <div className="demo-filter-toggle" role="group" aria-label={t("Browse by", "Explorar por")}>
              <button type="button" className={`pill-tag filter-tag${browseBy === "category" ? " is-selected" : ""}`} aria-pressed={browseBy === "category"} onClick={() => { setBrowseBy("category"); setFiltersOpen(false); }}>
                {t("Website Feature", "Función del Sitio Web")}
              </button>
              <button type="button" className={`pill-tag filter-tag${browseBy === "business" ? " is-selected" : ""}`} aria-pressed={browseBy === "business"} onClick={() => { setBrowseBy("business"); setFiltersOpen(false); }}>
                {t("Business Type", "Tipo de Negocio")}
              </button>
            </div>
            {browseBy === "category" ? <div className="filter-bar">
              <button
                type="button"
                onClick={() => selectCategory(ALL_FEATURES_SLUG)}
                className={
                  activeSlug === ALL_FEATURES_SLUG
                    ? "pill-tag filter-tag is-selected"
                    : "pill-tag filter-tag"
                }
                aria-pressed={activeSlug === ALL_FEATURES_SLUG}
              >
                {allFeaturesLabel}
              </button>
              {workCategories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => selectCategory(category.slug)}
                  className={
                    category.slug === activeSlug
                      ? "pill-tag filter-tag is-selected"
                      : "pill-tag filter-tag"
                  }
                  aria-pressed={category.slug === activeSlug}
                >
                  {category.number} &mdash; {t(category.title, category.titleEs)}
                </button>
              ))}
            </div> : <div className="filter-bar">
              <button
                type="button"
                onClick={() => {
                  setActiveBusinessSlug(ALL_BUSINESSES_SLUG);
                  setFiltersOpen(false);
                }}
                className={
                  activeBusinessSlug === ALL_BUSINESSES_SLUG
                    ? "pill-tag filter-tag is-selected"
                    : "pill-tag filter-tag"
                }
                aria-pressed={activeBusinessSlug === ALL_BUSINESSES_SLUG}
              >
                {allBusinessesLabel}
              </button>
              {businessCategories.map((category) => {
                const media = businessShowcase[category.slug];
                const hasDemo = Boolean(media?.desktop || media?.mobile);
                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => {
                      setActiveBusinessSlug(category.slug);
                      setFiltersOpen(false);
                    }}
                    className={
                      category.slug === activeBusinessSlug
                        ? "pill-tag filter-tag is-selected"
                        : "pill-tag filter-tag"
                    }
                    aria-pressed={category.slug === activeBusinessSlug}
                  >
                    {category.number} &mdash; {t(category.label, category.labelEs)}
                    {!hasDemo && (
                      <span className="filter-tag__soon">
                        {" "}
                        &mdash; {t("Coming Soon", "Próximamente")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>}
          </div>
        </div>
      </div>

      {showingBusiness ? (
        <div key={`business-${activeBusinessSlug}`} className="work-stage">
          {businessSlides.length > 0 ? (
            <WorkSlider slides={businessSlides} glideIn onSlideClick={setLightboxSlide} />
          ) : (
            <PlaceholderDemo title={businessLabel} />
          )}
        </div>
      ) : shownIsAllFeatures ? (
        <div key="feature-all" className="work-stage">
          <WorkSlider slides={allFeatureSlides} glideIn onSlideClick={setLightboxSlide} />
        </div>
      ) : (
        <div
          key={shownSlug}
          className={`work-stage${switched ? " is-entering" : ""}${leaving ? " is-leaving" : ""}`}
        >
          {shown!.slug === "sliders" ? (
            <SliderContent
              collectionId={sliderCollections[0].id}
              glideIn={switched}
              onSlideClick={setLightboxSlide}
            />
          ) : shownSlides.length > 0 ? (
            <WorkSlider
              slides={shownSlides}
              glideIn={switched}
              onSlideClick={setLightboxSlide}
            />
          ) : (
            <PlaceholderDemo title={t(shown!.title, shown!.titleEs)} />
          )}
        </div>
      )}

      <MediaLightbox slide={lightboxSlide} onClose={() => setLightboxSlide(null)} />
    </section>
  );
}
