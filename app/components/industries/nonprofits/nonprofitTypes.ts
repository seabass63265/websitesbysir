/**
 * "Built for" list on the Nonprofits page: the kinds of nonprofits and
 * community organizations the website is built for.
 */
export type NonprofitType = {
  number: string;
  slug: string;
  label: string;
};

export const nonprofitTypes: NonprofitType[] = [
  { number: "01", slug: "community-orgs", label: "Community Groups" },
  { number: "02", slug: "food-banks", label: "Food Banks & Pantries" },
  { number: "03", slug: "youth-education", label: "Youth & Education" },
  { number: "04", slug: "animal-rescues", label: "Animal Rescues" },
  { number: "05", slug: "health-wellness", label: "Health & Wellness" },
  { number: "06", slug: "arts-culture", label: "Arts & Culture" },
  { number: "07", slug: "faith-based", label: "Faith-Based Groups" },
  { number: "08", slug: "environmental", label: "Environmental Groups" },
  { number: "09", slug: "housing-shelter", label: "Housing & Shelter" },
  { number: "10", slug: "advocacy-civic", label: "Advocacy & Civic" },
  { number: "11", slug: "mutual-aid", label: "Mutual Aid" },
  { number: "12", slug: "foundations", label: "Foundations" },
];
