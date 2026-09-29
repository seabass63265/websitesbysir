/**
 * "Built for" list on the Portfolios & Personal Brands page: the kinds of
 * people and creators a personal website is built for. `labelEs` is the
 * Spanish copy — consuming client components pick `label`/`labelEs` via
 * `useT()`.
 */
export type PersonalBrandType = {
  number: string;
  slug: string;
  label: string;
  labelEs: string;
};

export const personalBrandTypes: PersonalBrandType[] = [
  { number: "01", slug: "photographers", label: "Photographers", labelEs: "Fotógrafos" },
  { number: "02", slug: "designers-illustrators", label: "Designers & Illustrators", labelEs: "Diseñadores e Ilustradores" },
  { number: "03", slug: "artists-performers", label: "Artists / Performers", labelEs: "Artistas / Intérpretes" },
  { number: "04", slug: "musicians-djs", label: "Musicians & DJs", labelEs: "Músicos y DJs" },
  { number: "05", slug: "filmmakers", label: "Filmmakers & Videographers", labelEs: "Cineastas y Videógrafos" },
  { number: "06", slug: "models-influencers", label: "Models & Influencers", labelEs: "Modelos e Influencers" },
  { number: "07", slug: "writers-authors", label: "Writers & Authors", labelEs: "Escritores y Autores" },
  { number: "08", slug: "coaches-consultants", label: "Coaches & Consultants", labelEs: "Coaches y Consultores" },
  { number: "09", slug: "developers-engineers", label: "Developers & Engineers", labelEs: "Desarrolladores e Ingenieros" },
  { number: "10", slug: "architects-interior", label: "Architects & Interior Designers", labelEs: "Arquitectos y Diseñadores de Interiores" },
  { number: "11", slug: "students-job-seekers", label: "Students & Job Seekers", labelEs: "Estudiantes y Buscadores de Empleo" },
  { number: "12", slug: "freelancers-creatives", label: "Freelancers & Creatives", labelEs: "Freelancers y Creativos" },
];
