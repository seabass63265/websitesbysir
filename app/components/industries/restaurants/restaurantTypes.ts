/**
 * "Built for" list on the Restaurants & Cafés page: the kinds of food and
 * drink businesses the website is built for. `labelEs` is the Spanish
 * copy — consuming client components pick `label`/`labelEs` via `useT()`.
 */
export type RestaurantType = {
  number: string;
  slug: string;
  label: string;
  labelEs: string;
};

export const restaurantTypes: RestaurantType[] = [
  { number: "01", slug: "family-run", label: "Family-Run Spots", labelEs: "Negocios Familiares" },
  { number: "02", slug: "fine-dining", label: "Fine Dining", labelEs: "Alta Cocina" },
  { number: "03", slug: "fast-casual", label: "Fast-Casual", labelEs: "Comida Rápida Casual" },
  { number: "04", slug: "cafes-coffee", label: "Cafés & Coffee Shops", labelEs: "Cafés y Cafeterías" },
  { number: "05", slug: "bakeries", label: "Bakeries", labelEs: "Panaderías" },
  { number: "06", slug: "food-trucks", label: "Food Trucks", labelEs: "Camiones de Comida" },
  { number: "07", slug: "bars-breweries", label: "Bars & Breweries", labelEs: "Bares y Cervecerías" },
  { number: "08", slug: "catering", label: "Catering", labelEs: "Banquetes" },
  { number: "09", slug: "ghost-kitchens", label: "Ghost Kitchens", labelEs: "Cocinas Fantasma" },
  { number: "10", slug: "pizzerias-delis", label: "Pizzerias & Delis", labelEs: "Pizzerías y Delicatessen" },
  { number: "11", slug: "dessert-juice", label: "Dessert & Juice Shops", labelEs: "Tiendas de Postres y Jugos" },
  { number: "12", slug: "multi-location", label: "Multi-Location Brands", labelEs: "Marcas con Varias Ubicaciones" },
];
