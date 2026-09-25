/**
 * Business-type filter pills shown in WorkShowcase's bottom-left panel.
 * "all" is the default/no-filter state, not a real category.
 */
export type BusinessCategory = {
  number: string;
  slug: string;
  label: string;
};

export const ALL_BUSINESSES_SLUG = "all";

export const businessCategories: BusinessCategory[] = [
  { number: "01", slug: "food-restaurants", label: "Food & Restaurants" },
  { number: "02", slug: "barber-beauty", label: "Barber & Beauty" },
  { number: "03", slug: "home-services", label: "Home Services" },
  { number: "04", slug: "professional-services", label: "Professional Services" },
  { number: "05", slug: "retail", label: "Retail" },
  { number: "06", slug: "pet-shop", label: "Pet Shop / Pet Supply" },
  { number: "07", slug: "repair-services", label: "Repair Services" },
  { number: "08", slug: "artist-performer", label: "Artist / Performer" },
  { number: "09", slug: "event-planner", label: "Event Planner / Event Services" },
  { number: "10", slug: "tattoo-shop", label: "Tattoo Shop / Tattoo Artist" },
  { number: "11", slug: "marketing-agency", label: "Marketing & Creative Agency" },
  { number: "12", slug: "interior-design", label: "Interior Design" },
];
