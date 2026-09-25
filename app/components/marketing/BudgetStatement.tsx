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
      {/* Container-relative font size: the 37-character line always fits the
          content width on one line (monospace ≈ 0.6em per character). */}
      <div style={{ containerType: "inline-size" }}>
        <h2
          className="text-huge"
          style={{
            fontSize: "3.5cqw",
            whiteSpace: "nowrap",
            marginBottom: "1.25rem",
          }}
        >
          All businesses. All budgets. Seriously_
        </h2>
      </div>
      <p className="text-md" style={{ textTransform: "uppercase" }}>
        Big or small, we&rsquo;ll work with your budget.
      </p>
    </section>
  );
}
