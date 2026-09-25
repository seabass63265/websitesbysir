/**
 * The intake's summary card — what we've collected, grouped as Business /
 * Goals / What you have / Style, each with its own hairline-boxed rows,
 * plus the "I've reviewed my answers" confirmation. Presentational: the
 * flow owns the answers and what "Edit" does.
 */
import { useLayoutEffect, useRef } from "react";
import { DOMAIN_STEP_ENABLED } from "@/app/components/contact/IntakeProgress";

const icons = {
  store:
    "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z",
  tag: "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3zM6 6h.008v.008H6V6z",
  eye: "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  calendar:
    "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008z",
  phone:
    "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
};

function goalIcon(goal: string): keyof typeof icons {
  if (goal === "Book an appointment") return "calendar";
  if (goal === "Call me" || goal === "Send me a message") return "phone";
  return "eye";
}

function Icon({ name, className }: { name: keyof typeof icons; className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="var(--intake-fg)"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icons[name]} />
    </svg>
  );
}

function EditButton({
  section,
  onEdit,
  className = "",
  onDark = false,
}: {
  section: string;
  onEdit: () => void;
  className?: string;
  /** For use on the navy section bars: light text instead of dim navy. */
  onDark?: boolean;
}) {
  const tone = onDark
    ? "text-[var(--intake-bg)]/70 hover:text-[var(--intake-bg)] focus:ring-[var(--intake-bg)] focus:ring-offset-[var(--intake-fg)]"
    : "intake-t-dim hover:text-[var(--intake-fg)] focus:ring-[var(--intake-fg)] focus:ring-offset-[var(--intake-bg)]";
  return (
    <button
      type="button"
      onClick={onEdit}
      aria-label={`Edit ${section}`}
      className={`cursor-pointer text-[0.9rem] leading-5 uppercase tracking-widest underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${tone} ${className}`}
    >
      ✎ Edit
    </button>
  );
}

/** Lets a long unbroken entry wrap inside its box instead of running out of it. */
const wrap = { overflowWrap: "anywhere" } as const;

type Section = "name" | "type" | "goals" | "assets" | "style" | "plan" | "timeline" | "domain";

/**
 * A navy bar with the section title on the left and its Edit link on the
 * right (no link when the section has nothing to go back to edit).
 */
function SectionHeader({
  title,
  section,
  label,
  onEdit,
}: {
  title: string;
  section?: Section;
  label?: string;
  onEdit?: (section: Section) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 bg-[var(--intake-fg)] text-[var(--intake-bg)] py-5 px-7 border-b-[1px] intake-b-med">
      <span className="text-[0.875rem] sm:text-[1.125rem] leading-6 font-bold tracking-widest uppercase">
        {title}
      </span>
      {section && label && onEdit && (
        <EditButton section={label} onEdit={() => onEdit(section)} onDark className="shrink-0" />
      )}
    </div>
  );
}

export type ReviewData = {
  name: string;
  businessType: string;
  goals: string[];
  assets: string[];
  style: { title: string; link?: string; linkNotes?: string };
  plan: string;
  timeline: string;
  domain: string;
  hosting: string;
};

