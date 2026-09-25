"use client";

import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/app/components/providers/SmoothScrollProvider";
import { DOMAIN_STEP_ENABLED, useIntakeProgress } from "@/app/components/contact/IntakeProgress";
import { TransitionLink, usePageTransition } from "@/app/components/providers/PageTransition";
import IntakeToast from "@/app/components/contact/IntakeToast";
import IntakeIntro from "@/app/components/contact/IntakeIntro";
import useStableHeight from "@/app/components/contact/useStableHeight";
import IntakeOptionCard from "@/app/components/contact/IntakeOptionCard";
import IntakeCheckCard from "@/app/components/contact/IntakeCheckCard";
import IntakeReview, { type ReviewData } from "@/app/components/contact/IntakeReview";
import IntakeThanks from "@/app/components/contact/IntakeThanks";
import IntakeStyleCard from "@/app/components/contact/IntakeStyleCard";
import type { StylePreviewKey } from "@/app/components/contact/IntakeStylePreviews";

const options = [
  {
    value: "new_website",
    title: "I need a new website",
    description: "I don't have a website yet.",
  },
  {
    value: "replace_website",
    title: "I want to replace my current website",
    description: "We'll build you a brand-new website for your business.",
  },
  {
    value: "help_existing",
    title: "I need help with my existing site",
    description: "Updates, maintenance, or adding new features.",
  },
  {
    value: "other",
    title: "Something else",
    description: "General inquiries or something else not listed above.",
  },
];

const STORAGE_KEY = "sir-intake-v1";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
// Steps that don't set the height every other step is held to. They are either
// far taller than the rest (7, 9, 10), or grow once an answer is chosen (extra
// fields or sub-options), so coming back to one with answers already filled in
// would otherwise stretch every step after it.
const isTallStep = (step: Step) => step !== 1 && step !== 3;

const nextStepOptions = [
  "Call me",
  "Send me a message",
  "Request a quote",
  "Visit my location",
  "Buy online",
  "Book an appointment",
];
const SOMETHING_ELSE = "Something else";

const assetOptions = [
  "A logo",
  "Photos I'd like to use",
  "A products or services list",
  "Social media",
];
const styleOptions: {
  value: StylePreviewKey;
  category: string;
  title: string;
  description: string;
  tags: string[];
}[] = [
  {
    value: "retail",
    category: "Retail",
    title: "Magnolia Lane Boutique",
    description:
      "A warm, editorial retail demonstration for an independent boutique, with photography-led storytelling, responsive navigation, gallery exploration, and demo-safe business actions.",
    tags: ["Warm contemporary", "Editorial retail", "Fashion boutique"],
  },
  {
    value: "repair",
    category: "Repair Services",
    title: "Martinez Auto Care",
    description: "Description pending owner approval.",
    tags: [],
  },
  {
    value: "food",
    category: "Food & Restaurants",
    title: "Miss Evelyn's Coffee House",
    description: "Warm, welcoming, and built around the feeling of a favorite local place.",
    tags: ["Coffee house", "Warm", "Editorial"],
  },
];
const moreStyleOptions: typeof styleOptions = [
  {
    value: "wellness",
    category: "Health & Wellness",
    title: "Sage & Stone Yoga Studio",
    description: "Calm, grounded, and centered around ease of booking.",
    tags: ["Calm", "Minimal"],
  },
  {
    value: "professional",
    category: "Professional Services",
    title: "Harbor Light Dental",
    description: "Clean, trustworthy, and simple to navigate.",
    tags: ["Clean", "Trustworthy"],
  },
  {
    value: "fitness",
    category: "Fitness",
    title: "Ironclad Strength Co.",
    description: "Bold, direct, and built for action.",
    tags: ["Bold", "Industrial"],
  },
];
const planOptions = [
  {
    value: "essential",
    title: "Essential",
    description: "A professional, easy-to-manage online presence.",
  },
  {
    value: "growth",
    title: "Growth",
    description: "A website that actively supports bookings, ordering, and customer growth.",
  },
  {
    value: "signature",
    title: "Tailored",
    description: "Outside our standard packages — a focused site on a smaller budget or a fully custom build.",
  },
  {
    value: "not-sure",
    title: "I’m not sure yet",
    description: "We’ll help you find the right fit.",
  },
];
// Shown once Tailored is picked: which kind of custom project they mean.
const signatureOptions = [
  {
    value: "smaller-budget",
    title: "A smaller budget",
    price: "$",
    description: "A thoughtfully scaled website built around your budget.",
  },
  {
    value: "fully-custom",
    title: "A fully customized digital experience",
    price: "$$$",
    description: "Custom structure, interactions, and functionality built around your goals.",
  },
];
// Domain and hosting, asked together on their own screen after the assets step.
const domainOptions = [
  { value: "have", title: "Yes, I already own a domain" },
  { value: "need-help", title: "No, I need help getting one" },
  { value: "not-sure", title: "I’m not sure" },
];
const hostingOptions = [
  { value: "need", title: "Yes, I’ll need hosting" },
  { value: "have", title: "No, I already have hosting" },
  { value: "not-sure", title: "I’m not sure—help me decide" },
];
// When they'd like the site live; asked alongside the plan.
const timelineOptions = [
  { value: "asap", title: "As soon as possible" },
  { value: "month", title: "3–4 weeks" },
  { value: "quarter", title: "In 1–3 months" },
  { value: "flexible", title: "No rush — I’m flexible" },
];
/** A hairline with a label on it (default "And/Or"), between the style step's alternative answers. */
function AndOrDivider({ label = "And/Or" }: { label?: string }) {
  return (
    <div role="separator" className="flex items-center gap-5 mb-10">
      <span className="flex-1 border-t-[1px] intake-b-med" />
      <span className="text-[0.875rem] leading-5 tracking-[0.15em] uppercase font-bold intake-t-dim">{label}</span>
      <span className="flex-1 border-t-[1px] intake-b-med" />
    </div>
  );
}
// The optional "a site you like" link only has to look like one (a dot, no spaces).
const looksLikeLink = (value: string) => {
  const link = value.trim();
  return !link || (/^[^\s]+\.[^\s]{2,}$/.test(link));
};
const NOT_SURE = "not-sure";
const allStyleValues: string[] = [...styleOptions, ...moreStyleOptions].map((o) => o.value);
allStyleValues.push(NOT_SURE);

