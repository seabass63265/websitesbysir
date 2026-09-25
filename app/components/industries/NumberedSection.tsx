/**
 * Editorial section shell — an oversized step number (with its eyebrow
 * label stacked beneath it) in a fixed left column with a bordered
 * divider, content to its right. Matches the design's `.editorial-section`
 * / `.section-number` pattern. Server component.
 */
export default function NumberedSection({
  n,
  label,
  id,
  className,
  bodyClassName,
  tag,
  children,
}: {
  n: string;
  label?: string;
  id?: string;
  className?: string;
  bodyClassName?: string;
  /** Small label pinned to the top-right corner, e.g. "03 / CONNECT YOUR TOOLS". */
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`numbered-section border-b${className ? ` ${className}` : ""}`}
    >
      <div className="numbered-section__num">
        <div className="numbered-section__digits">{n}</div>
        {label && (
          <div className="numbered-section__label text-sm">{label}</div>
        )}
      </div>
      <div
        className={`numbered-section__body${
          bodyClassName ? ` ${bodyClassName}` : ""
        }`}
      >
        {tag && <span className="numbered-section__tag text-xs">{tag}</span>}
        {children}
      </div>
    </section>
  );
}
