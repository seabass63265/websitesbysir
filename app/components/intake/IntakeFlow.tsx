"use client";

import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/app/components/providers/PageTransition";

const STORAGE_KEY = "sir_intake";

type Answers = {
  firstName: string;
  email: string;
  phone: string;
  businessType: string;
};

const EMPTY: Answers = { firstName: "", email: "", phone: "", businessType: "" };

// Steps are numbered to match the design's own "Step N" naming (steps 1–2
// aren't built yet). Add later steps here as they arrive.
const STEPS = ["contact", "business", "done"] as const;
const FIRST_STEP_NUMBER = 3;

type FieldProps = {
  id: string;
  label: React.ReactNode;
  type?: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  required?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange: (value: string) => void;
};

function Field({
  id,
  label,
  type = "text",
  value,
  placeholder,
  autoComplete,
  required,
  inputRef,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="intake__label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        ref={inputRef}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="intake__input"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

/**
 * Multi-step project intake at /start — full-screen navy grid, one question
 * group per screen. Answers are kept in state and saved to localStorage
 * (`sir_intake`) on each Continue; nothing is sent anywhere yet.
 */
export default function IntakeFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [businessName, setBusinessName] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const businessTypeRef = useRef<HTMLInputElement>(null);

  const step = STEPS[stepIndex];

  useEffect(() => {
    if (step === "contact") firstNameRef.current?.focus();
    if (step === "business") businessTypeRef.current?.focus();
  }, [step]);

  function update(field: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [field]: value }));
  }

  function persist(next: Answers) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore — answers still live in state for this visit.
    }
  }

  function goNext() {
    persist(answers);
    if (step === "contact") {
      // Business name (if an earlier step or link supplied one) personalizes
      // the next screen's eyebrow.
      try {
        const fromUrl = new URLSearchParams(window.location.search).get(
          "business"
        );
        setBusinessName(
          (fromUrl || localStorage.getItem("business") || "").trim()
        );
      } catch {
        setBusinessName("");
      }
    }
    setStepIndex((index) => index + 1);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (step === "contact") {
      if (!answers.firstName.trim()) return firstNameRef.current?.focus();
      if (!answers.email.trim() || !answers.email.includes("@"))
        return emailRef.current?.focus();
      goNext();
    } else if (step === "business") {
      if (!answers.businessType.trim()) return businessTypeRef.current?.focus();
      goNext();
    }
  }

  function goBack() {
    if (stepIndex === 0) window.history.back();
    else setStepIndex((index) => index - 1);
  }

  return (
    <main className="intake">
      <div className="intake__inner">
        <header className="intake__header">
          <div className="intake__topbar">
            <TransitionLink href="/" className="intake__brand">
              SIR_
            </TransitionLink>
            {step !== "done" && (
              <span className="intake__step">
                Step {String(FIRST_STEP_NUMBER + stepIndex).padStart(2, "0")}
              </span>
            )}
          </div>

          {step === "contact" && (
            <>
              <span className="intake__eyebrow">Your website details.</span>
              <h1 className="intake__title">
                Great! Where
                <br className="intake__br" /> should we
                <br className="intake__br" /> send your
                <br className="intake__br" /> website details?
              </h1>
              <p className="intake__lead">
                This is how we reach you with updates and your project portal.
                Nothing else.
              </p>
            </>
          )}

          {step === "business" && (
            <>
              <span className="intake__eyebrow">
                {businessName
                  ? `A little about ${businessName}.`
                  : "A little about your business."}
              </span>
              <h1 className="intake__title">
                What type
                <br className="intake__br" /> of business
                <br className="intake__br" /> do you own?
              </h1>
              <p className="intake__lead">Describe it in a few words.</p>
            </>
          )}

          {step === "done" && (
            <>
              <span className="intake__eyebrow">All set for now.</span>
              <h1 className="intake__title">Thanks!</h1>
              <p className="intake__lead">
                We have what we need so far. More steps are coming soon.
              </p>
            </>
          )}
        </header>

        {step !== "done" && (
          <form onSubmit={onSubmit} noValidate>
            {step === "contact" && (
              <>
                <div className="intake__fields">
                  <Field
                    id="first_name"
                    label="First name"
                    value={answers.firstName}
                    placeholder="e.g. Maria"
                    autoComplete="given-name"
                    required
                    inputRef={firstNameRef}
                    onChange={(value) => update("firstName", value)}
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={answers.email}
                    placeholder="e.g. maria@business.com"
                    autoComplete="email"
                    required
                    inputRef={emailRef}
                    onChange={(value) => update("email", value)}
                  />
                  <Field
                    id="phone"
                    label={
                      <>
                        Phone <span className="intake__optional">(Optional)</span>
                      </>
                    }
                    type="tel"
                    value={answers.phone}
                    placeholder="e.g. (213) 555-0123"
                    autoComplete="tel"
                    onChange={(value) => update("phone", value)}
                  />
                </div>
                <p className="intake__note intake__note--spaced">
                  We never share your information.
                </p>
              </>
            )}

            {step === "business" && (
              <div className="intake__single">
                <Field
                  id="business_type"
                  label="Your answer"
                  value={answers.businessType}
                  placeholder="e.g. florist, fitness studio, or auto repair"
                  autoComplete="off"
                  required
                  inputRef={businessTypeRef}
                  onChange={(value) => update("businessType", value)}
                />
                <p className="intake__note">A few words are enough.</p>
              </div>
            )}

            <div className="intake__actions">
              <button type="button" className="intake__back" onClick={goBack}>
                <span aria-hidden="true">&larr;</span> Back
              </button>
              <button type="submit" className="intake__continue">
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
