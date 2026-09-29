"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Built Around the Tools You Already Use" — the booking, social, email,
 * media, and payment platforms a creator or personal brand already uses,
 * grouped by job.
 * Same layout as the Restaurants page's tools section.
 */
export default function PlatformConnections() {
  const t = useT();
  const categories = [
    {
      name: t("Booking & Scheduling", "Reservas y Programación"),
      tools: ["Calendly", "Cal.com", "Google Calendar", "Square Appointments"],
    },
    {
      name: t("Social Media", "Redes Sociales"),
      tools: [
        "Instagram",
        "TikTok",
        "YouTube",
        "Facebook",
        "LinkedIn",
        "Twitter/X",
        "Pinterest",
      ],
    },
    {
      name: t("Newsletters & Email", "Boletines y Correo"),
      tools: ["Mailchimp", "Substack", "Beehiiv", "Kit", "Brevo"],
    },
    {
      name: t("Portfolio, Media & Payments", "Portafolio, Medios y Pagos"),
      tools: [
        "Behance",
        "Dribbble",
        "Vimeo",
        "SoundCloud",
        "Spotify",
        "Stripe",
        "PayPal",
        "Venmo",
      ],
    },
  ];

  return (
    <NumberedSection
      n="03"
      label={t("Built Around the Tools You Already Use", "Construido Alrededor de las Herramientas que Ya Usas")}
      id="platforms"
      tag={t("03 / CONNECT YOUR TOOLS", "03 / CONECTA TUS HERRAMIENTAS")}
    >
      <div className="pad-global border-b">
        <h2 className="text-lg">{t("Your platforms, connected.", "Tus plataformas, conectadas.")}</h2>
      </div>

      <div className="pad-global">
        <p className="text-md" style={{ marginBottom: "2.5rem" }}>
          {t(
            "Your website can connect with the booking, social, newsletter, media, and payment platforms you already use.",
            "Tu sitio web puede conectarse con las plataformas de reservas, redes sociales, boletines, medios, y pagos que ya usas."
          )}
        </p>

        {categories.map((category, index) => (
          <div
            key={category.name}
            style={{
              marginBottom: index < categories.length - 1 ? "2.5rem" : "2rem",
            }}
          >
            <div className="text-sm tools-category__title">{category.name}</div>
            <div className="logo-grid">
              {category.tools.map((tool) => (
                <div key={tool} className="logo-item">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        ))}

        <p
          className="text-md inverted"
          style={{
            marginBottom: "1rem",
            padding: "1.25rem 1.5rem",
            fontWeight: 700,
          }}
        >
          {t(
            "Don't see the system you use? Just let us know — we can likely connect it.",
            "¿No ves el sistema que usas? Solo avísanos — probablemente podamos conectarlo."
          )}
        </p>
        <p className="text-xs" style={{ opacity: 0.7 }}>
          {t("Available integrations. Not official partnerships.", "Integraciones disponibles. No son alianzas oficiales.")}
        </p>
      </div>
    </NumberedSection>
  );
}
