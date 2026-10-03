"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Choose Your Starting Point" — pricing cards. Layout follows a standard
 * SaaS-style pricing grid (spaced cards, big price up top, pill CTA,
 * checkmark feature list, one card called out as "Most Common"), re-themed
 * onto the SIR_ tokens (navy/white, Space Mono, square corners).
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
        "For restaurants and cafés that need a professional, easy-to-manage online presence.",
        "Para restaurantes y cafés que necesitan una presencia en línea profesional y fácil de administrar."
      ),
      price: "$1,500",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$140",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 3 pages", "Hasta 3 páginas"),
        t("Home page", "Página de inicio"),
        t("Digital menu page", "Página de menú digital"),
        t("Our Story page", "Página de Nuestra Historia"),
        t("DoorDash, Grubhub, Uber Eats, or Toast link", "Enlace a DoorDash, Grubhub, Uber Eats, o Toast"),
        t("Location, hours, and contact information", "Ubicación, horarios, e información de contacto"),
        t("Custom mobile-responsive design", "Diseño personalizado adaptado a móviles"),
        t("Google Maps", "Google Maps"),
        t("Social-media links", "Enlaces a redes sociales"),
        t("Basic SEO", "SEO básico"),
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
        t("Menu, pricing, hours, and media updates", "Actualizaciones de menú, precios, horarios, y medios"),
        t("Up to 30 minutes of website updates per month", "Hasta 30 minutos de actualizaciones al sitio web por mes"),
      ],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 2", "Nivel 2"),
      name: t("Growth", "Crecimiento"),
      blurb: t(
        "For restaurants and cafés that want their website to actively support ordering, reservations, and customer growth.",
        "Para restaurantes y cafés que quieren que su sitio web apoye activamente pedidos, reservaciones, y crecimiento de clientes."
      ),
      featured: true,
      price: "$2,250",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$180",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 6 pages", "Hasta 6 páginas"),
        t("Home page", "Página de inicio"),
        t("Digital menu page", "Página de menú digital"),
        t("Our Story page", "Página de Nuestra Historia"),
        t("Photo gallery page", "Página de galería de fotos"),
        t("Promotions & specials section page/banner", "Página o banner de promociones y especiales"),
        t("DoorDash, Grubhub, Uber Eats, or Toast link", "Enlace a DoorDash, Grubhub, Uber Eats, o Toast"),
        t("Location, hours, and contact information", "Ubicación, horarios, e información de contacto"),
        t("Reservation-system connection", "Conexión con sistema de reservaciones"),
        t("Yelp, Google, and Instagram connections", "Conexiones con Yelp, Google, e Instagram"),
        t("English and Spanish website option", "Opción de sitio web en inglés y español"),
        t("Basic SEO", "SEO básico"),
        t("Three revision rounds", "Tres rondas de revisión"),
      ],
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Menu, pricing, hours, and media updates", "Actualizaciones de menú, precios, horarios, y medios"),
        t("Seasonal menu and campaign deployments", "Lanzamientos de menús de temporada y campañas"),
        t("Promotional page sections and homepage announcements", "Secciones promocionales y anuncios en la página de inicio"),
        t("Website analytics and performance reporting", "Analítica del sitio web e informes de rendimiento"),
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
          {t("For", "Para")} <strong>{t("restaurants and cafés that need", "restaurantes y cafés que necesiten")}</strong>{" "}
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
        "Built around the restaurant's goals, needs, budget, and project scope.",
        "Construido alrededor de las metas, necesidades, presupuesto, y alcance del proyecto del restaurante."
      ),
      buildLabel: t("Your custom build may include:", "Tu desarrollo personalizado puede incluir:"),
      buildItems: [
        t("A custom page structure", "Una estructura de páginas personalizada"),
        t("Multiple menus or locations", "Múltiples menús o ubicaciones"),
        t("Digital menus and seasonal menu pages", "Menús digitales y páginas de menús de temporada"),
        t("Advanced ordering or reservation connections", "Conexiones avanzadas de pedidos o reservaciones"),
        t("Custom catering and private-event inquiry forms", "Formularios personalizados de consulta para banquetes y eventos privados"),
        t("English and Spanish website options", "Opciones de sitio web en inglés y español"),
        t("Custom interactions and animations", "Interacciones y animaciones personalizadas"),
        t("Copywriting and content support", "Apoyo en redacción y contenido"),
        t("Unique functionality built around your restaurant", "Funcionalidad única construida alrededor de tu restaurante"),
      ],
      monthlyLabel: t("Monthly website care may include:", "El cuidado mensual del sitio web puede incluir:"),
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Menu, pricing, hours, and media updates", "Actualizaciones de menú, precios, horarios, y medios"),
        t("Location updates", "Actualizaciones de ubicación"),
        t("Seasonal menus, specials, and announcements", "Menús de temporada, especiales, y anuncios"),
        t("Development support based on your selected plan", "Soporte de desarrollo según tu plan seleccionado"),
        t("Additional services tailored to your website", "Servicios adicionales a la medida de tu sitio web"),
      ],
      cta: t("Plan a Custom Project", "Planea un Proyecto Personalizado"),
    },
  ];

  return (
    <NumberedSection n="04" label={t("Pricing", "Precios")} id="pricing">
      <div className="pad-global border-b">
        <div className="text-sm" style={{ marginBottom: "0.5rem" }}>
          {t("Restaurants & Cafés Pricing", "Precios para Restaurantes y Cafés")}
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
              "Domain registration, ordering platforms, reservation systems, payment processing, and other third-party subscriptions are billed separately.",
              "El registro de dominio, plataformas de pedidos, sistemas de reservaciones, procesamiento de pagos, y otras suscripciones de terceros se facturan por separado."
            )}
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
