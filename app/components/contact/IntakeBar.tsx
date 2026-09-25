import { TransitionLink } from "@/app/components/providers/PageTransition";
import { IntakeStepLabel, IntakeStepNote } from "@/app/components/contact/IntakeProgress";

/** Top row of the intake — wordmark and step progress over a hairline rule. */
export default function IntakeBar() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-12 border-b-[1px] intake-b-med pb-10">
      <TransitionLink
        href="/"
        className="justify-self-start text-[0.875rem] leading-5 font-bold tracking-[0.15em] uppercase"
      >
        SIR_
      </TransitionLink>
      <IntakeStepNote />
      <span className="col-start-3 row-start-1 justify-self-end text-base leading-6 tracking-widest intake-t-dim uppercase">
        <IntakeStepLabel />
      </span>
    </div>
  );
}
