"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * written for nonprofits and community organizations.
 */
export default function Capabilities() {
  const t = useT();
  const capabilities = [
    {
      title: t("Donations & Fundraising", "Donaciones y Recaudación de Fondos"),
      body: t(
        "Connect your donation platform so supporters can give one-time or monthly, with clear campaign pages and progress that show where gifts go.",
        "Conecta tu plataforma de donaciones para que los seguidores puedan dar una vez o mensualmente, con páginas de campaña claras y progreso que muestra a dónde van las donaciones."
      ),
    },
    {
      title: t("Events & Volunteer Sign-Ups", "Eventos y Registro de Voluntarios"),
      body: t(
        "Event calendars, RSVP pages, and volunteer forms that collect what you need and route sign-ups to the right person.",
        "Calendarios de eventos, páginas de confirmación de asistencia, y formularios de voluntariado que recopilan lo que necesitas y dirigen los registros a la persona correcta."
      ),
    },
    {
      title: t("Programs & Impact Pages", "Páginas de Programas e Impacto"),
      body: t(
        "Pages that explain your programs, share your story, and show your impact with photos, numbers, and testimonials.",
        "Páginas que explican tus programas, comparten tu historia, y muestran tu impacto con fotos, números, y testimonios."
      ),
    },
    {
      title: t("Newsletters & Outreach", "Boletines y Difusión"),
      body: t(
        "Email sign-ups connected to the tools you already use, plus social media, resources, and press pages that keep supporters informed.",
        "Registros de correo conectados a las herramientas que ya usas, además de redes sociales, recursos, y páginas de prensa que mantienen informados a los seguidores."
      ),
    },
    {
      title: t("Bilingual & Accessible", "Bilingüe y Accesible"),
      body: t(
        "English and Spanish versions and accessibility-minded design so everyone in your community can find help and get involved.",
        "Versiones en inglés y español y diseño pensado en accesibilidad para que todos en tu comunidad puedan encontrar ayuda e involucrarse."
      ),
    },
    {
      title: t("And Much More", "Y Mucho Más"),
      body: t(
        "Whatever your organization needs, we can meet it. Tell us what you have in mind and we'll build it around your mission.",
        "Sea lo que necesite tu organización, podemos cumplirlo. Cuéntanos qué tienes en mente y lo construiremos alrededor de tu misión."
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
