import type { Metadata } from "next";
import StartupsBody from "@/app/components/industries/startups/StartupsBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Startups",
  description:
    "Custom website design and development for startups — landing pages, product demos, waitlists and sign-ups, investor and press pages, analytics, and more, for SaaS, apps, AI, fintech, e-commerce, health tech, edtech, marketplaces, hardware, climate tech, and beyond. Built directly with Sebastian Rocha in Los Angeles.",
};

export default function StartupsPage() {
  return <StartupsBody />;
}
