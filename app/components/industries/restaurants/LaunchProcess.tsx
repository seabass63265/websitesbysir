"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "The Build Process" — from first sketch to launch. A horizontal flow
 * (stacked on mobile) followed by the five stages of the engagement.
 */
export default function LaunchProcess() {
  const t = useT();
  const steps = [
    {
      name: t("Discover", "Descubrir"),
      body: t(
        "We discuss your restaurant, customers, goals, budget, and the tools you currently use.",
        "Hablamos sobre tu restaurante, clientes, metas, presupuesto, y las herramientas que usas actualmente."
      ),
    },
    {
      name: t("Blueprint", "Plano"),
      body: t(
        "I organize your pages, menu, content, and customer journey before design begins.",
        "Organizo tus páginas, menú, contenido, y el recorrido del cliente antes de que empiece el diseño."
      ),
    },
    {
      name: t("Design & Build", "Diseño y Desarrollo"),
      body: t(
        "I create and develop a mobile-first website that reflects the feeling of your restaurant.",
        "Creo y desarrollo un sitio web enfocado en móviles que refleja la sensación de tu restaurante."
      ),
    },
    {
      name: t("Connect & Test", "Conectar y Probar"),
      body: t(
        "I connect ordering, reservations, maps, social platforms, and test everything across devices.",
        "Conecto pedidos, reservaciones, mapas, plataformas sociales, y pruebo todo en distintos dispositivos."
      ),
    },
    {
      name: t("Launch & Support", "Lanzamiento y Soporte"),
      body: t(
        "I connect your domain, publish the website, and provide continued hosting and maintenance.",
        "Conecto tu dominio, publico el sitio web, y proporciono hosting y mantenimiento continuos."
      ),
    },
  ];

  return (
    <NumberedSection
      n="01"
      label={t("The Build Process", "El Proceso de Desarrollo")}
      id="process"
      className="inverted"
      bodyClassName="pad-global"
    >
      <h2 className="text-lg" style={{ marginBottom: "1rem" }}>
        {t("From First Sketch to Launch", "Del Primer Boceto al Lanzamiento")}
      </h2>
      <p className="text-md" style={{ marginBottom: "2.5rem" }}>
        {t(
          "I plan the structure, design the experience, and engineer the final website—working with you through every stage.",
          "Planeo la estructura, diseño la experiencia, e ingenio el sitio web final—trabajando contigo en cada etapa."
        )}
      </p>

      <div className="build-flow">
        {steps.map((step, index) => (
          <div className="build-flow__item" key={step.name}>
            <div className="build-flow__step">{step.name}</div>
            {index < steps.length - 1 && (
              <div className="build-flow__arrow" aria-hidden="true">
                →
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid-container" style={{ gap: "2rem" }}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div
              key={step.name}
              className={isLast ? undefined : "border-b"}
              style={isLast ? undefined : { paddingBottom: "1rem" }}
            >
              <div
                className="text-sm build-step__label"
                style={{ marginBottom: "0.5rem" }}
              >
                {String(index + 1).padStart(2, "0")} &mdash; {step.name}
              </div>
              <div className="text-md">{step.body}</div>
            </div>
          );
        })}
      </div>
    </NumberedSection>
  );
}
