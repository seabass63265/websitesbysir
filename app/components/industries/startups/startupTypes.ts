/**
 * "Built for" list on the Startups page: the kinds of companies a startup
 * website is built for.
 */
export type StartupType = {
  number: string;
  slug: string;
  label: string;
};

export const startupTypes: StartupType[] = [
  { number: "01", slug: "saas-software", label: "SaaS & Software" },
  { number: "02", slug: "mobile-apps", label: "Mobile Apps" },
  { number: "03", slug: "ai-machine-learning", label: "AI & Machine Learning" },
  { number: "04", slug: "fintech", label: "FinTech" },
  { number: "05", slug: "ecommerce-dtc", label: "E-commerce & DTC" },
  { number: "06", slug: "health-wellness", label: "Health & Wellness" },
  { number: "07", slug: "food-beverage", label: "Food & Beverage" },
  { number: "08", slug: "fashion-beauty", label: "Fashion & Beauty" },
  { number: "09", slug: "consumer-products", label: "Consumer Products" },
  { number: "10", slug: "education-training", label: "Education & Training" },
  { number: "11", slug: "marketplaces", label: "Marketplaces" },
  { number: "12", slug: "media-entertainment", label: "Media & Entertainment" },
];
