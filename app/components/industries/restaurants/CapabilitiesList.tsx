import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Restaurant Website Pages" — the hoverable list of pages a hospitality
 * build covers. Same list-row primitive as the marketing <ServicesList>.
 */
const pages = [
  {
    title: "Home",
    detail:
      "A strong introduction featuring the restaurant, popular dishes, location, hours, and primary actions.",
    plan: "Essential",
  },
  {
    title: "Menu",
    detail:
      "A mobile-friendly digital menu organized by category, with descriptions, prices, and dietary labels.",
    plan: "Essential",
  },
  {
    title: "Our Story",
    detail:
      "The restaurant's history, family, culture, values, recipes, and the people behind the business.",
    plan: "Essential",
  },
  {
    title: "Order Online",
    detail:
      "Connect customers to Toast, DoorDash, Grubhub, Uber Eats, ChowNow, or the restaurant's preferred ordering system.",
    plan: "Essential",
  },
  {
    title: "Locations & Hours",
    detail:
      "Show each location's address, hours, phone number, parking details, and Google Maps directions.",
    plan: "Essential",
  },
  {
    title: "Contact Info",
    detail:
      "Phone number, email, social media, directions, accessibility information, and answers to common questions.",
    plan: "Essential",
  },
  {
    title: "Promotions & Specials",
    detail:
      "Highlight seasonal menus, limited-time offers, happy hours, upcoming events, and important announcements through custom website sections or homepage banners.",
    plan: "Growth",
  },
  {
    title: "Reservations",
    detail:
      "Allow customers to reserve through OpenTable, Resy, Yelp Reservations, or another booking platform.",
    plan: "Growth",
  },
  {
    title: "Multilingual Website",
    detail:
      "Culturally informed English and Spanish translation, with support for additional languages, so your restaurant's voice stays clear, natural, and authentic.",
    plan: "Growth",
  },
  {
    title: "Gallery",
    detail:
      "Professional photos of the food, restaurant, team, and customer experience.",
    plan: "Growth",
  },
  {
    title: "Private Events",
    detail:
      "Information and an inquiry form for parties, large groups, celebrations, or restaurant buyouts.",
    plan: "Tailored",
  },
] as const;

export default function CapabilitiesList() {
  return (
    <NumberedSection
      n="02"
      label="Restaurant Website Pages"
      id="capabilities"
      bodyClassName="pad-global"
    >
      <div className="service-list">
        {pages.map((page, index) => (
          <div
            key={page.title}
            className={
              index < pages.length - 1 ? "list-row border-b" : "list-row"
            }
          >
            <div>
              <h2 className="text-lg page-list__title">{page.title}</h2>
              <div className="page-list__detail" style={{ marginTop: "0.5rem" }}>
                {page.detail}
              </div>
            </div>
            <div className={`pill-tag page-list__plan page-list__plan--${page.plan.toLowerCase()}`}>
              {page.plan}
            </div>
          </div>
        ))}
      </div>
    </NumberedSection>
  );
}
