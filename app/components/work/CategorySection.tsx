"use client";

import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Placeholder for a /work category with no reference demo ported in yet.
 * Shown in the content pane whenever `WorkShowcase` has a category selected
 * that isn't wired to a real component (Sliders, Mouse Effects).
 */
export function PlaceholderDemo({ title }: { title: string }) {
  const t = useT();
  return (
    <div className="category-placeholder blueprint-grid border-b">
      <span className="text-xs category-placeholder__label">
        {t(`${title} demo coming soon`, `Demo de ${title} próximamente`)}
      </span>
    </div>
  );
}
