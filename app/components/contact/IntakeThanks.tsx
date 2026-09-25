import { TransitionLink } from "@/app/components/providers/PageTransition";

const nextSteps = [
  {
    label: "We review your answers",
    icon: (
      <>
        <path d="M3 6L12 13L21 6" />
        <rect x="3" y="6" width="18" height="12" />
      </>
    ),
  },
  {
    label: "We reach out within 2–3 business days",
    icon: (
      <>
        <path d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    label: "We build your website together",
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" />
        <path d="M12 18H12.01" />
      </>
    ),
  },
];

/** The intake's closing screen: confirms the quote request by business name. */
export default function IntakeThanks({
  businessName,
  businessLabel = "business",
  reference,
  onStartOver,
}: {
  businessName: string;
  businessLabel?: string;
  /** Timestamp shown in the reference chip, e.g. "14:05 09/23/26". */
  reference: string;
  /** Clears every answer and returns to the first question. */
  onStartOver: () => void;
}) {
  const name = businessName.trim().toUpperCase() || `YOUR ${businessLabel.toUpperCase()}`;
  // "INC." already ends in a full stop; the sentences below add their own.
  const sentenceName = name.replace(/\.+$/, "");

  return (
    <div data-fit-off>
      <div className="w-full max-w-[760px] mx-auto flex flex-col items-center text-center mb-16">
        <div className="w-16 h-16 border border-[var(--border-med)] flex items-center justify-center mb-10">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path
              className="intake-draw-check"
              d="M4 12L10 18L20 6"
              stroke="var(--intake-fg)"
              strokeWidth="1.75"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </div>

        <span className="block text-[0.875rem] leading-5 tracking-[0.15em] uppercase mb-6 intake-t-dim font-bold">
          Quote request received.
        </span>

        <h1
          className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-bold uppercase mb-8"
          style={{ letterSpacing: "-0.025em", overflowWrap: "anywhere" }}
        >
          Thank you,
          <br />
          <span className="italic">{sentenceName}.</span>
        </h1>

        <div className="intake-t-dim space-y-3 mb-10 text-base sm:text-lg leading-relaxed">
          <p>
            We’ve got your quote request for{" "}
            <span className="font-bold text-[var(--intake-fg)]" style={{ overflowWrap: "anywhere" }}>
              {sentenceName}
            </span>
            . We will get back to you within{" "}
            <span className="font-bold text-[var(--intake-fg)]">2–3 business days</span>.
          </p>
          <p>Keep an eye on your inbox for our reply.</p>
        </div>

        <div
          className="border border-[var(--border-med)] px-5 py-2 text-[0.75rem] sm:text-[0.875rem] leading-5 uppercase tracking-[0.1em] intake-t-dim max-w-full"
          style={{ overflowWrap: "anywhere" }}
        >
          Reference: {name} — {reference}
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto mb-12">
        <span className="block text-[0.75rem] leading-4 tracking-[0.2em] uppercase mb-6 font-bold intake-t-dim">
          What happens next
        </span>
        <div className="border-t-[1px] intake-b-med flex flex-col">
          {nextSteps.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-6 py-6 px-2 sm:px-4 border-b-[1px] intake-b-med"
            >
              <div className="w-14 h-14 border border-[var(--border-med)] flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--intake-fg)"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </div>
              <span className="font-bold uppercase tracking-wider text-[0.9375rem] sm:text-[1.0625rem] leading-6">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t-[1px] intake-b-med gap-6">
        <button
          type="button"
          onClick={onStartOver}
          className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>{" "}
          Start another website
        </button>

        <TransitionLink
          href="/"
          className="intake-cta max-sm:w-full text-center bg-[var(--intake-fg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
        >
          Back to home
        </TransitionLink>
      </div>
    </div>
  );
}
