"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Choose Your Starting Point" — pricing cards for Local Businesses. Same
 * layout and `.tier-*` CSS as the Restaurants & Cafés pricing section, with
 * the copy written for service-based local businesses.
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
        "For local businesses that need a simple, professional online presence.",
        "Para negocios locales que necesitan una presencia en línea simple y profesional."
      ),
      price: "$1,500",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$140",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 3 pages", "Hasta 3 páginas"),
        t("Home page", "Página de inicio"),
        t("Service or product pages", "Páginas de servicios o productos"),
        t("Location and hours", "Ubicación y horarios"),
        t("Google Maps integration", "Integración con Google Maps"),
        t("Contact information", "Información de contacto"),
        t("Custom mobile-responsive design", "Diseño personalizado adaptado a móviles"),
        t("Domain connection", "Conexión de dominio"),
        t("Testing and publishing", "Pruebas y publicación"),
        t("Two revision rounds", "Dos rondas de revisión"),
      ],
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Service, pricing, and content updates", "Actualizaciones de servicios, precios, y contenido"),
        t("Up to 30 minutes of website updates per month", "Hasta 30 minutos de actualizaciones al sitio web por mes"),
      ],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 2", "Nivel 2"),
      name: t("Growth", "Crecimiento"),
      blurb: t(
        "For local businesses that want their website to actively support bookings, appointments, and growth.",
        "Para negocios locales que quieren que su sitio web apoye activamente reservas, citas, y crecimiento."
      ),
      featured: true,
      price: "$2,000",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$200",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 6 pages", "Hasta 6 páginas"),
        t("Home page", "Página de inicio"),
        t("Service or product pages", "Páginas de servicios o productos"),
        t("Our Story page", "Página de Nuestra Historia"),
        t("Photo gallery", "Galería de fotos"),
        t("Online booking / scheduling connection", "Conexión de reservas / programación en línea"),
        t("Appointment or quote request forms", "Formularios de solicitud de citas o cotizaciones"),
        t("Location and hours", "Ubicación y horarios"),
        t("Yelp, Google, and Instagram connections", "Conexiones con Yelp, Google, e Instagram"),
        t("English and Spanish website option", "Opción de sitio web en inglés y español"),
        t("Three revision rounds", "Tres rondas de revisión"),
      ],
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Service, pricing, and content updates", "Actualizaciones de servicios, precios, y contenido"),
        t("Seasonal promotions and campaign deployments", "Promociones de temporada y lanzamientos de campañas"),
        t("Priority technical support and faster response times", "Soporte técnico prioritario y tiempos de respuesta más rápidos"),
        t("Up to one hour of website updates per month", "Hasta una hora de actualizaciones al sitio web por mes"),
      ],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 3", "Nivel 3"),
      name: t("Tailored", "A la medida"),
      blurb: (
        <>
          {t("For", "Para")} <strong>{t("local businesses that need", "negocios locales que necesiten")}</strong>{" "}
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
        "Built around the business's goals, needs, budget, and project scope.",
        "Construido alrededor de las metas, necesidades, presupuesto, y alcance del proyecto del negocio."
      ),
      buildLabel: t("Your custom build may include:", "Tu desarrollo personalizado puede incluir:"),
      buildItems: [
        t("A custom page structure", "Una estructura de páginas personalizada"),
        t("Multiple locations or service areas", "Múltiples ubicaciones o áreas de servicio"),
        t("Individual service or product pages", "Páginas individuales de servicios o productos"),
        t("Advanced booking or scheduling connections", "Conexiones avanzadas de reservas o programación"),
        t("Custom quote and inquiry forms", "Formularios personalizados de cotización y consulta"),
        t("English and Spanish website options", "Opciones de sitio web en inglés y español"),
        t("Custom interactions and animations", "Interacciones y animaciones personalizadas"),
        t("Copywriting and content support", "Apoyo en redacción y contenido"),
        t("Unique functionality built around your business", "Funcionalidad única construida alrededor de tu negocio"),
      ],
      monthlyLabel: t("Monthly website care may include:", "El cuidado mensual del sitio web puede incluir:"),
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Service, pricing, hours, and content updates", "Actualizaciones de servicios, precios, horarios, y contenido"),
        t("Location and service-area updates", "Actualizaciones de ubicación y área de servicio"),
        t("Seasonal promotions and announcements", "Promociones y anuncios de temporada"),
        t("Development support based on your selected plan", "Soporte de desarrollo según tu plan seleccionado"),
        t("Additional services tailored to your website", "Servicios adicionales a la medida de tu sitio web"),
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
          {t("Local Businesses Pricing", "Precios para Negocios Locales")}
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
              "Domain registration, scheduling and booking platforms, point-of-sale or CRM systems, payment processing, and other third-party subscriptions are billed separately.",
              "El registro de dominio, plataformas de reservas y programación, sistemas de punto de venta o CRM, procesamiento de pagos, y otras suscripciones de terceros se facturan por separado."
            )}
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
