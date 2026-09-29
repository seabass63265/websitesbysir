"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "From Domain To Launch" — the four-stage engagement, laid out as a
 * four-column grid on desktop and stacked on mobile.
 */
export default function ProcessSection() {
  const t = useT();
  const steps = [
    {
      number: "1",
      name: t("Domain Setup", "Configuración de Dominio"),
      body: t(
        "Already have a domain? We'll connect it. Need one? I'll help you find and purchase the right domain under your startup's name.",
        "¿Ya tienes un dominio? Lo conectaremos. ¿Necesitas uno? Te ayudaré a encontrar y comprar el dominio correcto a nombre de tu startup."
      ),
    },
    {
      number: "2",
      name: t("Architecture", "Arquitectura"),
      body: t(
        "Structuring your product story, features, pricing, and sign-up flow, and setting up connections to your analytics, email, and CRM tools.",
        "Estructurando la historia de tu producto, características, precios, y flujo de registro, y configurando conexiones a tus herramientas de analítica, correo, y CRM."
      ),
    },
    {
      number: "3",
      name: t("Design & Build", "Diseño y Desarrollo"),
      body: t(
        "Custom UI/UX design and development tailored to your brand and product, optimized for speed and performance across all devices.",
        "Diseño UI/UX personalizado y desarrollo a la medida de tu marca y producto, optimizado para velocidad y rendimiento en todos los dispositivos."
      ),
    },
    {
      number: "4",
      name: t("Launch & QA", "Lanzamiento y Control de Calidad"),
      body: t(
        "Rigorous testing on phones, tablets, and computers before going live. *Domain and third-party fees billed separately.",
        "Pruebas rigurosas en teléfonos, tabletas, y computadoras antes de salir en vivo. *Los costos de dominio y terceros se facturan por separado."
      ),
    },
  ];

  return (
    <NumberedSection
      n="01"
      label={t("Process", "Proceso")}
      id="process"
      tag={t("01 / FULL SERVICE PROCESS", "01 / PROCESO DE SERVICIO COMPLETO")}
    >
      <div className="pad-global border-b">
        <h2 className="text-lg">{t("From Domain To Launch", "Del Dominio Al Lanzamiento")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.name}
            className={`pad-global${
              index < steps.length - 1 ? " border-b md:border-b-0 border-r" : ""
            }`}
          >
            <div className="text-huge" style={{ opacity: 0.2, marginBottom: "1rem" }}>
              {step.number}
            </div>
            <h3
              className="text-sm"
              style={{ fontSize: "1rem", marginBottom: "1rem" }}
            >
              {step.name}
            </h3>
            <p
              className="text-xs"
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.5,
                opacity: 0.8,
                textTransform: "none",
                letterSpacing: "normal",
              }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </NumberedSection>
  );
}
