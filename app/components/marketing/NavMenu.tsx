"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";
import { usePageTransition } from "@/app/components/providers/PageTransition";

type PrimaryLink = { num: string; label: string; href: string; offset?: boolean };
type SecondaryLink = { label: string; href: string };

const defaultPrimaryLinks: PrimaryLink[] = [
  { num: "I", label: "Home", href: "/", offset: true },
  { num: "II", label: "Works", href: "/work", offset: false },
  { num: "III", label: "Why SIR_", href: "/why-sir", offset: true },
  { num: "IV", label: "Contact", href: "/contact", offset: false },
];

const defaultSecondaryTop: SecondaryLink[] = [
  { label: "You Get Found", href: "#work" },
  { label: "You Convert Visitors", href: "#work" },
  { label: "You Build Trust", href: "#work" },
];

const defaultSecondaryBottom: SecondaryLink[] = [
  { label: "Start a Project", href: "/intake" },
];

/**
 * Fullscreen navigation — a morphing blob toggle drives one paused GSAP
 * timeline: a wave overlay slides down from above, then the menu links slide up
 * out of their clipped rows. Ported from the "Purity of Noise" interaction.
 *
 * Defaults to the homepage's own links; industry pages (which have their own
 * in-page sections) pass their own `primaryLinks` and drop the secondary
 * column by passing empty arrays for `secondaryTop`/`secondaryBottom`.
 */
export default function NavMenu({
  primaryLinks = defaultPrimaryLinks,
  secondaryTop = defaultSecondaryTop,
  secondaryBottom = defaultSecondaryBottom,
  compact = false,
}: {
  primaryLinks?: PrimaryLink[];
  secondaryTop?: SecondaryLink[];
  secondaryBottom?: SecondaryLink[];
  /** Shrinks the toggle button — e.g. the Local Businesses header, where
   * the default size crowded the page content. */
  compact?: boolean;
}) {
  const hasSecondary = secondaryTop.length > 0 || secondaryBottom.length > 0;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const startedRef = useRef(false);
  const lenis = useSmoothScroll();
  const { navigate } = usePageTransition();

  // Build the timeline once.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const links = root.querySelectorAll<HTMLElement>(".menu-link");
      // Explicit y:0 so GSAP doesn't stack yPercent on top of the CSS
      // translateY(-100%) it parses as a pixel baseline.
      gsap.set(overlayRef.current, { y: 0, yPercent: -100 });
      gsap.set(menuRef.current, { visibility: "hidden" });
      gsap.set(links, { top: "100%" });

      const tl = gsap.timeline({ paused: true });
      tl.to(
        overlayRef.current,
        { yPercent: 0, duration: 1.2, ease: "power3.inOut" },
        0
      )
        .set(menuRef.current, { visibility: "visible" }, 0.55)
        .to(
          links,
          { top: 0, duration: 0.9, stagger: 0.07, ease: "power3.out" },
          0.6
        );

      timelineRef.current = tl;
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Play / reverse on state change, and lock smooth scroll while open.
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (open) {
      startedRef.current = true;
      tl.play();
      lenis?.stop();
    } else if (startedRef.current) {
      tl.reverse();
      lenis?.start();
    }
  }, [open, lenis]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setOpen(false);

    // A real page (e.g. "/approach") rather than an in-page anchor — hand it
    // off to the site-wide page-wipe transition instead of scrolling.
    if (!href.startsWith("#")) {
      navigate(href);
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;
    lenis?.start();
    window.history.replaceState(null, "", href);
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(target as HTMLElement);
      else target.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div ref={rootRef}>
      <button
        type="button"
        className={[
          "menu-toggle",
          compact && "menu-toggle--sm",
          open && "is-active",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="menu-toggle__outline menu-toggle__outline--a" />
        <span className="menu-toggle__outline menu-toggle__outline--b" />
        <span className="menu-toggle__icon">
          <span className="menu-toggle__line menu-toggle__line--top" />
          <span className="menu-toggle__line menu-toggle__line--bottom" />
        </span>
      </button>

      <div className="overlay" ref={overlayRef} aria-hidden="true">
        <svg
          className="overlay__svg"
          viewBox="0 0 1000 1100"
          preserveAspectRatio="none"
        >
          <path
            className="overlay__path"
            d="M 0 0 L 1000 0 L 1000 1000 Q 500 1200 0 1000 Z"
          />
        </svg>
      </div>

      <nav
        id="site-menu"
        ref={menuRef}
        className={open ? "menu is-open" : "menu"}
        aria-hidden={!open}
      >
        <div className="menu__col menu__col--primary">
          <ul className="menu__list">
            {primaryLinks.map((link) => (
              <li
                key={link.label}
                className={
                  link.offset ? "menu-item menu-item--offset-sm" : "menu-item"
                }
              >
                <a
                  className="menu-link menu-link--primary"
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(event) => handleNavClick(event, link.href)}
                >
                  <span className="menu-link__num">{link.num}</span>
                  <span className="menu-link__text">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {hasSecondary && (
          <div className="menu__col menu__col--secondary">
            <ul className="menu__list menu__list--top">
              {secondaryTop.map((link) => (
                <li key={link.label} className="menu-item">
                  <a
                    className="menu-link menu-link--secondary"
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    onClick={(event) => handleNavClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="menu__list menu__list--bottom">
              {secondaryBottom.map((link) => (
                <li key={link.label} className="menu-item">
                  <a
                    className="menu-link menu-link--secondary"
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    onClick={(event) => handleNavClick(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
