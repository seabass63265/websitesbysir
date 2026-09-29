"use client";

import BudgetScale from "@/app/components/marketing/BudgetScale";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Every budget" block on the homepage, directly under the WorkGrid
 * ("Why You Need A Website") section: headline, the highlighted promise, and
 * the sliding budget scale.
 */
export default function EveryBudget() {
  const t = useT();
  return (
    <section className="border-b-[1px]">
      <div className="max-w-[1152px] mx-auto px-6 py-20 md:py-24">
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="flex flex-col gap-4 md:shrink-0">
              <span className="text-brand/50 text-[0.75rem] md:text-[0.875rem] uppercase tracking-widest">
                {t("Room for every budget.", "Espacio para cada presupuesto.")}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.1]">
                {t("Every", "Cada")}{" "}
                <span className="italic font-normal">
                  {t("budget.", "presupuesto.")}
                </span>
              </h2>
            </div>

            <p className="text-brand/70 max-w-2xl md:flex-1 leading-relaxed text-[1.125rem] md:text-[1.25rem]">
              {t("It", "Puede")}{" "}
              <strong className="bg-brand text-bg font-bold px-[0.35em] py-[0.05em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                {t(
                  "can be intimidating to see a polished website and assume it is outside your budget — but that's why SIR_ is here.",
                  "ser intimidante ver un sitio web pulido y asumir que está fuera de tu presupuesto — pero para eso está SIR_."
                )}
              </strong>{" "}
              {t(
                "We work with businesses at every stage and offer options for a range of budgets, from simple, focused websites to fully custom builds.",
                "Trabajamos con negocios en cada etapa y ofrecemos opciones para distintos presupuestos, desde sitios simples y enfocados hasta desarrollos totalmente personalizados."
              )}
            </p>
          </div>

          <BudgetScale />

          <p className="text-brand/50 text-[0.875rem]">
            {t(
              "Tell us what you need and what you're comfortable spending, and we'll help you find the right place to start.",
              "Cuéntanos qué necesitas y cuánto te gustaría invertir, y te ayudaremos a encontrar el mejor punto de partida."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
