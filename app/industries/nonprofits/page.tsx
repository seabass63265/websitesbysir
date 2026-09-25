import type { Metadata } from "next";
import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import NonprofitHeader from "@/app/components/industries/nonprofits/NonprofitHeader";
import NonprofitHero from "@/app/components/industries/nonprofits/NonprofitHero";
import Capabilities from "@/app/components/industries/nonprofits/Capabilities";
import PlatformConnections from "@/app/components/industries/nonprofits/PlatformConnections";
import NonprofitTakeaway from "@/app/components/industries/nonprofits/NonprofitTakeaway";
import ProcessSection from "@/app/components/industries/nonprofits/ProcessSection";
import PricingSection from "@/app/components/industries/nonprofits/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";

export const metadata: Metadata = {
  title: "SIR_ Websites | Nonprofits & Organizations",
  description:
    "Custom website design and development for nonprofits and community organizations — food banks, youth and education programs, animal rescues, health and wellness, arts and culture, faith-based groups, environmental and housing organizations, advocacy, mutual aid, and foundations. Donations, events, volunteer forms, newsletters, and bilingual (EN/ES) sites. Built directly with Sebastian Rocha in Los Angeles.",
};

// Placeholders for the intake's "tell us about your organization" question.
const businessExamples = [
  "e.g. I run a food pantry and need a website that explains our hours and locations, takes donations, and lets volunteers sign up for shifts.",
  "e.g. I direct an after-school program and want a site that shares our mission, our programs, and how families can enroll.",
  "e.g. I run an animal rescue and need a place to show adoptable pets, collect adoption applications, and accept donations.",
  "e.g. I lead a community arts organization and want a site with our events calendar, ticket links, and a newsletter sign-up.",
  "e.g. I am starting a mutual aid group and need a simple site to share resources, request help, and collect donations.",
  "e.g. I run a small foundation and want a professional site that shares our story, our grants, and our impact.",
  "e.g. I organize a neighborhood cleanup group and want a site for upcoming events, volunteer sign-ups, and photos of our work.",
  "e.g. I run a health clinic nonprofit and need an English and Spanish website that explains our services and how to get care.",
  "e.g. I am part of a faith-based outreach group and want a site with our events, ways to give, and a way to contact us.",
  "e.g. I run an advocacy campaign and need a website that shares our cause, collects sign-ups, and takes donations.",
];

export default function NonprofitsPage() {
  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <NonprofitHeader />
      <main className="grid-container">
        <NonprofitHero />
        <NonprofitTakeaway />
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
            pricing={{ id: "pricing", label: "Nonprofit" }}
            businessExamples={businessExamples}
            businessLabel="organization"
            websiteExample="www.yourorganization.org"
            otherIndustry={{
              prompt: "Run a business?",
              label: "I run a local business",
              href: "/industries/local-businesses",
            }}
            businessTypeHint={"Describe your organization, the cause you serve, and how people give, volunteer, or get help in a few words.\n\n(community organization, food bank, youth or education program, animal rescue, health and wellness, arts and culture, faith-based group, environmental group, housing, advocacy, mutual aid, foundation, or something else.)"}
          />
        </NumberedSection>
      </main>
    </>
  );
}
