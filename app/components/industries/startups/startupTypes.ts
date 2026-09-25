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
  { number: "04", slug: "fintech", label: "Fintech" },
  { number: "05", slug: "ecommerce-dtc", label: "E-commerce & DTC" },
  { number: "06", slug: "health-wellness-tech", label: "Health Tech" },
  { number: "07", slug: "edtech", label: "EdTech" },
  { number: "08", slug: "marketplaces-platforms", label: "Marketplaces" },
  { number: "09", slug: "hardware-consumer", label: "Hardware & Devices" },
  { number: "10", slug: "climate-clean-tech", label: "Climate & Clean Tech" },
  { number: "11", slug: "web3-crypto", label: "Web3 & Crypto" },
  { number: "12", slug: "media-creator", label: "Media & Creators" },
];
