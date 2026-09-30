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

// The first three slots are the only categories with a real demo recording
// in showcaseMedia.ts — everyone else still shows a "coming soon" screen in
// the device showcase.
export const businessCategories: BusinessCategory[] = [
  { number: "01", slug: "professional-services", label: "Schools, Education, & Training", labelEs: "Escuelas, Educación, y Capacitación" },
  { number: "02", slug: "marketing-agency", label: "Marketing & Creative Agency", labelEs: "Agencia de Marketing y Creatividad" },
  { number: "03", slug: "nonprofit", label: "Nonprofit", labelEs: "Organización sin Fines de Lucro" },
  { number: "04", slug: "food-restaurants", label: "Food & Restaurants", labelEs: "Comida y Restaurantes" },
  { number: "05", slug: "barber-beauty", label: "Barber & Beauty", labelEs: "Barbería y Belleza" },
  { number: "06", slug: "home-services", label: "Home Services", labelEs: "Servicios para el Hogar" },
  { number: "07", slug: "retail", label: "Retail", labelEs: "Comercio Minorista" },
  { number: "08", slug: "pet-shop", label: "Pet Shop / Pet Supply", labelEs: "Tienda de Mascotas" },
  { number: "09", slug: "repair-services", label: "Repair Services", labelEs: "Servicios de Reparación" },
  { number: "10", slug: "artist-performer", label: "Artist / Performer", labelEs: "Artista / Intérprete" },
  { number: "11", slug: "event-planner", label: "Event Planner / Event Services", labelEs: "Organización de Eventos" },
  { number: "12", slug: "tattoo-shop", label: "Tattoo Shop / Tattoo Artist", labelEs: "Estudio de Tatuajes" },
];
