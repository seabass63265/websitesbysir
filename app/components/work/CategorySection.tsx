/**
 * Placeholder for a /work category with no reference demo ported in yet.
 * Shown in the content pane whenever `WorkShowcase` has a category selected
 * that isn't wired to a real component (Sliders, Mouse Effects).
 */
export function PlaceholderDemo({ title }: { title: string }) {
  return (
    <div className="category-placeholder blueprint-grid border-b">
      <span className="text-xs category-placeholder__label">
        {title} demo coming soon
      </span>
    </div>
  );
}
