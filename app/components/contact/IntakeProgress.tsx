"use client";

import { createContext, useContext, useState } from "react";

/**
 * The domain & hosting step (internal step 11, between the assets step and
 * the style step) is built but switched off. Set this to true to bring back
 * the step, its review section and its place in the step count.
 */
export const DOMAIN_STEP_ENABLED = false;

// The screens people walk through, in order, by the form's internal step
// numbers (4 no longer exists: business name + type share step 2).
const STEP_ORDER = DOMAIN_STEP_ENABLED
  ? [1, 2, 3, 5, 6, 11, 7, 8, 9]
  : [1, 2, 3, 5, 6, 7, 8, 9];
export const TOTAL_STEPS = STEP_ORDER.length;

type Progress = { step: number; setStep: (step: number) => void };

const IntakeProgressContext = createContext<Progress | null>(null);

/** Lets the intake bar (top row) show which step the form (below it) is on. */
export function IntakeProgressProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  return (
    <IntakeProgressContext.Provider value={{ step, setStep }}>
      {children}
    </IntakeProgressContext.Provider>
  );
}

export function useIntakeProgress(): Progress | null {
  return useContext(IntakeProgressContext);
}

/** "STEP 03 / 08" */
export function IntakeStepLabel() {
  const progress = useIntakeProgress();
  const pad = (n: number) => String(n).padStart(2, "0");
  const step = progress?.step ?? 1;
  const shown = STEP_ORDER.indexOf(step) + 1;
  if (shown === 0) return <>Confirmed</>;
  return (
    <>
      Step {pad(shown)} / {pad(TOTAL_STEPS)}
    </>
  );
}

/** Shown in the middle of the top row on the first question only. */
export function IntakeStepNote() {
  const progress = useIntakeProgress();
  if ((progress?.step ?? 1) !== 1) return null;
  return (
    <span className="col-span-3 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1 mt-6 md:mt-0 text-center text-[0.9375rem] sm:text-[1.125rem] leading-7 font-bold tracking-[0.15em] uppercase">
      {TOTAL_STEPS} quick questions. About 5 minutes.
      <br className="hidden md:block" /> And hear back within 2–3 business days.
    </span>
  );
}
