import type { Metadata } from "next";
import PortfoliosBody from "@/app/components/industries/portfolios/PortfoliosBody";

export const metadata: Metadata = {
  title: "SIR_ Websites | Portfolios & Personal Brands",
  description:
    "Custom portfolio and personal-brand websites for photographers, designers, artists, musicians, filmmakers, writers, coaches, developers, and more — project galleries, appointment booking, social media, testimonials, contact forms, and newsletters. Built directly with Sebastian Rocha in Los Angeles.",
};

export default function PortfoliosPage() {
  return <PortfoliosBody />;
}
