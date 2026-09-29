"use client";

import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Statement band under the /why-sir helmet scene — a headline and a
 * one-line promise about budgets.
 */
export default function BudgetStatement() {
  const t = useT();
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
          {t("All businesses.", "Todos los negocios.")}
          <br className="budget-statement__break" /> {t("All budgets.", "Todos los presupuestos.")}
          <br className="budget-statement__break" /> {t("Seriously_", "En serio_")}
        </h2>
      </div>
      <p className="text-md" style={{ textTransform: "uppercase" }}>
        {t("Big or small, we'll work with your budget.", "Grande o pequeño, trabajaremos con tu presupuesto.")}
      </p>
    </section>
  );
}
