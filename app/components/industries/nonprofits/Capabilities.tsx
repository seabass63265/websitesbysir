import NumberedSection from "@/app/components/industries/NumberedSection";

/**
 * "What We Can Build" — six hoverable aspect-square capability cards,
 * written for nonprofits and community organizations.
 */
const capabilities = [
  {
    title: "Donations & Fundraising",
    body: "Connect your donation platform so supporters can give one-time or monthly, with clear campaign pages and progress that show where gifts go.",
  },
  {
    title: "Events & Volunteer Sign-Ups",
    body: "Event calendars, RSVP pages, and volunteer forms that collect what you need and route sign-ups to the right person.",
  },
  {
    title: "Programs & Impact Pages",
    body: "Pages that explain your programs, share your story, and show your impact with photos, numbers, and testimonials.",
  },
  {
    title: "Newsletters & Outreach",
    body: "Email sign-ups connected to the tools you already use, plus social media, resources, and press pages that keep supporters informed.",
  },
  {
    title: "Bilingual & Accessible",
    body: "English and Spanish versions and accessibility-minded design so everyone in your community can find help and get involved.",
  },
  {
    title: "And Much More",
    body: "Whatever your organization needs, we can meet it. Tell us what you have in mind and we'll build it around your mission.",
  },
];

export default function Capabilities() {
  return (
    <NumberedSection
      n="02"
      label="Capabilities"
      id="capabilities"
      className="inverted"
      tag="02 / CORE CAPABILITIES"
    >
      <div className="pad-global border-b">
        <h2 className="text-lg">What We Can Build</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {capabilities.map((item, index) => {
          const isLastCol = (index + 1) % 3 === 0;
          const isLastRow = index >= capabilities.length - 3;
          return (
            <div
              key={item.title}
              className={`pad-global aspect-square flex flex-col justify-between hover:bg-bg hover:text-brand group transition-colors cursor-crosshair${
                isLastRow ? "" : " border-b"
              }${isLastCol ? "" : " border-r"}`}
            >
              <div
                className="group-hover:opacity-100"
                style={{ opacity: 0.5, marginBottom: "1rem", fontSize: "1.1rem" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-lg" style={{ marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
                <p
                  className="text-sm"
                  style={{
                    opacity: 0.8,
                    textTransform: "none",
                    letterSpacing: "normal",
                  }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </NumberedSection>
  );
}
