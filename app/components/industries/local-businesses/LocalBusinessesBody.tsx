"use client";

import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import LocalBusinessHeader from "@/app/components/industries/local-businesses/LocalBusinessHeader";
import LocalBusinessHero from "@/app/components/industries/local-businesses/LocalBusinessHero";
import Capabilities from "@/app/components/industries/local-businesses/Capabilities";
import PlatformConnections from "@/app/components/industries/local-businesses/PlatformConnections";
import EngineeredTakeaway from "@/app/components/industries/local-businesses/EngineeredTakeaway";
import ProcessSection from "@/app/components/industries/local-businesses/ProcessSection";
import PricingSection from "@/app/components/industries/local-businesses/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Local Businesses page body, split out from the server shell (which keeps
 * the static `metadata` export) so the intake copy here can switch language
 * live.
 */
export default function LocalBusinessesBody() {
  const t = useT();

  // Placeholders for the intake's "what type of business do you own?" question.
  const businessExamples = [
    t(
      "e.g. I own a barber shop and want online booking, a gallery of our work, and a simple way for new clients to find us.",
      "ej. Tengo una barbería y quiero reservas en línea, una galería de nuestro trabajo, y una forma simple para que nuevos clientes nos encuentren."
    ),
    t(
      "e.g. I run a hair salon with five stylists and need a website that shows our services, pricing, and lets clients book online.",
      "ej. Manejo un salón de belleza con cinco estilistas y necesito un sitio web que muestre nuestros servicios, precios, y permita a los clientes reservar en línea."
    ),
    t(
      "e.g. I own an auto repair shop and want customers to request quotes, see our services, and find our hours and location.",
      "ej. Tengo un taller mecánico y quiero que los clientes soliciten cotizaciones, vean nuestros servicios, y encuentren nuestros horarios y ubicación."
    ),
    t(
      "e.g. I run a dental practice and need a clean, trustworthy website with appointment requests and patient information.",
      "ej. Manejo un consultorio dental y necesito un sitio web limpio y confiable con solicitudes de citas e información para pacientes."
    ),
    t(
      "e.g. I own a landscaping company serving several neighborhoods and want a website that shows our work and collects quote requests.",
      "ej. Tengo una empresa de jardinería que sirve a varios vecindarios y quiero un sitio web que muestre nuestro trabajo y recopile solicitudes de cotización."
    ),
    t(
      "e.g. I am a general contractor and need a website to showcase completed projects and make it easy to request an estimate.",
      "ej. Soy contratista general y necesito un sitio web para mostrar proyectos terminados y facilitar solicitar un estimado."
    ),
    t(
      "e.g. I own a family-run cleaning service and want a simple website that explains what we offer and lets customers get in touch.",
      "ej. Tengo un servicio de limpieza familiar y quiero un sitio web simple que explique lo que ofrecemos y permita a los clientes contactarnos."
    ),
    t(
      "e.g. I run a pet shop and want to show our products, share store hours, and let customers reach us easily.",
      "ej. Manejo una tienda de mascotas y quiero mostrar nuestros productos, compartir horarios, y permitir que los clientes nos contacten fácilmente."
    ),
    t(
      "e.g. I am a musician and need a website with my bio, upcoming shows, and a way for people to book me.",
      "ej. Soy músico y necesito un sitio web con mi biografía, próximos shows, y una forma para que la gente me contrate."
    ),
    t(
      "e.g. I am an event planner and want a portfolio of past events and a simple way for clients to request a consultation.",
      "ej. Soy organizador de eventos y quiero un portafolio de eventos pasados y una forma simple para que los clientes soliciten una consulta."
    ),
    t(
      "e.g. I am a tattoo artist and want a gallery of my work, my style, and a way for clients to request a booking.",
      "ej. Soy tatuador y quiero una galería de mi trabajo, mi estilo, y una forma para que los clientes soliciten una cita."
    ),
    t(
      "e.g. I run a small marketing agency and need a site that presents our services, case studies, and a contact form.",
      "ej. Manejo una pequeña agencia de marketing y necesito un sitio que presente nuestros servicios, casos de éxito, y un formulario de contacto."
    ),
    t(
      "e.g. I run a nonprofit and want a website that shares our mission, takes donations, and lets volunteers get involved.",
      "ej. Manejo una organización sin fines de lucro y quiero un sitio web que comparta nuestra misión, reciba donaciones, y permita a voluntarios involucrarse."
    ),
    t(
      "e.g. I own a retail shop and want customers to browse what we carry, find our location, and see our hours.",
      "ej. Tengo una tienda minorista y quiero que los clientes vean lo que ofrecemos, encuentren nuestra ubicación, y vean nuestros horarios."
    ),
  ];

  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <LocalBusinessHeader />
      <main className="grid-container">
        <LocalBusinessHero />
        <EngineeredTakeaway />
        <ProcessSection />
        <Capabilities />
        <PlatformConnections />
        <PricingSection />
        <NumberedSection
          n="05"
          label={t("Contact", "Contacto")}
          id="contact"
          tag={t("05 / START YOUR PROJECT", "05 / INICIA TU PROYECTO")}
        >
          <IntakeSection
            id="contact-form"
            scrollToId="contact"
            pricing={{ id: "pricing", label: "Local Business" }}
            businessExamples={businessExamples}
            businessLabel={t("local business", "negocio local")}
            websiteExample="www.yourbusiness.com"
            otherIndustry={{
              prompt: t("Run a restaurant or café?", "¿Manejas un restaurante o café?"),
              label: t("I run a restaurant or café", "Manejo un restaurante o café"),
              href: "/industries/restaurants-and-cafes",
            }}
            businessTypeHint={t(
              "Describe your business, the services you offer, and how you work with your customers in a few words.\n\n(barber or beauty, home services, professional services, retail, pet shop, repair, artist or performer, event planner, tattoo shop, marketing agency, nonprofit, or something else.)",
              "Describe tu negocio, los servicios que ofreces, y cómo trabajas con tus clientes en pocas palabras.\n\n(barbería o belleza, servicios para el hogar, servicios profesionales, comercio minorista, tienda de mascotas, reparación, artista o intérprete, organización de eventos, estudio de tatuajes, agencia de marketing, organización sin fines de lucro, u otra cosa.)"
            )}
          />
        </NumberedSection>
      </main>
    </>
  );
}
