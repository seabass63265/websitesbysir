import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * "About the studio" block on /why-sir, directly under the budget statement
 * (ported from the standalone About mockup, re-themed to the site's white
 * ground / navy ink). Server component.
 *
 * Note: this project's global `.text-lg/.text-sm/.text-xs/.border-t/.border-b`
 * classes shadow Tailwind's same-named utilities (see WhyWorkWithMe), so those
 * sizes/borders are written as arbitrary values here.
 */
const principles = [
  {
    title: "Strategy & Direction",
    body: "Mapping out the architecture and goals before writing a single line of code.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </>
    ),
  },
  {
    title: "Visual Design",
    body: "Creating a distinctive, professional aesthetic tailored to your brand's identity.",
    icon: (
      <>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Efficient Builds",
    body: "Developing robust, fast-loading sites delivered reliably and on schedule.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
];

const stats = [
  { value: "1", label: "Person behind every project" },
  { value: "2–3", label: "Business days to a reply" },
  { value: "100%", label: "Designed & built in-house" },
];

const buttonBase =
  "group inline-flex items-center justify-center gap-3 border border-brand px-8 py-4 font-bold uppercase tracking-wider text-[0.875rem] transition-colors";

export default function AboutStudio() {
  return (
    <section className="border-b-[1px]">
      <div className="max-w-[1152px] mx-auto px-6 py-20 md:py-24 flex flex-col gap-24 md:gap-32">
        {/* Every budget */}
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <span className="text-brand/50 text-[0.75rem] md:text-[0.875rem] uppercase tracking-widest">
              Money, straight up.
            </span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.1]">
              Every <span className="italic font-normal">budget.</span>
            </h2>
          </div>

          <p className="text-brand/70 max-w-2xl leading-relaxed text-[1.125rem] md:text-[1.25rem]">
            It can be intimidating to see a polished website and assume it is
            outside your budget — but that&rsquo;s why SIR_ is here. We work
            with businesses at every stage and offer options for a range of
            budgets, from simple, focused websites to fully custom builds.
          </p>

          <div className="border border-brand p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="border border-brand/30 px-4 py-2 text-[0.75rem] uppercase tracking-widest shrink-0 whitespace-nowrap">
              Simple &amp; focused
            </div>
            <div
              className="w-full md:flex-1 h-[1px] bg-brand/30 relative flex items-center justify-center min-w-[50px] mx-4"
              aria-hidden="true"
            >
              <div className="w-2 h-2 bg-brand/60" />
            </div>
            <div className="border border-brand/30 px-4 py-2 text-[0.75rem] uppercase tracking-widest shrink-0 whitespace-nowrap">
              Fully custom builds
            </div>
          </div>

          <p className="text-brand/50 text-[0.875rem]">
            Tell us what you need and what you&rsquo;re comfortable spending,
            and we&rsquo;ll help you find the right place to start.
          </p>
        </div>

        {/* Intro + founder, side by side on wide screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <div className="flex flex-col items-start w-full">
            <span className="text-brand/50 text-[0.75rem] md:text-[0.875rem] uppercase tracking-widest mb-6">
              The studio behind the work.
            </span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase leading-[1.1] mb-8">
              Websites for
              <br />
              <span className="italic">businesses.</span>
            </h2>
            <p className="text-brand/70 text-[1.125rem] md:text-[1.25rem] leading-relaxed max-w-3xl">
              SIR Websites is a one-person studio in Los Angeles. We design and
              build custom websites for businesses at every stage and budget —
              and we put your business online.
            </p>

            {/* Stats band */}
            <div className="w-full mt-12 border border-brand">
              <div className="bg-brand text-bg py-4 px-4 text-center font-bold uppercase text-[0.8125rem] md:text-[0.875rem] tracking-widest w-full">
                Built for businesses at every stage
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`p-6 flex flex-col items-center justify-center text-center${
                      index < stats.length - 1
                        ? " border-b md:border-b-0 md:border-r border-brand"
                        : ""
                    }`}
                  >
                    <div className="text-4xl md:text-5xl font-bold mb-3">
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-[0.75rem] text-brand/50 uppercase tracking-widest max-w-[150px]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Founder */}
          <div className="border border-brand p-8 md:p-12 flex flex-col items-center text-center w-full">
            <div className="w-56 h-56 border border-brand/30 flex flex-col items-center justify-between p-4 mb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-brand/30 mt-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="square"
                strokeLinejoin="miter"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className="text-[10px] text-brand/50 uppercase tracking-widest">
                Sebastian I. Rocha — Founder
              </div>
            </div>

            <div className="text-[0.75rem] text-brand/50 uppercase tracking-widest mb-3">
              Founder
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Sebastian I. Rocha
            </h3>
            <p className="text-brand/70 leading-relaxed max-w-2xl mb-10 text-[0.875rem] md:text-base">
              Designer, developer, and the person who answers your emails.
              Sebastian started SIR to give small businesses the kind of website
              usually reserved for companies with agencies and seven-figure
              budgets. Every project is designed, built, and shipped by the same
              pair of hands.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="border border-brand/30 px-4 py-2 text-[0.75rem] text-brand/70 uppercase tracking-wider">
                Est. Los Angeles, CA
              </div>
              <div className="border border-brand/30 px-4 py-2 text-[0.75rem] text-brand/70 uppercase tracking-wider">
                Est. 2024
              </div>
            </div>
          </div>
        </div>

        {/* How we work */}
        <div className="w-full max-w-[880px] mx-auto">
          <div className="text-[0.75rem] text-brand/50 uppercase tracking-widest mb-8">
            How we work
          </div>
          <div className="flex flex-col border-t-[1px]">
            {principles.map((item) => (
              <div
                key={item.title}
                className="py-8 border-b-[1px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
              >
                <div className="w-14 h-14 border border-brand/30 flex items-center justify-center shrink-0 text-brand/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-[1.125rem]">{item.title}</div>
                  <div className="text-brand/50 text-[0.875rem]">
                    {item.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="w-full max-w-[880px] mx-auto flex flex-col items-start gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to put your business online?
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <TransitionLink
              href="/intake"
              className={`${buttonBase} bg-brand text-bg! hover:bg-transparent hover:text-brand!`}
            >
              Start the intake
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </TransitionLink>
            <TransitionLink
              href="/contact"
              className={`${buttonBase} bg-transparent text-brand! hover:bg-brand hover:text-bg!`}
            >
              Other questions
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
