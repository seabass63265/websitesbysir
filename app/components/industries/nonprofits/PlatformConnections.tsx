"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Built Around the Tools You Already Use" — the donation, event, email, and
 * social platforms a nonprofit already runs on, grouped by job. Same layout
 * as the Local Businesses page's tools section.
 */
export default function PlatformConnections() {
  const t = useT();
  const categories = [
    {
      name: t("Donations & Fundraising", "Donaciones y Recaudación de Fondos"),
      tools: ["Stripe", "PayPal", "Venmo", "Zeffy", "Givebutter", "Donorbox"],
    },
    {
      name: t("Events & Volunteers", "Eventos y Voluntarios"),
      tools: ["Eventbrite", "SignUpGenius", "Calendly", "Google Calendar"],
    },
    {
      name: t("Email & Donor Management", "Correo y Gestión de Donantes"),
      tools: ["Mailchimp", "Brevo", "Constant Contact", "Bloomerang", "Airtable"],
    },
    {
      name: t("Social & Communication", "Redes Sociales y Comunicación"),
      tools: ["Instagram", "Facebook", "YouTube", "Twitter/X", "WhatsApp"],
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
        <h2 className="text-lg">{t("Your systems, connected.", "Tus sistemas, conectados.")}</h2>
      </div>

      <div className="pad-global">
        <p className="text-md" style={{ marginBottom: "2.5rem" }}>
          {t(
            "Your website can connect with the donation, event, volunteer, email, and social platforms your organization already uses.",
            "Tu sitio web puede conectarse con las plataformas de donaciones, eventos, voluntariado, correo, y redes sociales que tu organización ya usa."
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
