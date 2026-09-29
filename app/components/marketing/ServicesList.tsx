"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * "Select Service Area" list. Hover states are pure CSS. Rows with an
 * `href` link through to a dedicated industry page.
 */
export default function ServicesList() {
  const t = useT();

  const services: { title: string; detail: string; href?: string }[] = [
    {
      title: t("Restaurants & Cafés", "Restaurantes y Cafés"),
      detail: t(
        "Digital Menus • Online Ordering • Reservations • Yelp • Google Maps • DoorDash / Grubhub / Uber Eats • Our Story • Bilingual (EN/ES)",
        "Menús Digitales • Pedidos en Línea • Reservaciones • Yelp • Google Maps • DoorDash / Grubhub / Uber Eats • Nuestra Historia • Bilingüe (EN/ES)"
      ),
      href: "/industries/restaurants-and-cafes",
    },
    {
      title: t("Local Businesses", "Negocios Locales"),
      detail: t(
        "Barber Shops • Salons • Dentists • Auto Repair • Landscapers • Contractors • Cleaning Services • Fitness Studios • Pet Groomers • Tutors • & More",
        "Barberías • Salones • Dentistas • Talleres Mecánicos • Jardinería • Contratistas • Servicios de Limpieza • Estudios de Fitness • Peluquería Canina • Tutores • Y Más"
      ),
      href: "/industries/local-businesses",
    },
    {
      title: t("Portfolios & Personal Brands", "Portafolios y Marcas Personales"),
      detail: t(
        "Portfolios • Appointment Booking • Social Media • Testimonials • Contact Forms • Newsletters",
        "Portafolios • Reserva de Citas • Redes Sociales • Testimonios • Formularios de Contacto • Boletines"
      ),
      href: "/industries/portfolios-and-personal-brands",
    },
    {
      title: "Startups",
      detail: t(
        "Landing Pages • Product Demos • Waitlists • User Sign-Ups • Investor Pages • Analytics • Our Story",
        "Páginas de Aterrizaje • Demostraciones de Producto • Listas de Espera • Registro de Usuarios • Páginas para Inversionistas • Analítica • Nuestra Historia"
      ),
      href: "/industries/startups",
    },
    {
      title: t("Nonprofits & Organizations", "Organizaciones sin Fines de Lucro"),
      detail: t(
        "Donations • Events • Volunteer Forms • Newsletters • Resources • Our Story • Bilingual (EN/ES)",
        "Donaciones • Eventos • Formularios de Voluntariado • Boletines • Recursos • Nuestra Historia • Bilingüe (EN/ES)"
      ),
      href: "/industries/nonprofits",
    },
    {
      title: t("Something Else?", "¿Algo más?"),
      detail: t(
        "Custom Features • Third-Party Integrations • Mobile-Responsive • SEO • Ongoing Support",
        "Funciones Personalizadas • Integraciones con Terceros • Adaptado a Móviles • SEO • Soporte Continuo"
      ),
      href: "/industries/something-else",
    },
  ];

  return (
    <section id="services" className="pad-global border-b">
      <div
        className="services-heading border-b"
        style={{ paddingBottom: "1rem", marginBottom: "1rem" }}
      >
        <span>{t("Select Service Area", "Selecciona tu área de servicio")}</span>
        <span className="services-heading__arrow" aria-hidden="true">
          &darr;
        </span>
      </div>

      <div className="service-list">
        {services.map((service, index) => {
          const className =
            index < services.length - 1 ? "list-row border-b" : "list-row";
          const body = (
            <>
              <div>
                <h2 className="text-lg">{service.title}</h2>
                <div className="text-xs" style={{ marginTop: "0.25rem" }}>
                  {service.detail}
                </div>
              </div>
              <div className="text-lg">→</div>
            </>
          );

          return service.href ? (
            <TransitionLink
              key={service.title}
              href={service.href}
              className={className}
            >
              {body}
            </TransitionLink>
          ) : (
            <div key={service.title} className={className}>
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}
