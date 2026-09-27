import BudgetScale from "@/app/components/marketing/BudgetScale";

/**
 * "Every budget" block on the homepage, directly under the WorkGrid
 * ("Why You Need A Website") section: headline, the highlighted promise, and
 * the sliding budget scale. Server component.
 */
export default function EveryBudget() {
  return (
    <section className="border-b-[1px]">
      <div className="max-w-[1152px] mx-auto px-6 py-20 md:py-24">
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="flex flex-col gap-4 md:shrink-0">
              <span className="text-brand/50 text-[0.75rem] md:text-[0.875rem] uppercase tracking-widest">
                Room for every budget.
              </span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.1]">
                Every <span className="italic font-normal">budget.</span>
              </h2>
            </div>

            <p className="text-brand/70 max-w-2xl md:flex-1 leading-relaxed text-[1.125rem] md:text-[1.25rem]">
              It{" "}
              <strong className="bg-brand text-bg font-bold px-[0.35em] py-[0.05em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                can be intimidating to see a polished website and assume it is
                outside your budget — but that&rsquo;s why SIR_ is here.
              </strong>{" "}
              We work with businesses at every stage and offer options for a
              range of budgets, from simple, focused websites to fully custom
              builds.
            </p>
          </div>

          <BudgetScale />

          <p className="text-brand/50 text-[0.875rem]">
            Tell us what you need and what you&rsquo;re comfortable spending,
            and we&rsquo;ll help you find the right place to start.
          </p>
        </div>
      </div>
    </section>
  );
}
