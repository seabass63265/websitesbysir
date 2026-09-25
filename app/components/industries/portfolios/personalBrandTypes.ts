/**
 * "Built for" list on the Portfolios & Personal Brands page: the kinds of
 * people and creators a personal website is built for.
 */
export type PersonalBrandType = {
  number: string;
  slug: string;
  label: string;
};

export const personalBrandTypes: PersonalBrandType[] = [
  { number: "01", slug: "photographers", label: "Photographers" },
  { number: "02", slug: "designers-illustrators", label: "Designers & Illustrators" },
  { number: "03", slug: "artists-performers", label: "Artists / Performers" },
  { number: "04", slug: "musicians-djs", label: "Musicians & DJs" },
  { number: "05", slug: "filmmakers", label: "Filmmakers & Videographers" },
  { number: "06", slug: "models-influencers", label: "Models & Influencers" },
  { number: "07", slug: "writers-authors", label: "Writers & Authors" },
  { number: "08", slug: "coaches-consultants", label: "Coaches & Consultants" },
  { number: "09", slug: "developers-engineers", label: "Developers & Engineers" },
  { number: "10", slug: "architects-interior", label: "Architects & Interior Designers" },
  { number: "11", slug: "students-job-seekers", label: "Students & Job Seekers" },
  { number: "12", slug: "freelancers-creatives", label: "Freelancers & Creatives" },
];
