/** The question — eyebrow, headline and intro. Sits in the intake's left column. */
export default function IntakeIntro({
  eyebrow,
  title,
  body,
  compact = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  /** A smaller headline, for screens that stack two questions. */
  compact?: boolean;
}) {
  return (
    <div>
      {eyebrow && (
        <span className="block text-[1.125rem] sm:text-[1.25rem] leading-7 tracking-[0.15em] uppercase mb-4 intake-t-dim">
          {eyebrow}
        </span>
      )}
      {/* Inline letter-spacing: globals.css sets h1–h4 tracking unlayered,
          which would otherwise beat Tailwind's tracking utilities. */}
      <h1
        className={`${compact ? "text-3xl sm:text-[38px] mb-4" : "text-4xl sm:text-[52px] mb-6"} leading-[1.1] font-bold uppercase`}
        style={{ letterSpacing: "-0.025em", overflowWrap: "anywhere" }}
      >
        {title}
      </h1>
      {body && (
        <p className="text-base sm:text-lg leading-relaxed max-w-xl intake-t-dim whitespace-pre-line">
          {body}
        </p>
      )}
    </div>
  );
}
