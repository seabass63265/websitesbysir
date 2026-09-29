import type { Metadata } from "next";
import SomethingElseBody from "@/app/components/industries/something-else/SomethingElseBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Something Else",
  description:
    "Custom website design and development for projects that don't fit the usual mold — nonprofits, schools and clubs, events, real estate, communities, membership sites, online courses, directories, campaigns, custom web apps, and one-of-a-kind ideas. Custom features, third-party integrations, mobile-responsive design, SEO, and ongoing support. Built directly with Sebastian Rocha in Los Angeles.",
};

export default function SomethingElsePage() {
  return <SomethingElseBody />;
}
