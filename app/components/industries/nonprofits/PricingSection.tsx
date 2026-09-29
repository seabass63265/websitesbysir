"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Choose Your Starting Point" — pricing cards for Nonprofits. Same layout
 * and `.tier-*` CSS as the Local Businesses pricing section, with the copy
 * written for nonprofits and community organizations.
 */
type Tier = {
  level: string;
  name: string;
  blurb: React.ReactNode;
  price: string;
  priceUnit?: string;
  monthlyPrice?: string;
  monthlyUnit?: string;
  caption?: string;
  buildItems: string[];
  monthlyItems?: string[];
  cta: string;
  featured?: boolean;
  /** Overrides "One-time build includes:". */
  buildLabel?: string;
  /** Overrides "Monthly service includes:". */
  monthlyLabel?: string;
};

export default function PricingSection() {
  const t = useT();
  const tiers: Tier[] = [
    {
      level: t("Tier 1", "Nivel 1"),
      name: t("Essential", "Esencial"),
      blurb: t(
        "For nonprofits and organizations that need a professional online home for their mission, programs, and community.",
        "Para organizaciones sin fines de lucro que necesitan un hogar en línea profesional para su misión, programas, y comunidad."
      ),
      price: "$1,500",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$120",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 4 pages", "Hasta 4 páginas"),
        t("Home page", "Página de inicio"),
        t("Mission and About page", "Página de Misión y Acerca de"),
        t("Programs or services page", "Página de programas o servicios"),
        t("Contact information and inquiry form", "Información de contacto y formulario de consulta"),
        t("Donation-platform connection", "Conexión con plataforma de donaciones"),
        t("Social media links", "Enlaces a redes sociales"),
        t("Custom mobile-responsive design", "Diseño personalizado adaptado a móviles"),
        t("Domain connection", "Conexión de dominio"),
        t("Basic search-engine setup", "Configuración básica de motores de búsqueda"),
        t("Basic accessibility considerations", "Consideraciones básicas de accesibilidad"),
        t("Two revision rounds", "Dos rondas de revisión"),
        t("Testing and publishing", "Pruebas y publicación"),
      ],
      monthlyLabel: t("Monthly website care includes:", "El cuidado mensual del sitio web incluye:"),
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Program, staff, and content updates", "Actualizaciones de programas, personal, y contenido"),
        t("Up to 30 minutes of website updates per month", "Hasta 30 minutos de actualizaciones al sitio web por mes"),
      ],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 2", "Nivel 2"),
      name: t("Growth", "Crecimiento"),
      blurb: t(
        "For nonprofits and organizations that want their website to actively support donations, volunteers, events, and community growth.",
        "Para organizaciones sin fines de lucro que quieren que su sitio web apoye activamente donaciones, voluntarios, eventos, y crecimiento comunitario."
      ),
      featured: true,
      price: "$2,250",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$180",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 7 pages", "Hasta 7 páginas"),
        t("Everything included in Essential", "Todo lo incluido en Esencial"),
        t("Individual program or initiative pages", "Páginas individuales de programas o iniciativas"),
        t("Donation-platform integration", "Integración con plataforma de donaciones"),
        t("Volunteer interest and registration forms", "Formularios de interés y registro de voluntarios"),
        t("Events or community-calendar connection", "Conexión con eventos o calendario comunitario"),
        t("Impact stories and testimonials", "Historias de impacto y testimonios"),
        t("Leadership, staff, or board profiles", "Perfiles de liderazgo, personal, o junta directiva"),
        t("Newsletter sign-up integration", "Integración de registro a boletín"),
        t("Resource and document sections", "Secciones de recursos y documentos"),
        t("English and Spanish website option", "Opción de sitio web en inglés y español"),
        t("Three revision rounds", "Tres rondas de revisión"),
        t("Testing and publishing", "Pruebas y publicación"),
      ],
      monthlyLabel: t("Monthly website care includes:", "El cuidado mensual del sitio web incluye:"),
      monthlyItems: [
        t("Everything included in Essential website care", "Todo lo incluido en el cuidado del sitio web Esencial"),
        t("Program, event, staff, and resource updates", "Actualizaciones de programas, eventos, personal, y recursos"),
        t("Donation-campaign and volunteer updates", "Actualizaciones de campañas de donación y voluntariado"),
        t("Impact story and testimonial updates", "Actualizaciones de historias de impacto y testimonios"),
        t("Seasonal campaigns and announcements", "Campañas y anuncios de temporada"),
        t("Priority technical support", "Soporte técnico prioritario"),
        t("Faster response times", "Tiempos de respuesta más rápidos"),
        t("Up to one hour of website updates per month", "Hasta una hora de actualizaciones al sitio web por mes"),
      ],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 3", "Nivel 3"),
      name: t("Tailored", "A la medida"),
      blurb: (
        <>
          {t("For", "Para")} <strong>{t("nonprofits and organizations that need", "organizaciones sin fines de lucro que necesiten")}</strong>{" "}
          {t(
            "something outside our standard packages—whether that means a focused website on",
            "algo fuera de nuestros paquetes estándar—ya sea un sitio web enfocado con"
          )}{" "}
          <strong>
            {t(
              "a smaller budget ($) or a fully customized digital experience ($$$).",
              "un presupuesto menor ($) o una experiencia digital totalmente personalizada ($$$)."
            )}
          </strong>
        </>
      ),
      price: t("Custom Pricing", "Precio Personalizado"),
      caption: t(
        "Built around your mission, community, required features, budget, and project scope.",
        "Construido alrededor de tu misión, comunidad, características requeridas, presupuesto, y alcance del proyecto."
      ),
      buildLabel: t("Your custom build may include:", "Tu desarrollo personalizado puede incluir:"),
      buildItems: [
        t("A custom page structure", "Una estructura de páginas personalizada"),
        t("Multiple programs, chapters, or locations", "Múltiples programas, capítulos, o ubicaciones"),
        t("Advanced donation and fundraising connections", "Conexiones avanzadas de donaciones y recaudación de fondos"),
        t("Volunteer registration and management workflows", "Flujos de registro y gestión de voluntarios"),
        t("Membership or community portals", "Portales de membresía o comunidad"),
        t("Event registration and ticketing connections", "Conexiones de registro de eventos y boletos"),
        t("Resource libraries and document collections", "Bibliotecas de recursos y colecciones de documentos"),
        t("Impact reports and success stories", "Informes de impacto e historias de éxito"),
        t("English and Spanish website options", "Opciones de sitio web en inglés y español"),
        t("Custom interactions and animations", "Interacciones y animaciones personalizadas"),
        t("Copywriting and mission-storytelling support", "Apoyo en redacción y narrativa de la misión"),
        t("Unique functionality built around your organization", "Funcionalidad única construida alrededor de tu organización"),
      ],
      monthlyLabel: t("Monthly website care may include:", "El cuidado mensual del sitio web puede incluir:"),
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Program, event, staff, and content updates", "Actualizaciones de programas, eventos, personal, y contenido"),
        t("Donation and volunteer campaign updates", "Actualizaciones de campañas de donación y voluntariado"),
        t("Impact story, resource, and announcement updates", "Actualizaciones de historias de impacto, recursos, y anuncios"),
        t("Development support based on your selected plan", "Soporte de desarrollo según tu plan seleccionado"),
        t("Additional services tailored to your organization", "Servicios adicionales a la medida de tu organización"),
      ],
      cta: t("Plan a Custom Project", "Planea un Proyecto Personalizado"),
    },
  ];

  return (
    <NumberedSection
      n="04"
      label={t("Pricing", "Precios")}
      id="pricing"
      className="inverted"
      tag={t("04 / PRICING", "04 / PRECIOS")}
    >
      <div className="pad-global border-b">
        <div className="text-sm" style={{ marginBottom: "0.5rem" }}>
          {t("Nonprofits & Organizations Pricing", "Precios para Organizaciones sin Fines de Lucro")}
        </div>
        <h2 className="text-lg" style={{ marginBottom: "1rem" }}>
          {t("Choose Your Starting Point", "Elige tu Punto de Partida")}
        </h2>
        <p className="text-md">
          {t(
            "A one-time flat fee covers the design, development, and launch. A monthly service fee covers hosting, maintenance, updates, and technical support. No hidden fees.",
            "Una cuota única cubre el diseño, desarrollo, y lanzamiento. Una tarifa de servicio mensual cubre hosting, mantenimiento, actualizaciones, y soporte técnico. Sin costos ocultos."
          )}
        </p>
      </div>

      <div className="tier-grid">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={
              tier.featured ? "tier-card tier-card--featured" : "tier-card"
            }
          >
            {tier.featured && (
              <div className="tier-card__badge">{t("Most Popular", "Más Popular")}</div>
            )}

            <div className="pill-tag tier-card__level">{tier.level}</div>
            <h3 className="text-lg">{tier.name}</h3>
            <p className="text-sm tier-card__blurb">{tier.blurb}</p>

            {tier.priceUnit && (
              <div className="tier-card__price-lead">{t("Starting at", "Desde")}</div>
            )}
            <div className="tier-card__price-row">
              <span className="tier-card__price">{tier.price}</span>
              {tier.priceUnit && (
                <span className="tier-card__price-unit">{tier.priceUnit}</span>
              )}
            </div>

            {tier.monthlyPrice ? (
              <div className="tier-card__monthly">
                <div className="tier-card__price-connector">
                  {t("and after, just", "y después, solo")}
                </div>
                <div className="tier-card__price-row tier-card__price-row--stacked">
                  <span className="tier-card__price">{tier.monthlyPrice}</span>
                  {tier.monthlyUnit && (
                    <span className="tier-card__price-unit">
                      {tier.monthlyUnit}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              tier.caption && (
                <div className="tier-card__caption">{tier.caption}</div>
              )
            )}

            <a href="#contact" className="btn-pill tier-card__cta">
              {tier.cta}
            </a>

            <div className="tier-list__group-label text-sm">
              {tier.buildLabel ?? t("One-time build includes:", "El desarrollo único incluye:")}
            </div>
            <ul className="tier-list text-xs">
              {tier.buildItems.map((label) => (
                <li key={label}>
                  <span className="tier-list__check" aria-hidden="true">
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            {tier.monthlyItems && (
              <>
                <div
                  className="tier-list__group-label text-sm"
                  style={{ marginTop: "1.5rem" }}
                >
                  {tier.monthlyLabel ?? t("Monthly service includes:", "El servicio mensual incluye:")}
                </div>
                <ul className="tier-list text-xs">
                  {tier.monthlyItems.map((label) => (
                    <li key={label}>
                      <span className="tier-list__check" aria-hidden="true">
                        ✓
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="tier-footnote">
        <div className="tier-footnote__item">
          <div className="tier-footnote__label text-sm">{t("Service Term", "Plazo de Servicio")}</div>
          <p>
            {t(
              "Both plans require an initial 12-month website service agreement. After the initial term, service renews every 6 months.",
              "Ambos planes requieren un contrato inicial de servicio de sitio web de 12 meses. Después del plazo inicial, el servicio se renueva cada 6 meses."
            )}
          </p>
        </div>
        <div className="tier-footnote__item">
          <div className="tier-footnote__label text-sm">{t("Third-Party Costs", "Costos de Terceros")}</div>
          <p>
            {t(
              "Domain registration, donation and fundraising platforms, payment processing fees, email and CRM systems, and other third-party subscriptions are billed separately.",
              "El registro de dominio, plataformas de donaciones y recaudación de fondos, comisiones de procesamiento de pagos, sistemas de correo y CRM, y otras suscripciones de terceros se facturan por separado."
            )}
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