export default function IntakeReview({
  data,
  onEdit,
  confirmed,
  onConfirmedChange,
  notes,
  onNotesChange,
  businessLabel = "business",
}: {
  data: ReviewData;
  onEdit: (section: Section) => void;
  confirmed: boolean;
  onConfirmedChange: (value: boolean) => void;
  /** Free-text "anything we missed" box at the bottom of the summary. */
  notes: string;
  onNotesChange: (value: string) => void;
  businessLabel?: string;
}) {
  // The notes box grows with what's typed (and re-fits when the width changes
  // how the text wraps) instead of scrolling inside a fixed-height box.
  const notesRef = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = notesRef.current;
    if (!el) return;
    const fit = () => {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight + (el.offsetHeight - el.clientHeight)}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [notes]);

  return (
    <>
      <div className="border intake-b-dim flex flex-col">
        <div className="flex flex-col md:flex-row border-b-[1px] intake-b-dim">
          <div className="flex-1 min-w-0 p-6 md:p-8 flex flex-col items-center text-center border-b-[1px] md:border-b-0 md:border-r-[1px] intake-b-dim relative">
            <div className="w-24 h-24 border border-[var(--border-med)] flex items-center justify-center mb-6 shrink-0">
              <Icon name="store" className="w-12 h-12" />
            </div>
            <span className="text-[1rem] leading-6 tracking-widest intake-t-dim uppercase mb-3 block font-bold">
              {businessLabel} Name
            </span>
            <span className="text-[2.25rem] leading-10 font-bold uppercase mb-4 max-w-full" style={wrap}>
              {data.name || "—"}
            </span>
            <EditButton section={`${businessLabel} name`} onEdit={() => onEdit("name")} className="mt-auto" />
          </div>

          <div className="flex-1 min-w-0 p-6 md:p-8 flex flex-col items-center text-center relative">
            <div className="w-24 h-24 border border-[var(--border-med)] flex items-center justify-center mb-6 shrink-0">
              <Icon name="tag" className="w-12 h-12" />
            </div>
            <span className="text-[1rem] leading-6 tracking-widest intake-t-dim uppercase mb-3 block font-bold">
              {businessLabel} Type
            </span>
            <span className="text-[2.25rem] leading-10 font-bold uppercase mb-4 max-w-full" style={wrap}>
              {data.businessType || "—"}
            </span>
            <EditButton section={`${businessLabel} type`} onEdit={() => onEdit("type")} className="mt-auto" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b-[1px] intake-b-dim">
        <div className="flex flex-col min-w-0 border-b-[1px] md:border-b-0 md:border-r-[1px] intake-b-dim">
        <SectionHeader
          title="Your website will help customers"
          section="goals"
          label="what your website will help customers do"
          onEdit={onEdit}
        />
        <div className="flex flex-col flex-1">
          {data.goals.length === 0 ? (
            <div className="p-5 text-[1.0625rem] leading-6 intake-t-dim tracking-wide">
              Nothing selected yet.
            </div>
          ) : (
            data.goals.map((goal) => (
              <div
                key={goal}
                className="flex items-center gap-5 p-5 border-b-[1px] intake-b-dim last:border-b-0"
              >
                <div className="w-10 h-10 border border-[var(--border-med)] flex items-center justify-center shrink-0">
                  <Icon name={goalIcon(goal)} className="w-5 h-5" />
                </div>
                <span className="min-w-0 text-[1.0625rem] leading-6 font-bold tracking-wide" style={wrap}>{goal}</span>
              </div>
            ))
          )}
        </div>

        </div>

        <div className="flex flex-col min-w-0">
        <SectionHeader
          title="What you already have"
          section="assets"
          label="what you already have"
          onEdit={onEdit}
        />
        <div className="p-5 sm:p-7 flex flex-col items-start gap-4 flex-1">
          {data.assets.length === 0 ? (
            <span className="text-[1.0625rem] leading-6 intake-t-dim tracking-wide">
              Nothing yet — that’s completely okay.
            </span>
          ) : (
            data.assets.map((asset) => (
              <div key={asset} className="inline-flex items-center gap-4 border intake-b-dim p-2.5 pr-5 max-w-full">
                <div className="w-8 h-8 bg-[var(--intake-fg)] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-[var(--intake-bg)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="min-w-0 text-[1.0625rem] leading-6 font-bold tracking-wide" style={wrap}>{asset}</span>
              </div>
            ))
          )}
        </div>
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-b-[1px] intake-b-dim">
          <div className="flex flex-col min-w-0 border-b-[1px] md:border-b-0 md:border-r-[1px] intake-b-dim">
            <SectionHeader
              title="Preferred Style"
              section="style"
              label="Preferred Style"
              onEdit={onEdit}
            />
            <div className="p-6 md:p-8 flex-1">
              <span className="text-[1.5rem] leading-8 font-bold uppercase block" style={wrap}>{data.style.title}</span>
              {data.style.link && (
                <span className="text-[0.875rem] leading-5 tracking-wide intake-t-dim block mt-3" style={wrap}>
                  Site you like: {data.style.link}
                </span>
              )}
              {data.style.linkNotes && (
                <span className="text-[0.875rem] leading-5 tracking-wide intake-t-dim block mt-2" style={wrap}>
                  What stands out: {data.style.linkNotes}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <SectionHeader
              title="Preferred Plan"
              section="plan"
              label="Preferred Plan"
              onEdit={onEdit}
            />
            <div className="p-6 md:p-8 flex-1">
              <span className="text-[1.5rem] leading-8 font-bold uppercase block" style={wrap}>{data.plan}</span>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${DOMAIN_STEP_ENABLED ? "md:grid-cols-2 " : ""}border-b-[1px] intake-b-dim`}>
          <div className={`flex flex-col min-w-0 ${DOMAIN_STEP_ENABLED ? "border-b-[1px] md:border-b-0 md:border-r-[1px] " : ""}intake-b-dim`}>
            <SectionHeader
              title="When you need it"
              section="timeline"
              label="when you need your website"
              onEdit={onEdit}
            />
            <div className="p-6 md:p-8 flex-1">
              <span className="text-[1.5rem] leading-8 font-bold uppercase block" style={wrap}>{data.timeline}</span>
            </div>
          </div>

          {DOMAIN_STEP_ENABLED && (
            <div className="flex flex-col min-w-0">
              <SectionHeader
                title="Domain & hosting"
                section="domain"
                label="your domain and hosting answers"
                onEdit={onEdit}
              />
              <div className="p-6 md:p-8 flex flex-col gap-5 flex-1">
                <div>
                  <span className="text-[0.875rem] leading-5 tracking-widest intake-t-dim uppercase block mb-1">Domain name</span>
                  <span className="text-[1.5rem] leading-8 font-bold uppercase block" style={wrap}>{data.domain}</span>
                </div>
                <div>
                  <span className="text-[0.875rem] leading-5 tracking-widest intake-t-dim uppercase block mb-1">Website hosting</span>
                  <span className="text-[1.5rem] leading-8 font-bold uppercase block" style={wrap}>{data.hosting}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SectionHeader title="Extra notes" />
        <div className="p-6 md:p-8">
          <label htmlFor="extra-notes" className="block text-[0.875rem] leading-5 intake-t-dim tracking-wide mb-4">
            Optional. Anything else we may have missed?
          </label>
          <textarea
            ref={notesRef}
            id="extra-notes"
            name="extra-notes"
            rows={4}
            maxLength={2000}
            className="intake-input resize-none overflow-hidden"
            placeholder="Features you have in mind, deadlines, sites you like, questions for us…"
            autoComplete="off"
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
          />
        </div>
      </div>

      <div
        className={`intake-style-card intake-style-card--fill group relative flex items-center gap-4 sm:gap-6 p-7 sm:p-9 mt-8${
          confirmed ? " is-checked" : ""
        }`}
      >
        <input
          type="checkbox"
          id="confirm-review"
          name="confirm-review"
          checked={confirmed}
          onChange={(event) => onConfirmedChange(event.target.checked)}
          className="intake-radio"
        />
        <div className="intake-style-card__box w-8 h-8 flex items-center justify-center shrink-0 z-20 pointer-events-none">
          <svg
            className={`w-5 h-5 text-[var(--intake-bg)] transition-opacity ${
              confirmed ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <span className="font-bold text-[1.0625rem] sm:text-[1.375rem] uppercase tracking-wide select-none z-0">
          I’ve reviewed my answers and they look correct.
        </span>
        <label htmlFor="confirm-review" aria-label="Confirm review" className="absolute inset-0 z-10 cursor-pointer" />
      </div>
    </>
  );
}
