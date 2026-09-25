import IntakeBar from "@/app/components/contact/IntakeBar";
import IntakeForm from "@/app/components/contact/IntakeForm";
import { IntakeProgressProvider } from "@/app/components/contact/IntakeProgress";

/**
 * The project-intake block as an in-page section (the /intake route shows
 * the same bar + form full-screen). Uses the intake's own white blueprint
 * styling via `.intake-page`.
 */
export default function IntakeSection({
  id,
  scrollToId,
  pricing,
  businessExamples,
  businessLabel,
  businessTypeHint,
  otherIndustry,
  websiteExample,
}: {
  id?: string;
  /** Id of the element each step scrolls to the top of (e.g. the numbered section wrapping this one). */
  scrollToId?: string;
  /** Pricing section on the same page, linked from the plan step. */
  pricing?: { id: string; label: string };
  /** Example answers for "what type of business", shown as rotating placeholders. */
  businessExamples?: string[];
  /** Replaces "business" in the questions (e.g. "restaurant / café"). */
  businessLabel?: string;
  /** Replaces the hint under the business-type question; "\n" starts a new line. */
  businessTypeHint?: string;
  /** A "wrong page?" link shown between the name and type questions. */
  otherIndustry?: { prompt: string; label: string; href: string };
  /** Placeholder domain for the "website link or domain" question. */
  websiteExample?: string;
}) {
  return (
    <section
      id={id}
      className="intake-page px-6 sm:px-8 pt-[clamp(3rem,10vh,6rem)] pb-6 selection:bg-[var(--intake-fg)] selection:text-[var(--intake-bg)]"
    >
      <div className="w-full max-w-[1100px] mx-auto relative">
        <IntakeProgressProvider>
          <IntakeBar />
          <IntakeForm
          scrollToId={scrollToId}
          pricing={pricing}
          businessExamples={businessExamples}
          businessLabel={businessLabel}
          businessTypeHint={businessTypeHint}
          otherIndustry={otherIndustry}
          websiteExample={websiteExample}
        />
        </IntakeProgressProvider>
      </div>
    </section>
  );
}
