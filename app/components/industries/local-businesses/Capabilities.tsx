"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * generalized for any local business rather than a single industry.
 */
export default function Capabilities() {
  const t = useT();
  const capabilities = [
    {
      title: t("Service & Product Pages", "Páginas de Servicios y Productos"),
      body: t(
        "Clear, mobile-friendly pages that explain what you offer, answer common questions, and help customers choose the right service.",
        "Páginas claras y adaptadas a móviles que explican lo que ofreces, responden preguntas comunes, y ayudan a los clientes a elegir el servicio correcto."
      ),
    },
    {
      title: t("Booking & Scheduling", "Reservas y Programación"),
      body: t(
        "Connect your website to the scheduling system you already use so customers can book appointments without calling.",
        "Conecta tu sitio web al sistema de programación que ya usas para que los clientes puedan reservar citas sin llamar."
      ),
    },
    {
      title: t("Quotes & Inquiry Forms", "Cotizaciones y Formularios de Consulta"),
      body: t(
        "Custom forms that collect the project details you need before responding, quoting, or scheduling a consultation.",
        "Formularios personalizados que recopilan los detalles del proyecto que necesitas antes de responder, cotizar, o programar una consulta."
      ),
    },
    {
      title: t("Local Search & Maps", "Búsqueda Local y Mapas"),
      body: t(
        "Help customers find your business with location pages, service areas, Google Maps, hours, and local search setup.",
        "Ayuda a los clientes a encontrar tu negocio con páginas de ubicación, áreas de servicio, Google Maps, horarios, y configuración de búsqueda local."
      ),
    },
    {
      title: t("Payments & Integrations", "Pagos e Integraciones"),
      body: t(
        "Connect payment platforms, customer-management tools, social media, reviews, and other systems your business already uses.",
        "Conecta plataformas de pago, herramientas de gestión de clientes, redes sociales, reseñas, y otros sistemas que tu negocio ya usa."
      ),
    },
    {
      title: t("And Much More", "Y Mucho Más"),
      body: t(
        "Whatever your business needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
        "Sea lo que necesite tu negocio, podemos cumplirlo. Cuéntanos qué tienes en mente y lo construiremos alrededor de tus metas."
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
