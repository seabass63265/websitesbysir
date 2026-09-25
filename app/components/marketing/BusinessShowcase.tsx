"use client";

import { useState } from "react";
import { businessCategories } from "@/app/components/work/businessCategories";
import DeviceShowcase from "@/app/components/marketing/DeviceShowcase";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";

type Category = (typeof businessCategories)[number];

/**
 * Homepage strip between the hero and "Select Service Area": the 3D laptop and
 * phone, with the business-type buttons beside its title. Picking a type opens the
 * devices playing a site for it (see DeviceShowcase); picking it again closes
 * them.
 */
export default function BusinessShowcase() {
  const [selected, setSelected] = useState<Category | null>(null);
  const lenis = useSmoothScroll();

  function select(item: Category) {
    const next = item.slug === selected?.slug ? null : item;
    setSelected(next);
    if (!next) return;
    // Bring the devices into view (scroll-margin clears the sticky header),
    // which leaves the top of "Select Service Area" peeking in below them.
    const target = document.getElementById("showcase-stage");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <DeviceShowcase
      selected={selected}
      filters={
        <div className="business-showcase">
          <div className="text-xs business-showcase__eyebrow">Built for</div>
          <ul className="business-showcase__list">
            {businessCategories.map((item) => (
              <li key={item.slug}>
                <button
                  type="button"
                  className={`pill-tag filter-tag${
                    item.slug === selected?.slug ? " is-selected" : ""
                  }`}
                  aria-pressed={item.slug === selected?.slug}
                  onClick={() => select(item)}
                >
                  {item.number} &mdash; {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
