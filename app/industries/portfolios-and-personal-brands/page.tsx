import type { Metadata } from "next";
import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import PortfolioHeader from "@/app/components/industries/portfolios/PortfolioHeader";
import PortfolioHero from "@/app/components/industries/portfolios/PortfolioHero";
import PortfolioTakeaway from "@/app/components/industries/portfolios/PortfolioTakeaway";
import ProcessSection from "@/app/components/industries/portfolios/ProcessSection";
import Capabilities from "@/app/components/industries/portfolios/Capabilities";
import PlatformConnections from "@/app/components/industries/portfolios/PlatformConnections";
import PricingSection from "@/app/components/industries/portfolios/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";

export const metadata: Metadata = {
  title: "SIR_ Websites | Portfolios & Personal Brands",
  description:
    "Custom portfolio and personal-brand websites for photographers, designers, artists, musicians, filmmakers, writers, coaches, developers, and more — project galleries, appointment booking, social media, testimonials, contact forms, and newsletters. Built directly with Sebastian Rocha in Los Angeles.",
};

// Placeholders for the intake's "tell us about your brand" question.
const businessExamples = [
  "e.g. I am a photographer and want a portfolio that shows my best work by category and makes it easy for clients to book a session.",
  "e.g. I am a graphic designer and need a portfolio with case studies, my process, and a contact form for new projects.",
  "e.g. I am a musician and want a site with my music, upcoming shows, press photos, and a way for people to book me.",
  "e.g. I am a filmmaker and want a reel, project pages, and a simple way for clients to request a quote.",
  "e.g. I am a life coach and want a website that explains my services, shares testimonials, and lets people book a free call.",
  "e.g. I am a writer and want a home for my published work, an about page, and a newsletter sign-up.",
  "e.g. I am a software developer looking for a portfolio that shows my projects, my skills, and how to hire me.",
  "e.g. I am an interior designer and want to showcase completed projects and let new clients start a conversation.",
  "e.g. I am a student and need a clean portfolio and résumé site to share with employers.",
];

export default function PortfoliosPage() {
  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <PortfolioHeader />
      <main className="grid-container">
        <PortfolioHero />
        <PortfolioTakeaway />
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
            pricing={{ id: "pricing", label: "Portfolio" }}
            businessExamples={businessExamples}
            businessLabel="brand"
            websiteExample="www.yourname.com"
            otherIndustry={{
              prompt: "Run a business?",
              label: "I run a local business",
              href: "/industries/local-businesses",
            }}
            businessTypeHint={"Describe who you are, what you create or offer, and how people find or work with you in a few words.\n\n(photographer, designer, artist, musician, filmmaker, model, writer, coach, consultant, developer, architect, student, freelancer, or something else.)"}
          />
        </NumberedSection>
      </main>
    </>
  );
}
