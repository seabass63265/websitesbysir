import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SIR_ Websites | Local Businesses",
  description:
    "Custom website design and development for local businesses — food and restaurants, barber and beauty, home services, professional services, retail, pet shops, repair, artists and performers, event planners, tattoo shops, marketing agencies, interior design, and more. Built directly with Sebastian Rocha in Los Angeles.",
};

// Placeholders for the intake's "what type of business do you own?" question.
const businessExamples = [
  "e.g. I own a barber shop and want online booking, a gallery of our work, and a simple way for new clients to find us.",
  "e.g. I run a hair salon with five stylists and need a website that shows our services, pricing, and lets clients book online.",
  "e.g. I own an auto repair shop and want customers to request quotes, see our services, and find our hours and location.",
  "e.g. I run a dental practice and need a clean, trustworthy website with appointment requests and patient information.",
  "e.g. I own a landscaping company serving several neighborhoods and want a website that shows our work and collects quote requests.",
  "e.g. I am a general contractor and need a website to showcase completed projects and make it easy to request an estimate.",
  "e.g. I own a family-run cleaning service and want a simple website that explains what we offer and lets customers get in touch.",
  "e.g. I run a pet shop and want to show our products, share store hours, and let customers reach us easily.",
  "e.g. I am a musician and need a website with my bio, upcoming shows, and a way for people to book me.",
  "e.g. I am an event planner and want a portfolio of past events and a simple way for clients to request a consultation.",
  "e.g. I am a tattoo artist and want a gallery of my work, my style, and a way for clients to request a booking.",
  "e.g. I run a small marketing agency and need a site that presents our services, case studies, and a contact form.",
  "e.g. I am an interior designer and want to showcase completed projects and let new clients start a conversation.",
  "e.g. I own a retail shop and want customers to browse what we carry, find our location, and see our hours.",
];

export default function LocalBusinessesPage() {
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
          label="Contact"
          id="contact"
          tag="05 / START YOUR PROJECT"
        >
          <IntakeSection
            id="contact-form"
            scrollToId="contact"
            pricing={{ id: "pricing", label: "Local Business" }}
            businessExamples={businessExamples}
            businessLabel="local business"
            websiteExample="www.yourbusiness.com"
            otherIndustry={{
              prompt: "Run a restaurant or café?",
              label: "I run a restaurant or café",
              href: "/industries/restaurants-and-cafes",
            }}
            businessTypeHint={"Describe your business, the services you offer, and how you work with your customers in a few words.\n\n(barber or beauty, home services, professional services, retail, pet shop, repair, artist or performer, event planner, tattoo shop, marketing agency, interior design, or something else.)"}
          />
        </NumberedSection>
      </main>
    </>
  );
}
