"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * for portfolios and personal brands.
 */
export default function Capabilities() {
  const t = useT();
  const capabilities = [
    {
      title: t("Portfolio & Project Pages", "Páginas de Portafolio y Proyectos"),
      body: t(
        "Clean, mobile-friendly galleries and case studies that show your best work and the story behind it.",
        "Galerías limpias y adaptadas a móviles, y casos de estudio que muestran tu mejor trabajo y la historia detrás de él."
      ),
    },
    {
      title: t("Appointment Booking", "Reserva de Citas"),
      body: t(
        "Connect your website to the scheduling tool you already use so clients can book calls, sessions, or consultations without back-and-forth.",
        "Conecta tu sitio web a la herramienta de programación que ya usas para que los clientes puedan reservar llamadas, sesiones, o consultas sin ida y vuelta."
      ),
    },
    {
      title: t("Social Media Integration", "Integración con Redes Sociales"),
      body: t(
        "Link your Instagram, YouTube, TikTok, and other profiles so your website and your social presence work together.",
        "Enlaza tu Instagram, YouTube, TikTok, y otros perfiles para que tu sitio web y tu presencia social trabajen juntos."
      ),
    },
    {
      title: t("Testimonials & Reviews", "Testimonios y Reseñas"),
      body: t(
        "Showcase client praise, reviews, and press so visitors trust you before they ever reach out.",
        "Muestra elogios de clientes, reseñas, y prensa para que los visitantes confíen en ti antes de contactarte."
      ),
    },
    {
      title: t("Contact Forms & Newsletters", "Formularios de Contacto y Boletines"),
      body: t(
        "Custom inquiry forms that collect the details you need, plus a mailing list so visitors can subscribe and stay in touch.",
        "Formularios de consulta personalizados que recopilan los detalles que necesitas, además de una lista de correo para que los visitantes se suscriban y mantengan contacto."
      ),
    },
    {
      title: t("And Much More", "Y Mucho Más"),
      body: t(
        "Whatever your brand needs, we can meet it. Tell us what you have in mind and we'll build it around your goals.",
        "Sea lo que necesite tu marca, podemos cumplirlo. Cuéntanos qué tienes en mente y lo construiremos alrededor de tus metas."
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
