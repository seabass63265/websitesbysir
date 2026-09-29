/**
 * Business-type filter pills shown in WorkShowcase's bottom-left panel.
 * "all" is the default/no-filter state, not a real category. `labelEs` is
 * the Spanish copy — consuming client components pick `label`/`labelEs`
 * via `useT()` from LanguageProvider.
 */
export type BusinessCategory = {
  number: string;
  slug: string;
  label: string;
  labelEs: string;
};

export const ALL_BUSINESSES_SLUG = "all";

export const businessCategories: BusinessCategory[] = [
  { number: "01", slug: "food-restaurants", label: "Food & Restaurants", labelEs: "Comida y Restaurantes" },
  { number: "02", slug: "barber-beauty", label: "Barber & Beauty", labelEs: "Barbería y Belleza" },
  { number: "03", slug: "home-services", label: "Home Services", labelEs: "Servicios para el Hogar" },
  { number: "04", slug: "professional-services", label: "Professional Services", labelEs: "Servicios Profesionales" },
  { number: "05", slug: "retail", label: "Retail", labelEs: "Comercio Minorista" },
  { number: "06", slug: "pet-shop", label: "Pet Shop / Pet Supply", labelEs: "Tienda de Mascotas" },
  { number: "07", slug: "repair-services", label: "Repair Services", labelEs: "Servicios de Reparación" },
  { number: "08", slug: "artist-performer", label: "Artist / Performer", labelEs: "Artista / Intérprete" },
  { number: "09", slug: "event-planner", label: "Event Planner / Event Services", labelEs: "Organización de Eventos" },
  { number: "10", slug: "tattoo-shop", label: "Tattoo Shop / Tattoo Artist", labelEs: "Estudio de Tatuajes" },
  { number: "11", slug: "marketing-agency", label: "Marketing & Creative Agency", labelEs: "Agencia de Marketing y Creatividad" },
  { number: "12", slug: "nonprofit", label: "Nonprofit", labelEs: "Organización sin Fines de Lucro" },
];
