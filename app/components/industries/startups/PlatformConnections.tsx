"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Built Around the Tools You Already Use" — the forms, email, analytics,
 * payment, and community platforms a startup already runs on, grouped by
 * job.
 * Same layout as the Restaurants page's tools section.
 */
export default function PlatformConnections() {
  const t = useT();
  const categories = [
    {
      name: t("Waitlists, Forms & Demos", "Listas de Espera, Formularios y Demos"),
      tools: ["Typeform", "Tally", "Airtable", "Calendly", "Cal.com", "Zapier"],
    },
    {
      name: t("Email & CRM", "Correo y CRM"),
      tools: ["Mailchimp", "Brevo", "Beehiiv", "HubSpot", "Intercom"],
    },
    {
      name: t("Analytics & Growth", "Analítica y Crecimiento"),
      tools: ["Google Analytics", "PostHog", "Mixpanel", "Hotjar", "Plausible"],
    },
    {
      name: t("Payments & Billing", "Pagos y Facturación"),
      tools: ["Stripe", "Paddle", "PayPal"],
    },
    {
      name: t("Community & Social", "Comunidad y Redes Sociales"),
      tools: [
        "LinkedIn",
        "Twitter/X",
        "Product Hunt",
        "Discord",
        "Slack",
        "YouTube",
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
        <h2 className="text-lg">{t("Your systems, connected.", "Tus sistemas, conectados.")}</h2>
      </div>

      <div className="pad-global">
        <p className="text-md" style={{ marginBottom: "2.5rem" }}>
          {t(
            "Your website can connect with the analytics, email, payment, scheduling, and community platforms your startup already uses.",
            "Tu sitio web puede conectarse con las plataformas de analítica, correo, pagos, programación, y comunidad que tu startup ya usa."
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
