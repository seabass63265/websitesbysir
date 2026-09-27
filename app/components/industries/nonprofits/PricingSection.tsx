import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "Choose Your Starting Point" — pricing cards for Nonprofits. Same layout
 * and `.tier-*` CSS as the Local Businesses pricing section, with the copy
 * written for nonprofits and community organizations.
 */
type Tier = {
  level: string;
  name: string;
  blurb: React.ReactNode;
  price: string;
  priceUnit?: string;
  monthlyPrice?: string;
  monthlyUnit?: string;
  caption?: string;
  buildItems: string[];
  monthlyItems?: string[];
  cta: string;
  featured?: boolean;
  /** Overrides "One-time build includes:". */
  buildLabel?: string;
  /** Overrides "Monthly service includes:". */
  monthlyLabel?: string;
};

const tiers: Tier[] = [
  {
    level: "Tier 1",
    name: "Essential",
    blurb:
      "For nonprofits and organizations that need a professional online home for their mission, programs, and community.",
    price: "$1,500",
    priceUnit: "one-time build",
    monthlyPrice: "$120",
    monthlyUnit: "per month\nfor hosting & maintenance",
    buildItems: [
      "Up to 4 pages",
      "Home page",
      "Mission and About page",
      "Programs or services page",
      "Contact information and inquiry form",
      "Donation-platform connection",
      "Social media links",
      "Custom mobile-responsive design",
      "Domain connection",
      "Basic search-engine setup",
      "Basic accessibility considerations",
      "Two revision rounds",
      "Testing and publishing",
    ],
    monthlyLabel: "Monthly website care includes:",
    monthlyItems: [
      "Managed website hosting",
      "SSL security and automated backups",
      "Uptime and performance monitoring",
      "Software and dependency maintenance",
      "Technical troubleshooting and support",
      "Program, staff, and content updates",
      "Up to 30 minutes of website updates per month",
    ],
    cta: "Request a Quote",
  },
  {
    level: "Tier 2",
    name: "Growth",
    blurb:
      "For nonprofits and organizations that want their website to actively support donations, volunteers, events, and community growth.",
    featured: true,
    price: "$2,250",
    priceUnit: "one-time build",
    monthlyPrice: "$180",
    monthlyUnit: "per month\nfor hosting & maintenance",
    buildItems: [
      "Up to 7 pages",
      "Everything included in Essential",
      "Individual program or initiative pages",
      "Donation-platform integration",
      "Volunteer interest and registration forms",
      "Events or community-calendar connection",
      "Impact stories and testimonials",
      "Leadership, staff, or board profiles",
      "Newsletter sign-up integration",
      "Resource and document sections",
      "English and Spanish website option",
      "Three revision rounds",
      "Testing and publishing",
    ],
    monthlyLabel: "Monthly website care includes:",
    monthlyItems: [
      "Everything included in Essential website care",
      "Program, event, staff, and resource updates",
      "Donation-campaign and volunteer updates",
      "Impact story and testimonial updates",
      "Seasonal campaigns and announcements",
      "Priority technical support",
      "Faster response times",
      "Up to one hour of website updates per month",
    ],
    cta: "Request a Quote",
  },
  {
    level: "Tier 3",
    name: "Tailored",
    blurb: (
      <>
        For <strong>nonprofits and organizations that need</strong> something
        outside our standard packages—whether that means a focused website on{" "}
        <strong>
          a smaller budget ($) or a fully customized digital experience ($$$).
        </strong>
      </>
    ),
    price: "Custom Pricing",
    caption:
      "Built around your mission, community, required features, budget, and project scope.",
    buildLabel: "Your custom build may include:",
    buildItems: [
      "A custom page structure",
      "Multiple programs, chapters, or locations",
      "Advanced donation and fundraising connections",
      "Volunteer registration and management workflows",
      "Membership or community portals",
      "Event registration and ticketing connections",
      "Resource libraries and document collections",
      "Impact reports and success stories",
      "English and Spanish website options",
      "Custom interactions and animations",
      "Copywriting and mission-storytelling support",
      "Unique functionality built around your organization",
    ],
    monthlyLabel: "Monthly website care may include:",
    monthlyItems: [
      "Managed website hosting",
      "SSL security and automated backups",
      "Uptime and performance monitoring",
      "Software and dependency maintenance",
      "Technical troubleshooting and support",
      "Program, event, staff, and content updates",
      "Donation and volunteer campaign updates",
      "Impact story, resource, and announcement updates",
      "Development support based on your selected plan",
      "Additional services tailored to your organization",
    ],
    cta: "Plan a Custom Project",
  },
];

