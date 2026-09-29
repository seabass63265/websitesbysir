"use client";

import NumberedSection from "@/app/components/industries/NumberedSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Restaurant Website Pages" — the hoverable list of pages a hospitality
 * build covers. Same list-row primitive as the marketing <ServicesList>.
 */
export default function CapabilitiesList() {
  const t = useT();
  const pages = [
    {
      title: t("Home", "Inicio"),
      detail: t(
        "A strong introduction featuring the restaurant, popular dishes, location, hours, and primary actions.",
        "Una introducción sólida que presenta el restaurante, platillos populares, ubicación, horarios, y acciones principales."
      ),
      plan: "Essential",
      planLabel: t("Essential", "Esencial"),
    },
    {
      title: t("Menu", "Menú"),
      detail: t(
        "A mobile-friendly digital menu organized by category, with descriptions, prices, and dietary labels.",
        "Un menú digital adaptado a móviles organizado por categoría, con descripciones, precios, y etiquetas dietéticas."
      ),
      plan: "Essential",
      planLabel: t("Essential", "Esencial"),
    },
    {
      title: t("Our Story", "Nuestra Historia"),
      detail: t(
        "The restaurant's history, family, culture, values, recipes, and the people behind the business.",
        "La historia del restaurante, la familia, cultura, valores, recetas, y las personas detrás del negocio."
      ),
      plan: "Essential",
      planLabel: t("Essential", "Esencial"),
    },
    {
      title: t("Order Online", "Ordenar en Línea"),
      detail: t(
        "Connect customers to Toast, DoorDash, Grubhub, Uber Eats, ChowNow, or the restaurant's preferred ordering system.",
        "Conecta a los clientes con Toast, DoorDash, Grubhub, Uber Eats, ChowNow, o el sistema de pedidos preferido del restaurante."
      ),
      plan: "Essential",
      planLabel: t("Essential", "Esencial"),
    },
    {
      title: t("Locations & Hours", "Ubicaciones y Horarios"),
      detail: t(
        "Show each location's address, hours, phone number, parking details, and Google Maps directions.",
        "Muestra la dirección, horarios, número de teléfono, detalles de estacionamiento, e indicaciones de Google Maps de cada ubicación."
      ),
      plan: "Essential",
      planLabel: t("Essential", "Esencial"),
    },
    {
      title: t("Contact Info", "Información de Contacto"),
      detail: t(
        "Phone number, email, social media, directions, accessibility information, and answers to common questions.",
        "Número de teléfono, correo, redes sociales, indicaciones, información de accesibilidad, y respuestas a preguntas comunes."
      ),
      plan: "Essential",
      planLabel: t("Essential", "Esencial"),
    },
    {
      title: t("Promotions & Specials", "Promociones y Especiales"),
      detail: t(
        "Highlight seasonal menus, limited-time offers, happy hours, upcoming events, and important announcements through custom website sections or homepage banners.",
        "Destaca menús de temporada, ofertas por tiempo limitado, horas felices, próximos eventos, y anuncios importantes a través de secciones personalizadas del sitio o banners en la página de inicio."
      ),
      plan: "Growth",
      planLabel: t("Growth", "Crecimiento"),
    },
    {
      title: t("Reservations", "Reservaciones"),
      detail: t(
        "Allow customers to reserve through OpenTable, Resy, Yelp Reservations, or another booking platform.",
        "Permite a los clientes reservar a través de OpenTable, Resy, Yelp Reservations, u otra plataforma de reservas."
      ),
      plan: "Growth",
      planLabel: t("Growth", "Crecimiento"),
    },
    {
      title: t("Multilingual Website", "Sitio Web Multilingüe"),
      detail: t(
        "Culturally informed English and Spanish translation, with support for additional languages, so your restaurant's voice stays clear, natural, and authentic.",
        "Traducción al inglés y español con conocimiento cultural, con soporte para idiomas adicionales, para que la voz de tu restaurante se mantenga clara, natural, y auténtica."
      ),
      plan: "Growth",
      planLabel: t("Growth", "Crecimiento"),
    },
    {
      title: t("Gallery", "Galería"),
      detail: t(
        "Professional photos of the food, restaurant, team, and customer experience.",
        "Fotos profesionales de la comida, el restaurante, el equipo, y la experiencia del cliente."
      ),
      plan: "Growth",
      planLabel: t("Growth", "Crecimiento"),
    },
    {
      title: t("Private Events", "Eventos Privados"),
      detail: t(
        "Information and an inquiry form for parties, large groups, celebrations, or restaurant buyouts.",
        "Información y un formulario de consulta para fiestas, grupos grandes, celebraciones, o reservas exclusivas del restaurante."
      ),
      plan: "Tailored",
      planLabel: t("Tailored", "A la medida"),
    },
  ] as const;

  return (
    <NumberedSection
      n="02"
      label={t("Restaurant Website Pages", "Páginas del Sitio Web del Restaurante")}
      id="capabilities"
      bodyClassName="pad-global"
    >
      <div className="service-list">
        {pages.map((page, index) => (
          <div
            key={page.title}
            className={
              index < pages.length - 1 ? "list-row border-b" : "list-row"
            }
          >
            <div>
              <h2 className="text-lg page-list__title">{page.title}</h2>
              <div className="page-list__detail" style={{ marginTop: "0.5rem" }}>
                {page.detail}
              </div>
            </div>
            <div className={`pill-tag page-list__plan page-list__plan--${page.plan.toLowerCase()}`}>
              {page.planLabel}
            </div>
          </div>
        ))}
      </div>
    </NumberedSection>
  );
}
