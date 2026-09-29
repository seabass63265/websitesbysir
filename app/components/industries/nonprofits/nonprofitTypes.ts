/**
 * "Built for" list on the Nonprofits page: the kinds of nonprofits and
 * community organizations the website is built for. `labelEs` is the
 * Spanish copy — consuming client components pick `label`/`labelEs` via
 * `useT()`.
 */
export type NonprofitType = {
  number: string;
  slug: string;
  label: string;
  labelEs: string;
};

export const nonprofitTypes: NonprofitType[] = [
  { number: "01", slug: "community-orgs", label: "Community Groups", labelEs: "Grupos Comunitarios" },
  { number: "02", slug: "food-banks", label: "Food Banks & Pantries", labelEs: "Bancos y Despensas de Alimentos" },
  { number: "03", slug: "youth-education", label: "Youth & Education", labelEs: "Juventud y Educación" },
  { number: "04", slug: "animal-rescues", label: "Animal Rescues", labelEs: "Rescates de Animales" },
  { number: "05", slug: "health-wellness", label: "Health & Wellness", labelEs: "Salud y Bienestar" },
  { number: "06", slug: "arts-culture", label: "Arts & Culture", labelEs: "Arte y Cultura" },
  { number: "07", slug: "faith-based", label: "Faith-Based Groups", labelEs: "Grupos Religiosos" },
  { number: "08", slug: "environmental", label: "Environmental Groups", labelEs: "Grupos Ambientales" },
  { number: "09", slug: "housing-shelter", label: "Housing & Shelter", labelEs: "Vivienda y Refugio" },
  { number: "10", slug: "advocacy-civic", label: "Advocacy & Civic", labelEs: "Defensoría y Cívica" },
  { number: "11", slug: "mutual-aid", label: "Mutual Aid", labelEs: "Ayuda Mutua" },
  { number: "12", slug: "foundations", label: "Foundations", labelEs: "Fundaciones" },
];
