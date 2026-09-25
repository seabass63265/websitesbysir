import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SIR_ Websites | Restaurants & Cafés",
  description:
    "Custom website design and development for restaurants and cafés — digital menus, online ordering, reservations, POS and delivery integrations, and true bilingual (EN/ES) support. Built directly with Sebastian Rocha in Los Angeles.",
};

// Placeholders for the intake's "what type of business do you own?" question.
const businessExamples = [
  "e.g. I own an established restaurant and want to modernize our website, improve mobile ordering, and attract new customers.",
  "e.g. I am opening a new Japanese restaurant and need a website to introduce the concept, showcase the menu, and accept reservations.",
  "e.g. I manage a restaurant brand with three locations, each offering dine-in, takeout, delivery, and reservations.",
  "e.g. I own a neighborhood café serving specialty coffee, pastries, breakfast, and grab-and-go lunch.",
  "e.g. I own a family-run restaurant offering dine-in, takeout, catering, and private events.",
  "e.g. I run a fast-casual restaurant serving customizable meals for dine-in, pickup, and delivery.",
  "e.g. I operate a fine-dining restaurant offering seasonal tasting menus, wine pairings, and private dining.",
];

export default function RestaurantsAndCafesPage() {
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
        <NumberedSection n="05" label="Contact" id="contact">
          <IntakeSection
            id="contact-form"
            scrollToId="contact"
            pricing={{ id: "pricing", label: "Restaurants & Cafés" }}
            businessExamples={businessExamples}
            businessLabel="restaurant / café"
            websiteExample="www.yourrestaurant.com"
            otherIndustry={{
              prompt: "Not a restaurant or café?",
              label: "I run a different business",
              href: "/#services",
            }}
            businessTypeHint={"Describe your concept, atmosphere, cuisine, and how you serve your customers in a few words.\n\n(family-run, fine dining, fast-casual, quick takeout, café, bakery, food truck, or something else.)"}
          />
        </NumberedSection>
      </main>
    </>
  );
}
