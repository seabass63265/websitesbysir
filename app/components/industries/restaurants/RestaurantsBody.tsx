"use client";

import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import RestaurantsHeader from "@/app/components/industries/restaurants/RestaurantsHeader";
import RestaurantsHero from "@/app/components/industries/restaurants/RestaurantsHero";
import CapabilitiesList from "@/app/components/industries/restaurants/CapabilitiesList";
import ToolsSection from "@/app/components/industries/restaurants/ToolsSection";
import RestaurantsTakeaway from "@/app/components/industries/restaurants/RestaurantsTakeaway";
import LaunchProcess from "@/app/components/industries/restaurants/LaunchProcess";
import PricingSection from "@/app/components/industries/restaurants/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";
import { useT } from "@/app/components/providers/LanguageProvider";

/**
 * Restaurants & Cafés page body, split out from the server shell (which
 * keeps the static `metadata` export) so the intake copy here can switch
 * language live.
 */
export default function RestaurantsBody() {
  const t = useT();

  // Placeholders for the intake's "what type of business do you own?" question.
  const businessExamples = [
    t(
      "e.g. I own an established restaurant and want to modernize our website, improve mobile ordering, and attract new customers.",
      "ej. Tengo un restaurante establecido y quiero modernizar nuestro sitio web, mejorar los pedidos móviles, y atraer nuevos clientes."
    ),
    t(
      "e.g. I am opening a new Japanese restaurant and need a website to introduce the concept, showcase the menu, and accept reservations.",
      "ej. Estoy abriendo un nuevo restaurante japonés y necesito un sitio web para presentar el concepto, mostrar el menú, y aceptar reservaciones."
    ),
    t(
      "e.g. I manage a restaurant brand with three locations, each offering dine-in, takeout, delivery, and reservations.",
      "ej. Manejo una marca de restaurante con tres ubicaciones, cada una ofreciendo servicio en el local, para llevar, entrega, y reservaciones."
    ),
    t(
      "e.g. I own a neighborhood café serving specialty coffee, pastries, breakfast, and grab-and-go lunch.",
      "ej. Tengo un café de barrio que sirve café de especialidad, repostería, desayuno, y almuerzo para llevar."
    ),
    t(
      "e.g. I own a family-run restaurant offering dine-in, takeout, catering, and private events.",
      "ej. Tengo un restaurante familiar que ofrece servicio en el local, para llevar, banquetes, y eventos privados."
    ),
    t(
      "e.g. I run a fast-casual restaurant serving customizable meals for dine-in, pickup, and delivery.",
      "ej. Manejo un restaurante de comida rápida casual que sirve comidas personalizables para comer en el local, recoger, y entregar."
    ),
    t(
      "e.g. I operate a fine-dining restaurant offering seasonal tasting menus, wine pairings, and private dining.",
      "ej. Opero un restaurante de alta cocina que ofrece menús de degustación de temporada, maridajes de vino, y comidas privadas."
    ),
  ];

  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <RestaurantsHeader />
      <main className="grid-container">
        <RestaurantsHero />
        <RestaurantsTakeaway />
        <LaunchProcess />
        <CapabilitiesList />
        <ToolsSection />
        <PricingSection />
        <NumberedSection n="05" label={t("Contact", "Contacto")} id="contact">
          <IntakeSection
            id="contact-form"
            scrollToId="contact"
            pricing={{ id: "pricing", label: "Restaurants & Cafés" }}
            businessExamples={businessExamples}
            businessLabel={t("restaurant / café", "restaurante / café")}
            websiteExample="www.yourrestaurant.com"
            otherIndustry={{
              prompt: t("Not a restaurant or café?", "¿No es un restaurante o café?"),
              label: t("I run a different business", "Manejo un negocio diferente"),
              href: "/#services",
            }}
            businessTypeHint={t(
              "Describe your concept, atmosphere, cuisine, and how you serve your customers in a few words.\n\n(family-run, fine dining, fast-casual, quick takeout, café, bakery, food truck, or something else.)",
              "Describe tu concepto, ambiente, cocina, y cómo atiendes a tus clientes en pocas palabras.\n\n(familiar, alta cocina, comida rápida casual, para llevar, café, panadería, camión de comida, u otra cosa.)"
            )}
          />
        </NumberedSection>
      </main>
    </>
  );
}