export default function PricingSection() {
  return (
    <NumberedSection
      n="04"
      label="Pricing"
      id="pricing"
      className="inverted"
      tag="04 / PRICING"
    >
      <div className="pad-global border-b">
        <div className="text-sm" style={{ marginBottom: "0.5rem" }}>
          Nonprofits &amp; Organizations Pricing
        </div>
        <h2 className="text-lg" style={{ marginBottom: "1rem" }}>
          Choose Your Starting Point
        </h2>
        <p className="text-md">
          A one-time flat fee covers the design, development, and launch. A
          monthly service fee covers hosting, maintenance, updates, and
          technical support. No hidden fees.
        </p>
      </div>

      <div className="tier-grid">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={
              tier.featured ? "tier-card tier-card--featured" : "tier-card"
            }
          >
            {tier.featured && (
              <div className="tier-card__badge">Most Popular</div>
            )}

            <div className="pill-tag tier-card__level">{tier.level}</div>
            <h3 className="text-lg">{tier.name}</h3>
            <p className="text-sm tier-card__blurb">{tier.blurb}</p>

            {tier.priceUnit && (
              <div className="tier-card__price-lead">Starting at</div>
            )}
            <div className="tier-card__price-row">
              <span className="tier-card__price">{tier.price}</span>
              {tier.priceUnit && (
                <span className="tier-card__price-unit">{tier.priceUnit}</span>
              )}
            </div>

            {tier.monthlyPrice ? (
              <div className="tier-card__monthly">
                <div className="tier-card__price-connector">
                  and after, just
                </div>
                <div className="tier-card__price-row tier-card__price-row--stacked">
                  <span className="tier-card__price">{tier.monthlyPrice}</span>
                  {tier.monthlyUnit && (
                    <span className="tier-card__price-unit">
                      {tier.monthlyUnit}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              tier.caption && (
                <div className="tier-card__caption">{tier.caption}</div>
              )
            )}

            <a href="#contact" className="btn-pill tier-card__cta">
              {tier.cta}
            </a>

            <div className="tier-list__group-label text-sm">
              {tier.buildLabel ?? "One-time build includes:"}
            </div>
            <ul className="tier-list text-xs">
              {tier.buildItems.map((label) => (
                <li key={label}>
                  <span className="tier-list__check" aria-hidden="true">
                    ✓
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            {tier.monthlyItems && (
              <>
                <div
                  className="tier-list__group-label text-sm"
                  style={{ marginTop: "1.5rem" }}
                >
                  {tier.monthlyLabel ?? "Monthly service includes:"}
                </div>
                <ul className="tier-list text-xs">
                  {tier.monthlyItems.map((label) => (
                    <li key={label}>
                      <span className="tier-list__check" aria-hidden="true">
                        ✓
                      </span>
                      {label}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="tier-footnote">
        <div className="tier-footnote__item">
          <div className="tier-footnote__label text-sm">Service Term</div>
          <p>
            Both plans require an initial 12-month website service agreement.
            After the initial term, service renews every 6 months.
          </p>
        </div>
        <div className="tier-footnote__item">
          <div className="tier-footnote__label text-sm">Third-Party Costs</div>
          <p>
            Domain registration, donation and fundraising platforms, payment
            processing fees, email and CRM systems, and other third-party
            subscriptions are billed separately.
          </p>
        </div>
      </div>
    </NumberedSection>
  );
}