const OTHER_ASSET = "Other";
const NOT_READY = "I don't have these ready yet";

/**
 * The project intake, one question per step: (1) what brings you here,
 * (2) the business name, (3) where to send the details, (4) the type of business, (5) what customers should be able to do, (6) what they already have, (7) a style direction, (8) a review of it all. The question sits on the left, the answer on the
 * right and the actions along the bottom. Answers are held here so Back
 * keeps them. As in the designs, the last step only logs its result —
 * there is no next step or submission endpoint wired up yet.
 */
type IntakeFormProps = {
  scrollToId?: string;
  /** Example answers for the business-type question; they take turns as the placeholder. */
  businessExamples?: string[];
  /** What to call the business in the copy — "restaurant / café" on that industry's page. */
  businessLabel?: string;
  /** Overrides the "Describe it in a few words." hint under the business-type question. */
  businessTypeHint?: string;
  /** A pricing section on the same page: the plan step links up to it. */
  pricing?: { id: string; label: string };
  /** A "wrong page?" link between the name and type questions (step 2 only). */
  otherIndustry?: { prompt: string; label: string; href: string };
  /** Placeholder for the "website link or domain" question. */
  websiteExample?: string;
};

/** Wraps the steps with the "fill this in to continue" toast they all share. */
export default function IntakeForm(props: IntakeFormProps) {
  const [notice, setNotice] = useState<{ id: number; text: string } | null>(null);
  const notify = useCallback(
    (text: string) => setNotice((prev) => ({ id: (prev?.id ?? 0) + 1, text })),
    []
  );
  const dismiss = useCallback(() => setNotice(null), []);
  return (
    <>
      <IntakeSteps {...props} notify={notify} />
      <IntakeToast notice={notice} onDone={dismiss} />
    </>
  );
}

