import type { Metadata } from "next";
import ApproachBody from "@/app/components/marketing/ApproachBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Approach & Process",
  description:
    "How SIR_ Websites works — the approach, investment structure, and process behind every build, from kickoff to launch. Built directly with Sebastian Rocha in Los Angeles.",
};

/**
 * Everything that used to live below the homepage's "Why Your Business
 * Needs a Website" section — the gallery, approach/investment, the
 * before/after comparison, testimonials, and contact — now its own page
 * about how SIR_ actually works.
 */
export default function ApproachPage() {
  return <ApproachBody />;
}
