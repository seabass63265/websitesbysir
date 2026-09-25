/**
 * "Built for" list on the Restaurants & Cafés page: the kinds of food and
 * drink businesses the website is built for.
 */
export type RestaurantType = {
  number: string;
  slug: string;
  label: string;
};

export const restaurantTypes: RestaurantType[] = [
  { number: "01", slug: "family-run", label: "Family-Run Spots" },
  { number: "02", slug: "fine-dining", label: "Fine Dining" },
  { number: "03", slug: "fast-casual", label: "Fast-Casual" },
  { number: "04", slug: "cafes-coffee", label: "Cafés & Coffee Shops" },
  { number: "05", slug: "bakeries", label: "Bakeries" },
  { number: "06", slug: "food-trucks", label: "Food Trucks" },
  { number: "07", slug: "bars-breweries", label: "Bars & Breweries" },
  { number: "08", slug: "catering", label: "Catering" },
  { number: "09", slug: "ghost-kitchens", label: "Ghost Kitchens" },
  { number: "10", slug: "pizzerias-delis", label: "Pizzerias & Delis" },
  { number: "11", slug: "dessert-juice", label: "Dessert & Juice Shops" },
  { number: "12", slug: "multi-location", label: "Multi-Location Brands" },
];
