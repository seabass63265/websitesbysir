/**
 * A multi-select answer. Same look as IntakeOptionCard (the native input is
 * hidden and `.intake-radio:checked + .intake-card` styles the card — the
 * class name predates the checkbox variant), just a checkbox with a single
 * label instead of a title and description.
 */
export default function IntakeCheckCard({
  name,
  value,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="block cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="intake-radio"
      />
      <div className="intake-card p-5 flex items-center justify-between gap-6">
        <span className="font-bold uppercase tracking-wide">{value}</span>
        <div className="intake-indicator w-5 h-5 shrink-0">
          <div className="intake-indicator__inner" />
        </div>
      </div>
    </label>
  );
}
