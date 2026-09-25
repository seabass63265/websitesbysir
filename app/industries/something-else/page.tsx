import type { Metadata } from "next";
import ScrollToTop from "@/app/components/providers/ScrollToTop";
import RestaurantsPageLoader from "@/app/components/industries/restaurants/RestaurantsPageLoader";
import SomethingElseHeader from "@/app/components/industries/something-else/SomethingElseHeader";
import SomethingElseHero from "@/app/components/industries/something-else/SomethingElseHero";
import SomethingElseTakeaway from "@/app/components/industries/something-else/SomethingElseTakeaway";
import ProcessSection from "@/app/components/industries/something-else/ProcessSection";
import Capabilities from "@/app/components/industries/something-else/Capabilities";
import PlatformConnections from "@/app/components/industries/something-else/PlatformConnections";
import PricingSection from "@/app/components/industries/something-else/PricingSection";
import NumberedSection from "@/app/components/industries/NumberedSection";
import IntakeSection from "@/app/components/contact/IntakeSection";

export const metadata: Metadata = {
  title: "SIR_ Websites | Something Else",
  description:
    "Custom website design and development for projects that don't fit the usual mold — nonprofits, schools and clubs, events, real estate, communities, membership sites, online courses, directories, campaigns, custom web apps, and one-of-a-kind ideas. Custom features, third-party integrations, mobile-responsive design, SEO, and ongoing support. Built directly with Sebastian Rocha in Los Angeles.",
};

// Placeholders for the intake's "tell us about your project" question.
const businessExamples = [
  "e.g. I run a nonprofit and need a website that shares our mission, takes donations, and lets volunteers sign up for events.",
  "e.g. I lead a student organization and want a site with our team, upcoming events, and a simple way for new members to apply.",
  "e.g. I'm organizing a conference and need a site with the schedule, speakers, ticket sales, and a place for sponsors.",
  "e.g. I'm a real estate agent and want listings, neighborhood guides, and an easy way for buyers and sellers to reach me.",
  "e.g. I'm part of a church community and need a site for service times, sermons, events, and online giving.",
  "e.g. I run a local club and want a members-only area, a calendar, and a newsletter sign-up.",
  "e.g. I sell a paid membership and need a site with sign-up, member content, and recurring billing.",
  "e.g. I teach online and want a site for my courses, lesson previews, and student sign-ups.",
  "e.g. I'm building a directory of local services and need searchable listings and a way for businesses to submit theirs.",
  "e.g. I'm running a community campaign and want a site that explains the cause, collects signatures, and shares updates.",
  "e.g. I have an idea for a custom web tool and need a site that explains it, with sign-in and a simple dashboard.",
  "e.g. I have an idea that doesn't fit any category and I'd like help figuring out what kind of website it needs.",
];

export default function SomethingElsePage() {
  return (
    <>
      <ScrollToTop />
      <RestaurantsPageLoader />
      <SomethingElseHeader />
      <main className="grid-container">
        <SomethingElseHero />
        <SomethingElseTakeaway />
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
            pricing={{ id: "pricing", label: "Custom Project" }}
            businessExamples={businessExamples}
            businessLabel="project"
            websiteExample="www.yourproject.com"
            otherIndustry={{
              prompt: "Have a business?",
              label: "See the other service areas",
              href: "/#services",
            }}
            businessTypeHint={"Describe your project, what it's for, who it's for, and what you'd like the website to do in a few words.\n\n(nonprofit, school or club, event, real estate, community, membership site, online course, directory, campaign, custom web app, or something else.)"}
          />
        </NumberedSection>
      </main>
    </>
  );
}
