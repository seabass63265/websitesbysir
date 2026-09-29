/**
 * "Built for" list on the Startups page: the kinds of companies a startup
 * website is built for. `labelEs` is the Spanish copy — consuming client
 * components pick `label`/`labelEs` via `useT()`.
 */
export type StartupType = {
  number: string;
  slug: string;
  label: string;
  labelEs: string;
};

export const startupTypes: StartupType[] = [
  { number: "01", slug: "saas-software", label: "SaaS & Software", labelEs: "SaaS y Software" },
  { number: "02", slug: "mobile-apps", label: "Mobile Apps", labelEs: "Aplicaciones Móviles" },
  { number: "03", slug: "ai-machine-learning", label: "AI & Machine Learning", labelEs: "IA y Aprendizaje Automático" },
  { number: "04", slug: "fintech", label: "FinTech", labelEs: "FinTech" },
  { number: "05", slug: "ecommerce-dtc", label: "E-commerce & DTC", labelEs: "Comercio Electrónico y DTC" },
  { number: "06", slug: "health-wellness", label: "Health & Wellness", labelEs: "Salud y Bienestar" },
  { number: "07", slug: "food-beverage", label: "Food & Beverage", labelEs: "Comida y Bebida" },
  { number: "08", slug: "fashion-beauty", label: "Fashion & Beauty", labelEs: "Moda y Belleza" },
  { number: "09", slug: "consumer-products", label: "Consumer Products", labelEs: "Productos de Consumo" },
  { number: "10", slug: "education-training", label: "Education & Training", labelEs: "Educación y Capacitación" },
  { number: "11", slug: "marketplaces", label: "Marketplaces", labelEs: "Mercados en Línea" },
  { number: "12", slug: "media-entertainment", label: "Media & Entertainment", labelEs: "Medios y Entretenimiento" },
];
