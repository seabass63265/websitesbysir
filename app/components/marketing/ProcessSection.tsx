"use client";

import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Process" — approach and investment.
 */
export default function ProcessSection() {
  const t = useT();
  return (
    <section id="process" className="pad-global border-b">
      <div className="info-block border-b">
        <div className="text-sm">{t("01 / Approach", "01 / Enfoque")}</div>
        <div className="text-md">
          {t(
            "Quick, clear, and focused. I build tools for independent businesses, startups, and personal brands. You work directly with me, Sebastian, from kickoff to launch.",
            "Rápido, claro, y enfocado. Construyo herramientas para negocios independientes, startups, y marcas personales. Trabajas directamente conmigo, Sebastian, desde el inicio hasta el lanzamiento."
          )}
        </div>
      </div>

      <div className="info-block">
        <div className="text-sm">{t("02 / Investment", "02 / Inversión")}</div>
        <div>
          <div className="text-md" style={{ marginBottom: "2rem" }}>
            {t(
              "No fixed prices or arbitrary tiers. Rates are strictly based on your specific needs, goals, features, and scope.",
              "Sin precios fijos ni niveles arbitrarios. Las tarifas se basan estrictamente en tus necesidades, metas, funciones, y alcance específicos."
            )}
          </div>

          <div
            className="grid-container"
            style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
          >
            <div>
              <div className="pill-tag" style={{ marginBottom: "1rem" }}>
                {t("Project Rate", "Tarifa del Proyecto")}
              </div>
              <div className="text-sm">
                {t(
                  "One-time flat fee covering custom design, full development, revisions, setup, and launch.",
                  "Cuota única que cubre diseño personalizado, desarrollo completo, revisiones, configuración, y lanzamiento."
                )}
              </div>
            </div>
            <div>
              <div className="pill-tag" style={{ marginBottom: "1rem" }}>
                {t("Service Fee", "Tarifa de Servicio")}
              </div>
              <div className="text-sm">
                {t(
                  "Monthly retainer covering hosting, maintenance, security, tech support, and content updates.",
                  "Pago mensual que cubre hosting, mantenimiento, seguridad, soporte técnico, y actualizaciones de contenido."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
