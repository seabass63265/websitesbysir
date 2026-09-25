"use client";

import { useEffect, useState } from "react";

export type SectionNavLink = { label: string; href: string };

/**
 * The header's inline "01 — Process ..." links, plus scroll-spy: whichever
 * section is nearest the vertical center of the viewport gets `.is-active`.
 * Clicking still relies on the shared Lenis instance's `anchors` option to
 * smooth-scroll — this component only tracks which link to highlight.
 */
export default function SectionNav({ links }: { links: SectionNavLink[] }) {
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <div className="nav-links">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={link.href === activeHref ? "is-active" : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
