/**
 * One selectable answer. The native radio is visually hidden and its
 * `:checked` state drives the card styling in globals.css (.intake-radio +
 * .intake-card), so keyboard focus, arrow-key selection and form semantics
 * all come from the browser. Controlled by the flow so the choice survives
 * stepping forward and back.
 *
 * Clicking the chosen card again clears it (`onClear`) — every single-choice
 * card in the intake works this way, so new ones must supply both handlers.
 */
export default function IntakeOptionCard({
  name,
  value,
  title,
  description,
  price,
  checked,
  onChange,
  onClear,
}: {
  name: string;
  value: string;
  title: string;
  description?: string;
  /** Optional cost marker (e.g. "$") shown beside the selector. */
  price?: string;
  checked: boolean;
  /** The card was chosen. */
  onChange: () => void;
  /** The already-chosen card was clicked again. */
  onClear: () => void;
}) {
  return (
    <label className="block h-full cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        // A radio only reports a change when it becomes checked, so the click
        // (which fires every time) is what tells select from clear.
        onChange={() => {}}
        onClick={() => (checked ? onClear() : onChange())}
        className="intake-radio"
      />
      <div className="intake-card h-full p-5 flex items-center justify-between gap-6">
        <div>
          <h3
            className={`text-[1.125rem] leading-7 font-bold uppercase${description ? " mb-1" : ""}`}
            style={{ letterSpacing: "0.025em" }}
          >
            {title}
          </h3>
          {description && <p className="text-[0.875rem] leading-5 opacity-80">{description}</p>}
        </div>
        <div className="flex items-center gap-5 shrink-0">
          {price && (
            <span
              className="text-[2rem] leading-8 font-bold"
              style={{ letterSpacing: "0.05em" }}
              aria-label={`Price level ${price.length} of 3`}
            >
              {price}
            </span>
          )}
          <div className="intake-indicator w-5 h-5 shrink-0">
            <div className="intake-indicator__inner" />
          </div>
        </div>
      </div>
    </label>
  );
}
