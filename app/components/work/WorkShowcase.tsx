"use client";

import { useEffect, useRef, useState } from "react";
import WorkSlider from "@/app/components/marketing/WorkSlider";
import SliderContent from "@/app/components/work/SliderContent";
import { PlaceholderDemo } from "@/app/components/work/CategorySection";
import { workCategories } from "@/app/components/work/categories";
import { sliderCollections } from "@/app/components/work/sliderCollections";
import { categoryMedia } from "@/app/components/work/categoryMedia";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";
import {
  ALL_BUSINESSES_SLUG,
  businessCategories,
} from "@/app/components/work/businessCategories";

/** How long the outgoing slider fades before the next one mounts. */
const LEAVE_MS = 350;

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
 * Business selections remain local until media is assigned business types.
 */
export default function WorkShowcase() {
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

  const active =
    workCategories.find((category) => category.slug === activeSlug) ??
    workCategories[0];
  const shown =
    workCategories.find((category) => category.slug === shownSlug) ??
    workCategories[0];
  const activeBusiness = businessCategories.find(
    (category) => category.slug === activeBusinessSlug
  );
  const currentLabel =
    browseBy === "category"
      ? active.title
      : activeBusinessSlug === ALL_BUSINESSES_SLUG
      ? "All Businesses"
      : activeBusiness?.label ?? "All Businesses";

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
            Browse By
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
            <div className="demo-filter-toggle" role="group" aria-label="Browse by">
              <button type="button" className={`pill-tag filter-tag${browseBy === "category" ? " is-selected" : ""}`} aria-pressed={browseBy === "category"} onClick={() => setBrowseBy("category")}>
                Website Feature
              </button>
              <button type="button" className={`pill-tag filter-tag${browseBy === "business" ? " is-selected" : ""}`} aria-pressed={browseBy === "business"} onClick={() => setBrowseBy("business")}>
                Business Type
              </button>
            </div>
            {browseBy === "category" ? <div className="filter-bar">
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
                  {category.number} &mdash; {category.title}
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
                All Businesses
              </button>
              {businessCategories.map((category) => (
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
                  {category.number} &mdash; {category.label}
                </button>
              ))}
            </div>}
          </div>
        </div>
      </div>

      <div
        key={shownSlug}
        className={`work-stage${switched ? " is-entering" : ""}${leaving ? " is-leaving" : ""}`}
      >
        {shown.slug === "sliders" ? (
          <SliderContent collectionId={sliderCollections[0].id} glideIn={switched} />
        ) : (categoryMedia[shown.slug]?.length ?? 0) > 0 ? (
          <WorkSlider slides={categoryMedia[shown.slug]} glideIn={switched} />
        ) : (
          <PlaceholderDemo title={shown.title} />
        )}
      </div>
    </section>
  );
}
