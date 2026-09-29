"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * written for startups at any stage, from idea to scale.
 */
export default function Capabilities() {
  const t = useT();
  const capabilities = [
    {
      title: t("Landing & Product Pages", "Páginas de Aterrizaje y Producto"),
      body: t(
        "Clear, fast pages that explain what you do, show the product, and turn visitors into sign-ups, demos, and customers.",
        "Páginas claras y rápidas que explican lo que haces, muestran el producto, y convierten visitantes en registros, demos, y clientes."
      ),
    },
    {
      title: t("Waitlists & Sign-Ups", "Listas de Espera y Registros"),
      body: t(
        "Collect emails and early-access requests with forms that flow straight into the email and CRM tools you already use.",
        "Recopila correos y solicitudes de acceso anticipado con formularios que fluyen directamente a las herramientas de correo y CRM que ya usas."
      ),
    },
    {
      title: t("Product Media", "Contenido del Producto"),
      body: t(
        "Integrate your existing walkthrough videos, product screenshots, and interactive previews into the website so visitors can see your product in action before signing up.",
        "Integra tus videos explicativos, capturas de pantalla del producto, y vistas previas interactivas existentes en el sitio web para que los visitantes vean tu producto en acción antes de registrarse."
      ),
    },
    {
      title: t("Investor & Press Pages", "Páginas para Inversionistas y Prensa"),
      body: t(
        "Traction, team, press, and pitch-friendly pages that make a strong first impression on investors, partners, and reporters.",
        "Páginas de tracción, equipo, prensa, y presentación que causan una fuerte primera impresión en inversionistas, socios, y periodistas."
      ),
    },
    {
      title: t("Reviews & Social Proof", "Reseñas y Prueba Social"),
      body: t(
        "Showcase customer reviews, testimonials, early-user feedback, and success stories that build trust and give visitors confidence in your startup.",
        "Muestra reseñas de clientes, testimonios, comentarios de usuarios tempranos, e historias de éxito que generan confianza y dan seguridad a los visitantes en tu startup."
      ),
    },
    {
      title: t("And Much More", "Y Mucho Más"),
      body: t(
        "Whatever your startup needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
        "Sea lo que necesite tu startup, podemos cumplirlo. Cuéntanos qué tienes en mente y lo construiremos alrededor de tus metas."
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