function IntakeSteps({
  scrollToId,
  pricing,
  businessExamples,
  businessLabel = "business",
  businessTypeHint = "Describe it in a few words.",
  otherIndustry,
  websiteExample = "www.yourbusiness.com",
  notify,
}: IntakeFormProps & { notify: (message: string) => void }) {
  const [step, setStep] = useState<Step>(1);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  const [otherAction, setOtherAction] = useState("");
  const [otherError, setOtherError] = useState(false);
  const [assets, setAssets] = useState<string[]>([]);
  const [otherAsset, setOtherAsset] = useState("");
  const [otherAssetError, setOtherAssetError] = useState(false);
  const [styleDirection, setStyleDirection] = useState("");
  const [plan, setPlan] = useState("");
  const [planError, setPlanError] = useState(false);
  const [signatureType, setSignatureType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [timelineError, setTimelineError] = useState(false);
  const [domain, setDomain] = useState("");
  const [hosting, setHosting] = useState("");
  const [domainError, setDomainError] = useState(false);
  const [hostingError, setHostingError] = useState(false);
  const [notes, setNotes] = useState("");
  const [inspirationLink, setInspirationLink] = useState("");
  const [inspirationNotes, setInspirationNotes] = useState("");
  const [showMoreStyles, setShowMoreStyles] = useState(false);
  const [styleError, setStyleError] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submittedAt, setSubmittedAt] = useState("");
  // Answers are saved to localStorage so a refresh picks up where you left
  // off. `restored` gates both the first save (so defaults never overwrite
  // what's stored) and visibility (so step 1 doesn't flash before we jump to
  // the saved step). `interacted` gates autofocus: a restored step must not
  // grab focus (and scroll the page) on load.
  const [restored, setRestored] = useState(false);
  const [interacted, setInteracted] = useState(false);
  // Grid first: the form measures itself with the grid's height already applied.
  const gridRef = useStableHeight<HTMLDivElement>(step, !isTallStep(step));
  const formRef = useStableHeight<HTMLFormElement>(step, !isTallStep(step));
  const lenis = useSmoothScroll();
  const progress = useIntakeProgress();
  const { navigate } = usePageTransition();
  const [exampleIndex, setExampleIndex] = useState(0);
  const exampleCount = businessExamples?.length ?? 0;
  useEffect(() => {
    if (step !== 2 || exampleCount < 2) return;
    const timer = window.setInterval(
      () => setExampleIndex((i) => (i + 1) % exampleCount),
      4500
    );
    return () => window.clearInterval(timer);
  }, [step, exampleCount]);
  const reportStep = progress?.setStep;
  useEffect(() => {
    reportStep?.(step);
  }, [reportStep, step]);

  // Swapping steps briefly shortens the document (before the height ratchet
  // applies), which clamps the scroll position near the bottom of a page.
  // Remember it on the way out and put it back once both ratchets are set.
  const savedScroll = useRef<number | null>(null);
  // Set by the review step's "Edit" links: after changing that answer,
  // Continue returns straight to the review instead of replaying every step.
  const returnToReview = useRef(false);
  const goToStep = (next: Step) => {
    returnToReview.current = false;
    setConfirmed(false);
    savedScroll.current = window.scrollY;
    setInteracted(true);
    setStep(next);
  };
  const advance = (next: Step) => goToStep(returnToReview.current ? 9 : next);
  useLayoutEffect(() => {
    const y = savedScroll.current;
    savedScroll.current = null;
    if (y !== null && window.scrollY !== y) window.scrollTo(0, y);
  }, [step]);

  // When embedded in a longer page, every step change starts at the top of
  // the section (just under the sticky header), like following its nav
  // anchor. Keyed on the step actually changing — not on `lenis`, which
  // arrives after mount and must not scroll the page on load.
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);
  const previousStep = useRef(step);
  const scrollToSection = (id: string, duration?: number) => {
    const target = document.getElementById(id);
    if (!target) return;
    // A numeric position, not Lenis's element form (which also applies the
    // target's CSS scroll-margin and would land above the section).
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      (document.querySelector("header")?.offsetHeight ?? 0);
    const smooth = lenisRef.current;
    if (smooth) {
      smooth.scrollTo(top, {
        duration,
        easing: duration ? (t: number) => (1 - Math.cos(Math.PI * t)) / 2 : undefined,
      });
    } else window.scrollTo({ top, behavior: "smooth" });
  };
  useEffect(() => {
    // Until storage is restored `step` is still the default, and comparing it
    // with the restored step (set in the layout effect below) would read as a
    // step change and scroll the page down to this section on load.
    if (!restored || previousStep.current === step) return;
    previousStep.current = step;
    if (scrollToId) scrollToSection(scrollToId);
  }, [step, scrollToId, restored]);

  // Reading storage has to happen after hydration (the server can't know
  // it), so restoring is necessarily state set from an effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>;
        const text = (value: unknown) => (typeof value === "string" ? value : "");
        const savedType = options.some((o) => o.value === saved.projectType)
          ? (saved.projectType as string)
          : null;
        // Progress saved before the plan step existed had the review at 8.
        const legacyStep = saved.step === 8 && !("plan" in saved) ? 9 : saved.step;
        // The business-type question now lives on step 2.
        // 4 moved to step 2; 11 (domain & hosting) skips ahead to the style step while switched off.
        const migratedStep = legacyStep === 4 ? 2 : legacyStep === 11 && !DOMAIN_STEP_ENABLED ? 7 : legacyStep;
        const savedStep = [1, 2, 3, 5, 6, 7, 8, 9, 10, ...(DOMAIN_STEP_ENABLED ? [11] : [])].includes(
          migratedStep as number
        )
          ? (migratedStep as Step)
          : 1;
        setProjectType(savedType);
        setBusinessName(text(saved.businessName));
        setFirstName(text(saved.firstName));
        setEmail(text(saved.email));
        setPhone(text(saved.phone));
        setBusinessType(text(saved.businessType));
        setCurrentWebsite(text(saved.currentWebsite));
        const allowed = [...nextStepOptions, SOMETHING_ELSE];
        setNextSteps(
          Array.isArray(saved.nextSteps)
            ? saved.nextSteps.filter((v): v is string => typeof v === "string" && allowed.includes(v))
            : []
        );
        setOtherAction(text(saved.otherAction));
        const allowedAssets = [...assetOptions, OTHER_ASSET, NOT_READY];
        setOtherAsset(text(saved.otherAsset));
        const savedStyle = allStyleValues.includes(saved.styleDirection as string)
          ? (saved.styleDirection as string)
          : "";
        setStyleDirection(savedStyle);
        setShowMoreStyles(moreStyleOptions.some((o) => o.value === savedStyle));
        const savedPlan = planOptions.some((o) => o.value === saved.plan) ? (saved.plan as string) : "";
        setPlan(savedPlan);
        setTimeline(timelineOptions.some((o) => o.value === saved.timeline) ? (saved.timeline as string) : "");
        setNotes(typeof saved.notes === "string" ? saved.notes : "");
        setInspirationLink(text(saved.inspirationLink));
        setInspirationNotes(text(saved.inspirationNotes));
        setDomain(domainOptions.some((o) => o.value === saved.domain) ? (saved.domain as string) : "");
        setHosting(hostingOptions.some((o) => o.value === saved.hosting) ? (saved.hosting as string) : "");
        setSignatureType(
          savedPlan === "signature" && signatureOptions.some((o) => o.value === saved.signatureType)
            ? (saved.signatureType as string)
            : ""
        );
        setAssets(
          Array.isArray(saved.assets)
            ? saved.assets.filter((v): v is string => typeof v === "string" && allowedAssets.includes(v))
            : []
        );
        const savedSubmittedAt = text(saved.submittedAt);
        setSubmittedAt(savedSubmittedAt);
        // The thank-you screen is only resumable if we know when it was sent.
        const restoredStep = savedStep === 10 && !savedSubmittedAt ? 9 : savedStep;
        // Past step 1 needs a project type; otherwise start over.
        const resumeStep = savedType ? restoredStep : 1;
        previousStep.current = resumeStep; // restoring must not scroll the page
        setStep(resumeStep);
      }
    } catch {
      // Unreadable or blocked storage: just start fresh.
    }
    setRestored(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!restored) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step,
          submittedAt,
          projectType,
          businessName,
          firstName,
          email,
          phone,
          businessType,
          currentWebsite,
          nextSteps,
          otherAction,
          assets,
          otherAsset,
          styleDirection,
          plan,
          signatureType,
          timeline,
          notes,
          inspirationLink,
          inspirationNotes,
          domain,
          hosting,
        })
      );
    } catch {
      // Storage full/blocked: saving is best-effort.
    }
  }, [restored, step, submittedAt, projectType, businessName, firstName, email, phone, businessType, currentWebsite, nextSteps, otherAction, assets, otherAsset, styleDirection, plan, signatureType, timeline, notes, inspirationLink, inspirationNotes, domain, hosting]);

  const hiddenUntilRestored = restored ? undefined : { visibility: "hidden" as const };

  if (step === 1) {
    return (
      // Distinct keys remount the form per step. Without them React reuses the
      // step-2 "Back" button as step-1's "Continue" (type flips to submit) and
      // the same click that went back also submits.
      <form
        key="step-1"
        ref={formRef}
      style={hiddenUntilRestored}
        onSubmit={(event) => {
          event.preventDefault();
          // "Something else" isn't a website project: Continue sends it to the
          // general contact page instead of on to the next question.
          if (projectType === "other") navigate("/contact");
          else if (projectType) advance(2);
          else notify("Please choose an option to continue.");
        }}
      >
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start content-start mb-10"
        >
          <IntakeIntro
            eyebrow="Let’s start with where you are."
            title={
              <>
                What brings
                <br />
                you here today?
              </>
            }
            body={`Choose the answer that feels closest. We’ll keep the next questions relevant to your ${businessLabel}.`}
          />
          <div className="flex flex-col gap-3">
            {options.map((option) => (
              <IntakeOptionCard
                key={option.value}
                name="project_type"
                checked={projectType === option.value}
                onChange={() => setProjectType(option.value)}
                onClear={() => setProjectType(null)}
                {...option}
                description={option.description.replace("your business", `your ${businessLabel}`)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="w-full cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-6 border border-[var(--intake-fg)] hover:bg-[var(--intake-bg)] hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150"
          >
            Continue
          </button>

          <p className="mt-6 text-center text-[0.75rem] leading-4 tracking-widest uppercase intake-t-dim">
            No technical knowledge needed. Just tell us about your {businessLabel}.
          </p>
        </div>
      </form>
    );
  }

  if (step === 2) {
  return (
    <form
      key="step-2"
      ref={formRef}
      style={hiddenUntilRestored}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!businessName.trim()) {
          notify(`Please enter your ${businessLabel} name to continue.`);
          form.querySelector<HTMLInputElement>("#business_name")?.focus();
          return;
        }
        if (!businessType.trim()) {
          notify(`Please describe your ${businessLabel} to continue.`);
          form.querySelector<HTMLTextAreaElement>("#business_type")?.focus();
          return;
        }
        if (projectType === "replace_website" && !currentWebsite.trim()) {
          notify("Please enter your current website link or domain name to continue.");
          form.querySelector<HTMLInputElement>("#current_website")?.focus();
          return;
        }
        advance(3);
      }}
    >
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 md:gap-y-10 items-start content-start mb-10"
      >
        <IntakeIntro
          compact
          title={
            <>
              What is the name{" "}
              <br className="hidden sm:block" />
              of your {businessLabel}?
            </>
          }
          body="Enter the name your customers know."
        />
        <div>
          <label
            htmlFor="business_name"
            className="block text-[1.125rem] leading-7 font-bold uppercase tracking-wide mb-4"
          >
            {businessLabel} name
          </label>
          <input
            type="text"
            id="business_name"
            name="business_name"
            className="intake-input"
            placeholder="e.g. Acme Corp"
            autoComplete="organization"
            autoFocus={interacted}
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </div>

        <IntakeIntro
          compact
          title={
            <>
              What type{" "}
              <br className="hidden sm:block" />
              of {businessLabel}{" "}
              <br className="hidden sm:block" />
              do you own?
            </>
          }
          body={businessTypeHint}
        />
        <div>
          <label
            htmlFor="business_type"
            className="block text-[1.125rem] leading-7 font-bold uppercase tracking-wide mb-4"
          >
            Your answer
          </label>
          <textarea
            id="business_type"
            name="business_type"
            rows={4}
            className="intake-input intake-input--lg"
            placeholder={
              businessExamples?.length
                ? businessExamples[exampleIndex % businessExamples.length]
                : "e.g. florist, fitness studio, or auto repair"
            }
            autoComplete="off"
            value={businessType}
            onChange={(event) =>
              setBusinessType(event.target.value.replace(/\n/g, " "))
            }
            onKeyDown={(event) => {
              // It's a short answer: Enter submits rather than adding a line.
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
          />
        </div>

        {projectType === "replace_website" && (
          <>
            <IntakeIntro
              compact
              title={
                <>
                  What is your{" "}
                  <br className="hidden sm:block" />
                  current website?
                </>
              }
              body="Enter your website link or domain name."
            />
            <div>
              <label
                htmlFor="current_website"
                className="block text-[1.125rem] leading-7 font-bold uppercase tracking-wide mb-4"
              >
                Website link or domain
              </label>
              <input
                type="text"
                id="current_website"
                name="current_website"
                inputMode="url"
                className="intake-input"
                placeholder={`e.g. ${websiteExample}`}
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                value={currentWebsite}
                onChange={(event) => setCurrentWebsite(event.target.value)}
              />
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center gap-y-8">
        <button
          type="button"
          onClick={() => goToStep(1)}
          className="justify-self-start group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>{" "}
          Back
        </button>

        {otherIndustry && (
          <div className="col-span-2 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 flex flex-col items-center gap-2 text-center">
            <span className="text-[0.8125rem] leading-5 tracking-widest intake-t-dim uppercase">
              {otherIndustry.prompt}
            </span>
            <TransitionLink
              href={otherIndustry.href}
              className="text-[0.9375rem] leading-5 font-bold tracking-widest uppercase py-4 px-7 border intake-b-med hover:bg-[var(--intake-fg)] hover:text-[color:var(--intake-bg)]! transition-colors"
            >
              {otherIndustry.label} →
            </TransitionLink>
          </div>
        )}

        <button
          type="submit"
          className="col-start-2 row-start-1 md:col-start-3 justify-self-end cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
        >
          Continue
        </button>
      </div>
    </form>
  );
  }

  if (step === 3) {
  return (
    <form
      key="step-3"
      ref={formRef}
      style={hiddenUntilRestored}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const focus = (id: string) => form.querySelector<HTMLInputElement>(`#${id}`)?.focus();
        const details = {
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        };
        if (!details.firstName) {
          notify("Please enter your full name to continue.");
          return focus("first_name");
        }
        if (!details.email || !details.email.includes("@")) {
          notify(
            details.email
              ? "Please enter a valid email address to continue."
              : "Please enter your email address to continue."
          );
          return focus("email");
        }
        advance(5);
      }}
    >
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start content-start mb-10"
      >
        <IntakeIntro
          eyebrow="Your website details."
          title={
            <>
              Great! Where{" "}
              <br className="hidden sm:block" />
              should we{" "}
              <br className="hidden sm:block" />
              send your{" "}
              <br className="hidden sm:block" />
              website details?
            </>
          }
          body="This is how we reach you with updates and your project portal. Nothing else."
        />
        <div>
          <div className="flex flex-col gap-8 mb-6">
            <div>
              <label
                htmlFor="first_name"
                className="block text-[1.125rem] leading-7 font-bold uppercase tracking-wide mb-4"
              >
                Full name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                className="intake-input"
                placeholder="e.g. Maria Lopez"
                autoComplete="name"
                autoFocus={interacted}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[1.125rem] leading-7 font-bold uppercase tracking-wide mb-4"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="intake-input"
                placeholder="e.g. maria@business.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="flex items-baseline gap-3 text-[1.125rem] leading-7 font-bold uppercase tracking-wide mb-4"
              >
                Phone
                <span className="text-[0.75rem] leading-4 tracking-widest intake-t-dim font-normal">
                  (OPTIONAL)
                </span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="intake-input"
                placeholder="e.g. (213) 555-0123"
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>

          <p className="text-[0.875rem] leading-5 intake-t-dim tracking-wide">
            We never share your information.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => goToStep(2)}
          className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>{" "}
          Back
        </button>

        <button
          type="submit"
          className="cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
        >
          Continue
        </button>
      </div>
    </form>
  );
  }

  if (step === 5) {
  const somethingElse = nextSteps.includes(SOMETHING_ELSE);
  const toggleNextStep = (value: string) => {
    setNextSteps((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    );
    if (value === SOMETHING_ELSE) setOtherError(false);
  };

  return (
    <form
      key="step-5"
      ref={formRef}
      style={hiddenUntilRestored}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const other = otherAction.trim();
        if (somethingElse && !other) {
          notify("Please tell us what else customers should be able to do.");
          setOtherError(true);
          event.currentTarget.querySelector<HTMLInputElement>("#other_action")?.focus();
          return;
        }
        advance(6);
      }}
    >
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start content-start mb-10"
      >
        <IntakeIntro
          eyebrow="Your customers’ next step."
          title={
            <>
              What should{" "}
              <br className="hidden sm:block" />
              customers be{" "}
              <br className="hidden sm:block" />
              able to do?
            </>
          }
          body="Select all that apply. You can choose more than one."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nextStepOptions.map((option) => (
            <IntakeCheckCard
              key={option}
              name="next_steps"
              value={option}
              checked={nextSteps.includes(option)}
              onChange={() => toggleNextStep(option)}
            />
          ))}
          <div className="sm:col-span-2 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <IntakeCheckCard
                name="next_steps"
                value={SOMETHING_ELSE}
                checked={somethingElse}
                onChange={() => toggleNextStep(SOMETHING_ELSE)}
              />
            </div>
            {somethingElse && (
              <div className="intake-b-med border p-6">
                <label
                  htmlFor="other_action"
                  className="block text-base font-bold uppercase tracking-wide mb-4"
                >
                  What else should customers be able to do?
                </label>
                <input
                  type="text"
                  id="other_action"
                  name="other_action"
                  className={`intake-input${otherError ? " intake-input--error" : ""}`}
                  placeholder="Describe the action in a few words"
                  autoComplete="off"
                  autoFocus={interacted}
                  value={otherAction}
                  onChange={(event) => {
                    setOtherAction(event.target.value);
                    if (event.target.value.trim()) setOtherError(false);
                  }}
                />
                {otherError && (
                  <p className="mt-4 text-[0.75rem] leading-4 tracking-widest intake-t-dim uppercase">
                    Please describe the other action before continuing.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => goToStep(3)}
          className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>{" "}
          Back
        </button>

        <button
          type="submit"
          className="cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
        >
          Continue
        </button>
      </div>
    </form>
  );
  }

  if (step === 6) {
  const otherAssetChecked = assets.includes(OTHER_ASSET);
  // "I don't have these ready yet" and the real assets exclude each other.
  const toggleAsset = (value: string) => {
    setAssets((current) => {
      if (current.includes(value)) return current.filter((v) => v !== value);
      if (value === NOT_READY) return [NOT_READY];
      return [...current.filter((v) => v !== NOT_READY), value];
    });
    if (value === OTHER_ASSET || value === NOT_READY) setOtherAssetError(false);
  };

  return (
    <form
      key="step-6"
      ref={formRef}
      style={hiddenUntilRestored}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const other = otherAsset.trim();
        if (otherAssetChecked && !other) {
          notify("Please tell us what else you already have.");
          setOtherAssetError(true);
          event.currentTarget.querySelector<HTMLInputElement>("#other_asset")?.focus();
          return;
        }
        console.log("Intake Step Submitted:", {
          projectType,
          businessName: businessName.trim(),
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          businessType: businessType.trim(),
          steps: nextSteps,
          otherDetails: nextSteps.includes(SOMETHING_ELSE) ? otherAction.trim() : null,
          assets,
          otherAssetDetails: otherAssetChecked ? other : null,
        });
        advance(DOMAIN_STEP_ENABLED ? 11 : 7);
      }}
    >
      <div
        ref={gridRef}
        // 40px like the other steps, less the 17px the divider below takes,
        // so Back/Continue land in the same place on every step.
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start content-start mb-[23px]"
      >
        <IntakeIntro
          eyebrow="A quick look at what’s ready."
          title={
            <>
              What do you{" "}
              <br className="hidden sm:block" />
              already have?
            </>
          }
          body="Choose everything you have now. Missing something? That’s completely okay."
        />
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {assetOptions.map((option) => (
              <IntakeCheckCard
                key={option}
                name="assets"
                value={option}
                checked={assets.includes(option)}
                onChange={() => toggleAsset(option)}
              />
            ))}
            {/* One column on phones: "not ready yet" goes above "Other" so the
                Other text box opens directly under its own card. */}
            <div className="max-sm:order-2">
              <IntakeCheckCard
                name="assets"
                value={OTHER_ASSET}
                checked={otherAssetChecked}
                onChange={() => toggleAsset(OTHER_ASSET)}
              />
            </div>
            <div className="max-sm:order-1">
              <IntakeCheckCard
                name="assets"
                value={NOT_READY}
                checked={assets.includes(NOT_READY)}
                onChange={() => toggleAsset(NOT_READY)}
              />
            </div>
            {otherAssetChecked && (
              <div className="max-sm:order-3 sm:col-span-2 intake-b-med border p-6">
                <label
                  htmlFor="other_asset"
                  className="block text-base font-bold uppercase tracking-wide mb-4"
                >
                  What else do you already have?
                </label>
                <input
                  type="text"
                  id="other_asset"
                  name="other_asset"
                  className={`intake-input${otherAssetError ? " intake-input--error" : ""}`}
                  placeholder="Describe it in a few words"
                  autoComplete="off"
                  autoFocus={interacted}
                  value={otherAsset}
                  onChange={(event) => {
                    setOtherAsset(event.target.value);
                    if (event.target.value.trim()) setOtherAssetError(false);
                  }}
                />
                {otherAssetError && (
                  <p className="mt-4 text-[0.75rem] leading-4 tracking-widest intake-t-dim uppercase">
                    Please describe what you have before continuing.
                  </p>
                )}
              </div>
            )}
          </div>
          <p className="text-[0.75rem] leading-4 tracking-widest intake-t-dim uppercase">
            We’ll use this only to understand what may be needed next.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t-[1px] intake-b-med">
        <button
          type="button"
          onClick={() => goToStep(5)}
          className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>{" "}
          Back
        </button>

        <button
          type="submit"
          className="cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
        >
          Continue
        </button>
      </div>
    </form>
  );
  }

  if (step === 11) {
    return (
      <form
        key="step-11"
        ref={formRef}
        style={hiddenUntilRestored}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!domain) {
            notify("Please tell us whether you already own a domain name.");
            setDomainError(true);
            return;
          }
          if (!hosting) {
            notify("Please tell us whether you’ll need website hosting.");
            setHostingError(true);
            return;
          }
          advance(7);
        }}
      >
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start content-start mb-10"
        >
          <IntakeIntro
            compact
            eyebrow="Your website’s address."
            title={
              <>
                Do you already own{" "}
                <br className="hidden sm:block" />
                a domain name?
              </>
            }
            body="Your domain is your website address. If you’re unsure, choose “I’m not sure,” and we’ll help you figure it out."
          />
          <fieldset className="min-w-0">
            <legend className="sr-only">Do you already own a domain name?</legend>
            <div className="flex flex-col gap-3">
              {domainOptions.map((option) => (
                <IntakeOptionCard
                  key={option.value}
                  name="domain"
                  checked={domain === option.value}
                  onChange={() => {
                    setDomain(option.value);
                    setDomainError(false);
                  }}
                  onClear={() => setDomain("")}
                  {...option}
                />
              ))}
            </div>
            {domainError && (
              <p role="alert" className="mt-3 text-[0.75rem] leading-4 tracking-widest uppercase">
                Choose an answer to continue.
              </p>
            )}
          </fieldset>

          <IntakeIntro
            compact
            title={
              <>
                Will you need{" "}
                <br className="hidden sm:block" />
                website hosting?
              </>
            }
            body="Hosting is what keeps your website live online. If you’re unsure, choose “I’m not sure,” and we’ll help you figure it out."
          />
          <fieldset className="min-w-0">
            <legend className="sr-only">Will you need website hosting?</legend>
            <div className="flex flex-col gap-3">
              {hostingOptions.map((option) => (
                <IntakeOptionCard
                  key={option.value}
                  name="hosting"
                  checked={hosting === option.value}
                  onChange={() => {
                    setHosting(option.value);
                    setHostingError(false);
                  }}
                  onClear={() => setHosting("")}
                  {...option}
                />
              ))}
            </div>
            {hostingError && (
              <p role="alert" className="mt-3 text-[0.75rem] leading-4 tracking-widest uppercase">
                Choose an answer to continue.
              </p>
            )}
          </fieldset>
        </div>

        <div className="flex items-center justify-between pt-6 border-t-[1px] intake-b-med">
          <button
            type="button"
            onClick={() => goToStep(6)}
            className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>{" "}
            Back
          </button>

          <button
            type="submit"
            className="cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
          >
            Continue
          </button>
        </div>
      </form>
    );
  }

  if (step === 7) {
  // Clicking the chosen card again clears the choice.
  const chooseStyle = (value: string) => {
    setStyleDirection((current) => (current === value ? "" : value));
    setStyleError(false);
  };
  const explore = (name: string) => console.log(`Exploring website: ${name}`);

  return (
    <form
      key="step-7"
      ref={formRef}
      style={hiddenUntilRestored}
      noValidate
      data-fit-off
      onSubmit={(event) => {
        event.preventDefault();
        if (!styleDirection) {
          notify("Please choose a style, or let us choose for you.");
          setStyleError(true);
          event.currentTarget.querySelector<HTMLInputElement>('input[name="style-direction"]')?.focus();
          return;
        }
        if (!looksLikeLink(inspirationLink)) {
          notify("Please enter a valid website link, or leave it blank.");
          event.currentTarget.querySelector<HTMLInputElement>("#inspiration_link")?.focus();
          return;
        }
        advance(8);
      }}
    >
      <div ref={gridRef} className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-x-16 gap-y-6 items-start mb-10">
          <IntakeIntro
            eyebrow="A little visual inspiration."
            title={
              <>
                Which style
                <br />
                feels right for
                <br />
                your {businessLabel}?
              </>
            }
          />
          {/* Top padding = the eyebrow line + its margin, plus half the extra height of the
              title's first line, so the text sits level with "WHICH STYLE". */}
          <p className="text-base sm:text-lg leading-relaxed max-w-xl intake-t-dim md:pt-[3.6rem]">
            Choose an example for inspiration, not an exact template. We’ll customize your website. You can select a
            style, ask us to choose, or skip this step for now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {styleOptions.map((option) => (
            <IntakeStyleCard
              key={option.value}
              {...option}
              checked={styleDirection === option.value}
              onChange={() => chooseStyle(option.value)}
              onExplore={() => explore(option.title)}
            />
          ))}
        </div>

        {showMoreStyles && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {moreStyleOptions.map((option) => (
              <IntakeStyleCard
                key={option.value}
                {...option}
                checked={styleDirection === option.value}
                onChange={() => chooseStyle(option.value)}
                onExplore={() => explore(option.title)}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setShowMoreStyles((open) => !open)}
            className="cursor-pointer text-[0.75rem] leading-4 tracking-widest intake-t-dim uppercase hover:text-[var(--intake-fg)] transition-colors py-2 px-6 border intake-b-dim hover:border-[var(--intake-fg)]"
          >
            {showMoreStyles ? "Show me less" : "Show me more"}
          </button>
        </div>

        <AndOrDivider />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 items-start mb-10">
          <IntakeIntro
            compact
            title={
              <>
                Have a website{" "}
                <br className="hidden sm:block" />
                you like?
              </>
            }
            body={`Share a link to any website you like—even if it is not ${
              businessLabel === "business" ? "in your industry" : `a ${businessLabel.replace(" / ", " or ")}`
            }. Tell us what stands out, such as the colors, layout, photography, animations, or overall feeling.`}
          />
          <div>
            <label
              htmlFor="inspiration_link"
              className="block text-[1.125rem] leading-7 font-bold uppercase tracking-wide mb-4"
            >
              Website link — optional
            </label>
            <input
              type="text"
              inputMode="url"
              id="inspiration_link"
              name="inspiration_link"
              className="intake-input"
              placeholder="https://example.com"
              autoComplete="off"
              spellCheck={false}
              value={inspirationLink}
              onChange={(event) => setInspirationLink(event.target.value)}
            />

            <label
              htmlFor="inspiration_notes"
              className="block text-[1.125rem] leading-7 font-bold uppercase tracking-wide mt-8 mb-4"
            >
              What stands out? — optional
            </label>
            <textarea
              id="inspiration_notes"
              name="inspiration_notes"
              rows={4}
              maxLength={1000}
              className="intake-input"
              placeholder="Tell us what stands out, such as the colors, layout, photography, animations, or overall feeling."
              autoComplete="off"
              value={inspirationNotes}
              onChange={(event) => setInspirationNotes(event.target.value)}
            />
          </div>
        </div>

        <AndOrDivider label="Or" />

        <div
          className={`intake-style-card intake-style-card--fill group relative flex items-center justify-between p-6${
            styleDirection === NOT_SURE ? " is-checked" : ""
          }`}
        >
          <input
            type="radio"
            id="style-notsure"
            name="style-direction"
            value={NOT_SURE}
            checked={styleDirection === NOT_SURE}
            onChange={() => {}}
            onClick={() => chooseStyle(NOT_SURE)}
            className="intake-radio"
          />
          <label
            htmlFor="style-notsure"
            aria-label="I'm not sure. Choose for me."
            className="absolute inset-0 z-10 cursor-pointer"
          />
          <span className="font-bold text-base sm:text-lg uppercase tracking-wide z-0">
            I’m not sure. Choose for me.
          </span>
          <div className="intake-style-card__box w-5 h-5 flex items-center justify-center z-0 pointer-events-none">
            <svg
              className={`w-3.5 h-3.5 text-[var(--intake-bg)] transition-opacity ${
                styleDirection === NOT_SURE ? "opacity-100" : "opacity-0"
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
        </div>

        {styleError && (
          <p
            role="alert"
            className="mt-8 text-[0.75rem] leading-4 tracking-widest uppercase text-center"
          >
            Choose a direction to continue, or let us choose for you.
          </p>
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 pt-6 border-t-[1px] intake-b-med">
        <button
          type="button"
          onClick={() => goToStep(DOMAIN_STEP_ENABLED ? 11 : 6)}
          className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2 justify-self-start"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>{" "}
          Back
        </button>

        <button
          type="button"
          onClick={() => {
            setStyleError(false);
            advance(8);
          }}
          className="justify-self-center cursor-pointer text-[0.75rem] leading-4 tracking-widest intake-t-dim uppercase hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2"
        >
          Skip for now
        </button>

        <button
          type="submit"
          className="justify-self-end cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
        >
          Continue
        </button>
      </div>
    </form>
  );
  }

  if (step === 8) {
    return (
      <form
        key="step-8"
        ref={formRef}
        style={hiddenUntilRestored}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!plan) {
            notify("Please choose a plan, or tell us you’re not sure.");
            setPlanError(true);
            return;
          }
          if (plan === "signature" && !signatureType) {
            notify("Please choose the kind of Tailored project you want.");
            setPlanError(true);
            return;
          }
          if (!timeline) {
            notify("Please tell us when you’d like your website ready.");
            setTimelineError(true);
            return;
          }
          advance(9);
        }}
      >
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start content-start mb-10"
        >
          <div className="md:col-start-1 md:row-start-1">
            <IntakeIntro
              eyebrow={pricing ? `${pricing.label} plans.` : "One last thing."}
              title={
                <>
                  Which plan
                  <br />
                  would you want?
                </>
              }
              body="Pick the one that feels closest. Nothing is locked in — we’ll confirm the details and pricing with you before anything starts."
            />
            {pricing && (
              <button
                type="button"
                // A long trip up the page: slower than a step change, eased at both ends.
                onClick={() => scrollToSection(pricing.id, 2.2)}
                className="mt-8 cursor-pointer text-[0.75rem] sm:text-[0.9375rem] leading-6 font-bold tracking-wider uppercase whitespace-nowrap py-5 px-5 sm:px-7 border-2 border-[var(--intake-fg)] max-sm:w-full hover:bg-[var(--intake-fg)] hover:text-[color:var(--intake-bg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)]"
              >
                <span aria-hidden="true" className="inline-block text-[1.7em] leading-none align-middle mr-2">
                  ↑
                </span>
                View {pricing.label} pricing
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 md:col-start-2 md:row-start-1">
            {planOptions.map((option) => (
              <Fragment key={option.value}>
                <IntakeOptionCard
                  name="plan"
                  checked={plan === option.value}
                  onChange={() => {
                    setPlan(option.value);
                    setPlanError(false);
                    if (option.value !== "signature") setSignatureType("");
                  }}
                  onClear={() => {
                    setPlan("");
                    setSignatureType("");
                  }}
                  {...option}
                />
                {option.value === "signature" && plan === "signature" && (
                  <div
                    role="group"
                    aria-label="What kind of Tailored project?"
                    className="flex flex-col gap-3 ml-4 pl-4 border-l-[1px] intake-b-med"
                  >
                    {signatureOptions.map((sub) => (
                      <IntakeOptionCard
                        key={sub.value}
                        name="signature_type"
                        checked={signatureType === sub.value}
                        onChange={() => {
                          setSignatureType(sub.value);
                          setPlanError(false);
                        }}
                        onClear={() => setSignatureType("")}
                        {...sub}
                      />
                    ))}
                  </div>
                )}
              </Fragment>
            ))}
            {planError && (
              <p role="alert" className="text-[0.75rem] leading-4 tracking-widest uppercase">
                {plan === "signature" ? "Choose the kind of Tailored project you want." : "Choose a plan to continue, or tell us you’re not sure."}
              </p>
            )}
          </div>
          <div className="md:col-start-2 md:row-start-2">
            <IntakeIntro
              compact
              title={
                <>
                  When do you need{" "}
                  <br className="hidden sm:block" />
                  your website?
                </>
              }
              body="Choose your preferred timeline. If you need your website sooner, expedited scheduling may be available for an additional fee."
            />
          </div>
          <fieldset className="md:col-start-1 md:row-start-2 min-w-0">
            <legend className="sr-only">When do you need your website?</legend>
            <div className="flex flex-col gap-3">
              {timelineOptions.map((option) => (
                <IntakeOptionCard
                  key={option.value}
                  name="timeline"
                  checked={timeline === option.value}
                  onChange={() => {
                    setTimeline(option.value);
                    setTimelineError(false);
                  }}
                  onClear={() => setTimeline("")}
                  {...option}
                />
              ))}
            </div>
            {timelineError && (
              <p role="alert" className="mt-3 text-[0.75rem] leading-4 tracking-widest uppercase">
                Choose when you’d like your website ready.
              </p>
            )}
          </fieldset>
        </div>

        <div className="flex items-center justify-between pt-6 border-t-[1px] intake-b-med">
          <button
            type="button"
            onClick={() => goToStep(7)}
            className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              ←
            </span>{" "}
            Back
          </button>

          <button
            type="submit"
            className="cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
          >
            Continue
          </button>
        </div>
      </form>
    );
  }

  if (step === 10) {
    return (
      <div key="step-10" style={hiddenUntilRestored}>
        <IntakeThanks
          businessName={businessName}
          businessLabel={businessLabel}
          reference={submittedAt}
          onStartOver={() => {
            setProjectType(null);
            setBusinessName("");
            setFirstName("");
            setEmail("");
            setPhone("");
            setBusinessType("");
            setCurrentWebsite("");
            setNextSteps([]);
            setOtherAction("");
            setOtherError(false);
            setAssets([]);
            setOtherAsset("");
            setOtherAssetError(false);
            setStyleDirection("");
            setPlan("");
            setPlanError(false);
            setSignatureType("");
            setTimeline("");
            setTimelineError(false);
            setInspirationLink("");
            setInspirationNotes("");
            setDomain("");
            setHosting("");
            setDomainError(false);
            setHostingError(false);
            setShowMoreStyles(false);
            setStyleError(false);
            setSubmittedAt("");
            goToStep(1);
            savedScroll.current = 0;
          }}
        />
      </div>
    );
  }

  const chosenStyle = [...styleOptions, ...moreStyleOptions].find((o) => o.value === styleDirection);
  const chosenPlan = planOptions.find((o) => o.value === plan);
  const chosenSignature = signatureOptions.find((o) => o.value === signatureType);
  const chosenTimeline = timelineOptions.find((o) => o.value === timeline);
  const chosenDomain = domainOptions.find((o) => o.value === domain);
  const chosenHosting = hostingOptions.find((o) => o.value === hosting);
  const typeText = businessType.trim();
  const review: ReviewData = {
    name: businessName.trim().toUpperCase(),
    businessType: typeText,
    goals: nextSteps.map((goal) =>
      goal === SOMETHING_ELSE && otherAction.trim() ? `${SOMETHING_ELSE}: ${otherAction.trim()}` : goal
    ),
    assets: assets.map((asset) =>
      asset === OTHER_ASSET && otherAsset.trim() ? `${OTHER_ASSET}: ${otherAsset.trim()}` : asset
    ),
    style: {
      link: inspirationLink.trim(),
      linkNotes: inspirationNotes.trim(),
      title: chosenStyle
        ? chosenStyle.title
        : styleDirection === NOT_SURE
          ? "Choose for me"
          : "Not chosen yet — we’ll choose for you",
    },
    plan: chosenPlan
      ? chosenPlan.value === "signature" && chosenSignature
        ? `${chosenPlan.title}: ${chosenSignature.title}`
        : chosenPlan.title
      : "Not chosen yet",
    timeline: chosenTimeline ? chosenTimeline.title : "Not chosen yet",
    domain: chosenDomain ? chosenDomain.title : "Not chosen yet",
    hosting: chosenHosting ? chosenHosting.title : "Not chosen yet",
  };
  const editStep = { name: 2, type: 2, goals: 5, assets: 6, style: 7, plan: 8, timeline: 8, domain: 11 } as const;
  const edit = (section: keyof typeof editStep) => {
    goToStep(editStep[section]);
    returnToReview.current = true;
  };

  return (
    <form
      key="step-9"
      ref={formRef}
      style={hiddenUntilRestored}
      noValidate
      data-fit-off
      onSubmit={(event) => {
        event.preventDefault();
        // Continue only appears once the box is ticked; this is just a guard.
        if (!confirmed) return;
        console.log("Intake Summary Confirmed:", {
          projectType,
          businessName: businessName.trim(),
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          businessType: typeText,
          currentWebsite: projectType === "replace_website" ? currentWebsite.trim() : "",
          customerGoals: review.goals,
          existingAssets: review.assets,
          styleDirection: chosenStyle ? chosenStyle.title : styleDirection === NOT_SURE ? "Choose for me" : "Not chosen",
          plan: review.plan,
          timeline: chosenTimeline ? chosenTimeline.title : "",
          ...(DOMAIN_STEP_ENABLED
            ? {
                domain: chosenDomain ? chosenDomain.title : "",
                hosting: chosenHosting ? chosenHosting.title : "",
              }
            : {}),
          inspirationLink: inspirationLink.trim(),
          inspirationNotes: inspirationNotes.trim(),
          notes: notes.trim(),
        });
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
        const date = now.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" });
        setSubmittedAt(`${time} ${date}`);
        goToStep(10);
        savedScroll.current = 0;
      }}
    >
      <div ref={gridRef} className="mb-10">
        <div className="mb-10">
          <IntakeIntro
            eyebrow="A clear starting point."
            title={
              <>
                Here’s what we
                <br />
                know about{" "}
                <span
                  className="italic text-[var(--intake-bg)] px-3 box-decoration-clone"
                  // Background trimmed to the line box: a full-height one would run into the line above.
                  style={{
                    backgroundImage: "linear-gradient(var(--intake-fg), var(--intake-fg))",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "100% 82%",
                  }}
                >
                  {businessName.trim() ? businessName.trim().toUpperCase().replace(/\.+$/, "") : `YOUR ${businessLabel.toUpperCase()}`}
                </span>
                .
              </>
            }
            body="Take a quick look and make sure everything feels right. You can go back and make changes if you need to."
          />
        </div>

        <IntakeReview
          data={review}
          businessLabel={businessLabel}
          onEdit={edit}
          confirmed={confirmed}
          onConfirmedChange={setConfirmed}
          notes={notes}
          onNotesChange={setNotes}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t-[1px] intake-b-med gap-6">
        <button
          type="button"
          onClick={() => goToStep(8)}
          className="group cursor-pointer flex items-center gap-3 text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase intake-t-dim hover:text-[var(--intake-fg)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] p-2 -ml-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>{" "}
          Review your plan choice
        </button>

        <button
          type="submit"
          disabled={!confirmed}
          // Hidden (not removed) until confirmed, so the row doesn't change height.
          style={{ visibility: confirmed ? "visible" : "hidden" }}
          className="max-sm:w-full cursor-pointer bg-[var(--intake-fg)] text-[var(--intake-bg)] font-bold text-[1.125rem] leading-7 tracking-[0.15em] uppercase py-4 px-8 border border-[var(--intake-fg)] hover:bg-transparent hover:text-[var(--intake-fg)] focus:outline-none focus:ring-2 focus:ring-[var(--intake-fg)] focus:ring-offset-2 focus:ring-offset-[var(--intake-bg)] transition-colors duration-150 rounded-none"
        >
          Submit for a quote
        </button>
      </div>
    </form>
  );
}
