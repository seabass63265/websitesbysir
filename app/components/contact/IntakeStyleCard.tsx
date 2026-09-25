import { stylePreviews, type StylePreviewKey } from "@/app/components/contact/IntakeStylePreviews";

/**
 * One style direction: a wireframe thumbnail, a short description and two
 * actions. The whole card is a click target for its (visually hidden)
 * radio via an overlaid label; "Explore this website" sits above it.
 */
export default function IntakeStyleCard({
  value,
  category,
  title,
  description,
  tags,
  checked,
  onChange,
  onExplore,
}: {
  value: StylePreviewKey;
  category: string;
  title: string;
  description: string;
  tags: string[];
  checked: boolean;
  /** Called on every click of the card, including on the chosen one. */
  onChange: () => void;
  onExplore: () => void;
}) {
  const id = `style-${value}`;
  const Preview = stylePreviews[value];
  const buttonBase =
    "cursor-pointer flex-1 text-center font-bold uppercase tracking-wider py-3 px-2 border text-[10px] sm:text-[0.75rem] lg:text-[9px] xl:text-[10px] transition-colors";

  return (
    <div className={`intake-style-card group relative flex flex-col${checked ? " is-checked" : ""}`}>
      <input
        type="radio"
        id={id}
        name="style-direction"
        value={value}
        checked={checked}
        // A radio only reports a change when it becomes checked, so clicking the
        // chosen card again would do nothing. onClick fires every time, which
        // lets the parent toggle the choice off.
        onChange={() => {}}
        onClick={onChange}
        className="intake-radio"
      />
      <label htmlFor={id} aria-label={`Select ${title}`} className="absolute inset-0 z-10 cursor-pointer" />
      <div className="intake-style-card__box absolute top-4 right-4 w-5 h-5 z-20 pointer-events-none" />

      <div className="p-5 pb-0 flex-grow flex flex-col z-0 relative pointer-events-none">
        <Preview />
        <span className="text-[10px] tracking-widest intake-t-dim uppercase mb-2 block font-bold">
          {category}
        </span>
        <h3
          className="text-xl font-bold uppercase mb-3 leading-tight"
          style={{ letterSpacing: "normal" }}
        >
          {title}
        </h3>
        <p className="text-[0.75rem] intake-t-dim leading-relaxed mb-5">{description}</p>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border intake-b-dim px-2 py-1 text-[9px] uppercase tracking-widest intake-t-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div className="mb-6" />
        )}
      </div>

      <div className="p-5 mt-auto flex flex-col lg:flex-row gap-2 relative z-20">
        <label
          htmlFor={id}
          className={`${buttonBase} group/choose border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] ${
            checked
              ? "bg-transparent text-[var(--intake-fg)]"
              : "bg-[var(--intake-fg)] text-[var(--intake-bg)]"
          }`}
        >
          {checked ? (
            <>
              <span className="group-hover/choose:hidden">✓ Chosen</span>
              <span className="hidden group-hover/choose:inline">✕ Deselect</span>
            </>
          ) : (
            "Choose this direction"
          )}
        </label>
        <button
          type="button"
          onClick={onExplore}
          className={`${buttonBase} group/btn intake-b-med text-[var(--intake-fg)] hover:bg-[var(--intake-fg)] hover:text-[var(--intake-bg)]`}
        >
          Explore this website{" "}
          <span className="inline-block group-hover/btn:translate-x-1 transition-transform ml-0.5">→</span>
        </button>
      </div>
    </div>
  );
}
