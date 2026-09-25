import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * "Select Service Area" list. Server component — hover states are pure CSS.
 * Rows with an `href` link through to a dedicated industry page.
 */
const services: { title: string; detail: string; href?: string }[] = [
  {
    title: "Restaurants & Cafés",
    detail:
      "Digital Menus • Online Ordering • Reservations • Yelp • Google Maps • DoorDash / Grubhub / Uber Eats • Our Story • Bilingual (EN/ES)",
    href: "/industries/restaurants-and-cafes",
  },
  {
    title: "Local Businesses",
    detail:
      "Barber Shops • Salons • Dentists • Auto Repair • Landscapers • Contractors • Cleaning Services • Fitness Studios • Pet Groomers • Tutors • & More",
    href: "/industries/local-businesses",
  },
  {
    title: "Portfolios & Personal Brands",
    detail:
      "Portfolios • Appointment Booking • Social Media • Testimonials • Contact Forms • Newsletters",
    href: "/industries/portfolios-and-personal-brands",
  },
  {
    title: "Startups",
    detail:
      "Landing Pages • Product Demos • Waitlists • User Sign-Ups • Investor Pages • Analytics • Our Story",
    href: "/industries/startups",
  },
  {
    title: "Nonprofits & Organizations",
    detail:
      "Donations • Events • Volunteer Forms • Newsletters • Resources • Our Story • Bilingual (EN/ES)",

    href: "/industries/nonprofits",
  },
  {
    title: "Something Else?",
    detail:
      "Custom Features • Third-Party Integrations • Mobile-Responsive • SEO • Ongoing Support",
    href: "/industries/something-else",
  },
];

export default function ServicesList() {
  return (
    <section id="services" className="pad-global border-b">
      <div
        className="services-heading border-b"
        style={{ paddingBottom: "1rem", marginBottom: "1rem" }}
      >
        <span>Select Service Area</span>
        <span className="services-heading__arrow" aria-hidden="true">
          &darr;
        </span>
      </div>

      <div className="service-list">
        {services.map((service, index) => {
          const className =
            index < services.length - 1 ? "list-row border-b" : "list-row";
          const body = (
            <>
              <div>
                <h2 className="text-lg">{service.title}</h2>
                <div className="text-xs" style={{ marginTop: "0.25rem" }}>
                  {service.detail}
                </div>
              </div>
              <div className="text-lg">→</div>
            </>
          );

          return service.href ? (
            <TransitionLink
              key={service.title}
              href={service.href}
              className={className}
            >
              {body}
            </TransitionLink>
          ) : (
            <div key={service.title} className={className}>
              {body}
            </div>
          );
        })}
      </div>
    </section>
  );
}
