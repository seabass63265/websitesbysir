/**
 * "Built for" list on the Something Else page: the kinds of projects that
 * don't fit the other service areas but still deserve a great website.
 */
export type SomethingElseType = {
  number: string;
  slug: string;
  label: string;
};

export const somethingElseTypes: SomethingElseType[] = [
  { number: "01", slug: "nonprofits", label: "Nonprofits" },
  { number: "02", slug: "schools-student-orgs", label: "Schools & Students" },
  { number: "03", slug: "events-conferences", label: "Events & Conferences" },
  { number: "04", slug: "real-estate", label: "Real Estate" },
  { number: "05", slug: "faith-communities", label: "Faith Communities" },
  { number: "06", slug: "clubs-communities", label: "Clubs & Communities" },
  { number: "07", slug: "membership-sites", label: "Membership Sites" },
  { number: "08", slug: "online-courses", label: "Online Courses" },
  { number: "09", slug: "directories-listings", label: "Directories" },
  { number: "10", slug: "campaigns-advocacy", label: "Campaigns & Advocacy" },
  { number: "11", slug: "custom-web-apps", label: "Custom Web Apps" },
  { number: "12", slug: "one-of-a-kind", label: "One-of-a-Kind Ideas" },
];
