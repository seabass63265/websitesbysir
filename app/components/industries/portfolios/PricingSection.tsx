"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Choose Your Starting Point" — pricing cards for Portfolios & Personal
 * Brands. Same layout and `.tier-*` CSS as the Local Businesses pricing
 * section, with the copy written for creators and personal brands.
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
  const careItems = [
    t("Managed website hosting", "Hosting administrado del sitio web"),
    t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
    t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
    t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
    t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
  ];

  const tiers: Tier[] = [
    {
      level: t("Tier 1", "Nivel 1"),
      name: t("Essential", "Esencial"),
      blurb: t(
        "For creators and professionals who need one polished page to get their work online.",
        "Para creadores y profesionales que necesitan una página pulida para poner su trabajo en línea."
      ),
      price: "$750",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$80",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("One-page website", "Sitio web de una página"),
        t("Portfolio or work highlights", "Portafolio o trabajos destacados"),
        t("About / bio section", "Sección Acerca de / biografía"),
        t("Contact information and inquiry form", "Información de contacto y formulario de consulta"),
        t("Social media links", "Enlaces a redes sociales"),
        t("Custom mobile-responsive design", "Diseño personalizado adaptado a móviles"),
        t("Domain connection", "Conexión de dominio"),
        t("Testing and publishing", "Pruebas y publicación"),
        t("One revision round", "Una ronda de revisión"),
      ],
      monthlyLabel: t("Monthly website care includes:", "El cuidado mensual del sitio web incluye:"),
      monthlyItems: [...careItems, t("Content updates to your page", "Actualizaciones de contenido en tu página")],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 2", "Nivel 2"),
      name: t("Growth", "Crecimiento"),
      blurb: t(
        "For creators and professionals who need a clean, professional home for their work.",
        "Para creadores y profesionales que necesitan un hogar limpio y profesional para su trabajo."
      ),
      featured: true,
      price: "$1,250",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$120",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 3 pages", "Hasta 3 páginas"),
        t("Home page", "Página de inicio"),
        t("Portfolio or work gallery", "Portafolio o galería de trabajo"),
        t("About / Our Story page", "Página Acerca de / Nuestra Historia"),
        t("Contact information and inquiry form", "Información de contacto y formulario de consulta"),
        t("Social media links", "Enlaces a redes sociales"),
        t("Custom mobile-responsive design", "Diseño personalizado adaptado a móviles"),
        t("Domain connection", "Conexión de dominio"),
        t("Testing and publishing", "Pruebas y publicación"),
        t("Two revision rounds", "Dos rondas de revisión"),
      ],
      monthlyLabel: t("Monthly website care includes:", "El cuidado mensual del sitio web incluye:"),
      monthlyItems: [...careItems, t("Portfolio, project, and content updates", "Actualizaciones de portafolio, proyectos, y contenido")],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 3", "Nivel 3"),
      name: t("Tailored", "A la medida"),
      blurb: (
        <>
          {t("For", "Para")} <strong>{t("creators and personal brands that need", "creadores y marcas personales que necesiten")}</strong>{" "}
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
      caption: t("Built around your goals, needs, and budget.", "Construido alrededor de tus metas, necesidades, y presupuesto."),
      buildLabel: t("Your custom build may include:", "Tu desarrollo personalizado puede incluir:"),
      buildItems: [
        t("A custom page structure", "Una estructura de páginas personalizada"),
        t("Multiple portfolios or creative disciplines", "Múltiples portafolios o disciplinas creativas"),
        t("Individual projects and case studies", "Proyectos individuales y casos de estudio"),
        t("Custom galleries and media experiences", "Galerías personalizadas y experiencias multimedia"),
        t("Advanced booking and scheduling connections", "Conexiones avanzadas de reservas y programación"),
        t("Custom inquiry and collaboration forms", "Formularios personalizados de consulta y colaboración"),
        t("English and Spanish website options", "Opciones de sitio web en inglés y español"),
        t("Custom interactions and animations", "Interacciones y animaciones personalizadas"),
        t("Copywriting and personal-brand support", "Apoyo en redacción y marca personal"),
        t("Unique functionality built around your work", "Funcionalidad única construida alrededor de tu trabajo"),
      ],
      monthlyLabel: t("Monthly website care may include:", "El cuidado mensual del sitio web puede incluir:"),
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Portfolio, project, and content updates", "Actualizaciones de portafolio, proyectos, y contenido"),
        t("New work, case study, and media uploads", "Nuevos trabajos, casos de estudio, y subidas de medios"),
        t("Launch announcements and featured-work updates", "Anuncios de lanzamiento y actualizaciones de trabajo destacado"),
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
          {t("Portfolios & Personal Brands Pricing", "Precios para Portafolios y Marcas Personales")}
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
              "Domain registration, booking platforms, newsletter and email services, payment processing, and other third-party subscriptions are billed separately.",
              "El registro de dominio, plataformas de reservas, servicios de boletines y correo, procesamiento de pagos, y otras suscripciones de terceros se facturan por separado."
            )}
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
