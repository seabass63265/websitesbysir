"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Choose Your Starting Point" — pricing cards for Startups. Same
 * layout and `.tier-*` CSS as the Local Businesses pricing section, with the
 * copy written for early-stage and growing startups.
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
        "For early-stage startups that need a sharp, credible website to introduce their idea and start building interest.",
        "Para startups en etapa temprana que necesitan un sitio web claro y creíble para presentar su idea y empezar a generar interés."
      ),
      price: "$1,500",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$140",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 3 pages", "Hasta 3 páginas"),
        t("Home or product landing page", "Página de inicio o de aterrizaje del producto"),
        t("Product or service overview", "Resumen del producto o servicio"),
        t("About or team page", "Página Acerca de o del equipo"),
        t("Contact or early-access form", "Formulario de contacto o acceso anticipado"),
        t("Waitlist and email sign-up connection", "Conexión de lista de espera y registro por correo"),
        t("Product screenshots or media", "Capturas de pantalla o medios del producto"),
        t("Custom mobile-responsive design", "Diseño personalizado adaptado a móviles"),
        t("Domain connection", "Conexión de dominio"),
        t("Basic search-engine setup", "Configuración básica de motores de búsqueda"),
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
        t("Product, team, and content updates", "Actualizaciones de producto, equipo, y contenido"),
        t("Up to 30 minutes of website updates per month", "Hasta 30 minutos de actualizaciones al sitio web por mes"),
      ],
      cta: t("Request a Quote", "Solicitar una Cotización"),
    },
    {
      level: t("Tier 2", "Nivel 2"),
      name: t("Growth", "Crecimiento"),
      blurb: t(
        "For startups that want their website to actively drive sign-ups, demo requests, customer trust, and investor interest.",
        "Para startups que quieren que su sitio web impulse activamente registros, solicitudes de demo, confianza de clientes, e interés de inversionistas."
      ),
      featured: true,
      price: "$2,500",
      priceUnit: t("one-time build", "pago único de desarrollo"),
      monthlyPrice: "$220",
      monthlyUnit: t("per month\nfor hosting & maintenance", "al mes\npor hosting y mantenimiento"),
      buildItems: [
        t("Up to 7 pages", "Hasta 7 páginas"),
        t("Everything included in Essential", "Todo lo incluido en Esencial"),
        t("Individual product or feature pages", "Páginas individuales de producto o características"),
        t("Pricing or business-model page", "Página de precios o modelo de negocio"),
        t("Customer reviews and social proof", "Reseñas de clientes y prueba social"),
        t("Demo-booking integration", "Integración de reserva de demos"),
        t("Waitlist or early-access workflow", "Flujo de lista de espera o acceso anticipado"),
        t("Investor and press page", "Página para inversionistas y prensa"),
        t("Team and advisor profiles", "Perfiles del equipo y asesores"),
        t("Newsletter or CRM connection", "Conexión de boletín o CRM"),
        t("Product walkthroughs and media", "Recorridos del producto y medios"),
        t("Custom interactions and animations", "Interacciones y animaciones personalizadas"),
        t("Three revision rounds", "Tres rondas de revisión"),
        t("Testing and publishing", "Pruebas y publicación"),
      ],
      monthlyLabel: t("Monthly website care includes:", "El cuidado mensual del sitio web incluye:"),
      monthlyItems: [
        t("Everything included in Essential website care", "Todo lo incluido en el cuidado del sitio web Esencial"),
        t("Product, feature, pricing, and team updates", "Actualizaciones de producto, características, precios, y equipo"),
        t("New customer reviews and success stories", "Nuevas reseñas de clientes e historias de éxito"),
        t("Launch, funding, and press announcements", "Anuncios de lanzamiento, financiamiento, y prensa"),
        t("New landing pages for major campaigns", "Nuevas páginas de aterrizaje para campañas importantes"),
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
          {t("For", "Para")} <strong>{t("startups that need", "startups que necesiten")}</strong>{" "}
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
        "Built around your startup, product, stage, required features, and project scope.",
        "Construido alrededor de tu startup, producto, etapa, características requeridas, y alcance del proyecto."
      ),
      buildLabel: t("Your custom build may include:", "Tu desarrollo personalizado puede incluir:"),
      buildItems: [
        t("A custom page structure", "Una estructura de páginas personalizada"),
        t("Multiple products or audience segments", "Múltiples productos o segmentos de audiencia"),
        t("Advanced waitlist and onboarding workflows", "Flujos avanzados de lista de espera e incorporación"),
        t("Interactive product demonstrations", "Demostraciones interactivas del producto"),
        t("User accounts or customer portals", "Cuentas de usuario o portales de clientes"),
        t("Custom dashboards and data displays", "Paneles personalizados y visualización de datos"),
        t("Advanced CRM and email integrations", "Integraciones avanzadas de CRM y correo"),
        t("Investor, press, and fundraising pages", "Páginas para inversionistas, prensa, y recaudación de fondos"),
        t("English and Spanish website options", "Opciones de sitio web en inglés y español"),
        t("Custom interactions and animations", "Interacciones y animaciones personalizadas"),
        t("Copywriting and product-messaging support", "Apoyo en redacción y mensajes del producto"),
        t("Unique functionality built around your startup", "Funcionalidad única construida alrededor de tu startup"),
      ],
      monthlyLabel: t("Monthly website care may include:", "El cuidado mensual del sitio web puede incluir:"),
      monthlyItems: [
        t("Managed website hosting", "Hosting administrado del sitio web"),
        t("SSL security and automated backups", "Seguridad SSL y respaldos automáticos"),
        t("Uptime and performance monitoring", "Monitoreo de tiempo activo y rendimiento"),
        t("Software and dependency maintenance", "Mantenimiento de software y dependencias"),
        t("Technical troubleshooting and support", "Soporte y resolución de problemas técnicos"),
        t("Product, pricing, team, and content updates", "Actualizaciones de producto, precios, equipo, y contenido"),
        t("Customer review and social-proof updates", "Actualizaciones de reseñas de clientes y prueba social"),
        t("Launch, funding, and press announcements", "Anuncios de lanzamiento, financiamiento, y prensa"),
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
          {t("Startups Pricing", "Precios para Startups")}
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
              "Domain registration, analytics and CRM platforms, email and scheduling services, payment processing, and other third-party subscriptions are billed separately.",
              "El registro de dominio, plataformas de analítica y CRM, servicios de correo y programación, procesamiento de pagos, y otras suscripciones de terceros se facturan por separado."
            )}
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
