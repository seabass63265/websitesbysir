/**
 * Statement band under the /why-sir helmet scene — a headline and a
 * one-line promise about budgets. Server component.
 */
export default function BudgetStatement() {
  return (
    <section
      className="pad-global border-b budget-statement"
      style={{ textAlign: "center" }}
    >
      {/* Container-relative font size: on wide screens the 37-character line
          always fits the content width on one line (monospace ≈ 0.6em per
          character). On phones that made it tiny, so it stacks as three big
          lines instead — see `.budget-statement__title` in globals.css. */}
      <div style={{ containerType: "inline-size" }}>
        <h2 className="text-huge budget-statement__title">
          All businesses.
          <br className="budget-statement__break" /> All budgets.
          <br className="budget-statement__break" /> Seriously_
        </h2>
      </div>
      <p className="text-md" style={{ textTransform: "uppercase" }}>
        Big or small, we&rsquo;ll work with your budget.
      </p>
    </section>
  );
}
