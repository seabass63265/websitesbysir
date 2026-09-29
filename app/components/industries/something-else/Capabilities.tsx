"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * written for projects that don't fit a standard mold.
 */
export default function Capabilities() {
  const t = useT();
  const capabilities = [
    {
      title: t("Custom Features", "Funciones Personalizadas"),
      body: t(
        "Forms, calculators, galleries, member areas, and anything else your project needs, built from scratch instead of bolted on.",
        "Formularios, calculadoras, galerías, áreas de miembros, y todo lo demás que tu proyecto necesite, construido desde cero en lugar de agregado después."
      ),
    },
    {
      title: t("Third-Party Integrations", "Integraciones con Terceros"),
      body: t(
        "Connect payments, email, calendars, databases, and the other systems you already rely on so everything works together.",
        "Conecta pagos, correo, calendarios, bases de datos, y los otros sistemas en los que ya confías para que todo funcione junto."
      ),
    },
    {
      title: t("Mobile-Responsive", "Adaptado a Móviles"),
      body: t(
        "A design that looks and works beautifully on phones, tablets, and computers, tested on real devices before launch.",
        "Un diseño que se ve y funciona hermosamente en teléfonos, tabletas, y computadoras, probado en dispositivos reales antes del lanzamiento."
      ),
    },
    {
      title: t("Accessibility & Usability", "Accesibilidad y Usabilidad"),
      body: t(
        "Clear navigation, readable content, accessible forms, and thoughtful interactions that make your website easier for everyone to understand and use.",
        "Navegación clara, contenido legible, formularios accesibles, e interacciones bien pensadas que hacen que tu sitio web sea más fácil de entender y usar para todos."
      ),
    },
    {
      title: t("Ongoing Support", "Soporte Continuo"),
      body: t(
        "Hosting, updates, and technical help after launch, so your website stays fast, secure, and current.",
        "Hosting, actualizaciones, y ayuda técnica después del lanzamiento, para que tu sitio web se mantenga rápido, seguro, y actualizado."
      ),
    },
    {
      title: t("And Much More", "Y Mucho Más"),
      body: t(
        "Whatever your project needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
        "Sea lo que necesite tu proyecto, podemos cumplirlo. Cuéntanos qué tienes en mente y lo construiremos alrededor de tus metas."
      ),
    },
  ];

  return (
    <NumberedSection
      n="02"
      label={t("Capabilities", "Capacidades")}
      id="capabilities"
      className="inverted"
      tag={t("02 / CORE CAPABILITIES", "02 / CAPACIDADES PRINCIPALES")}
    >
      <div className="pad-global border-b">
        <h2 className="text-lg">{t("What We Can Build", "Lo Que Podemos Construir")}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {capabilities.map((item, index) => {
          const isLastCol = (index + 1) % 3 === 0;
          const isLastRow = index >= capabilities.length - 3;
          return (
            <div
              key={item.title}
              className={`pad-global aspect-square flex flex-col justify-between hover:bg-bg hover:text-brand group transition-colors cursor-crosshair${
                isLastRow ? "" : " border-b"
              }${isLastCol ? "" : " border-r"}`}
            >
              <div
                className="group-hover:opacity-100"
                style={{ opacity: 0.5, marginBottom: "1rem", fontSize: "1.1rem" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-lg" style={{ marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    opacity: 0.8,
                    textTransform: "none",
                    letterSpacing: "normal",
                  }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </NumberedSection>
  );
}
