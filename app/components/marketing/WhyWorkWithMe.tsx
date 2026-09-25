/**
 * "Why Work With Me" — the case for working directly with Sebastian rather
 * than a template or an AI page generator. Sits directly above the contact
 * form. Ported closely from the standalone reference mockup (corner
 * brackets, scan line, dashed connectors, glow-on-hover), rebuilt on
 * Tailwind utilities + the site's --brand token instead of the mockup's
 * one-off "navy" color and CDN config. White ground / navy ink, matching
 * the rest of the site. Server component — hover/scan effects are pure
 * CSS (see the `--animate-*` tokens and `.scan-line`/`.dashed-flow-y`
 * helpers in globals.css).
 *
 * Things this codebase's base styles fight against, worth knowing before
 * touching this file:
 *  - `space-y-*`/`divide-*` do not generate in this project's Tailwind
 *    setup (no rule ever gets emitted for them here) — use `flex flex-col
 *    gap-*` and explicit per-child borders instead.
 *  - `<header>` is reserved globally (`header { ... }` in globals.css is
 *    the sticky site nav) — never use it for an internal card.
 *  - globals.css defines its own `.text-lg`/`.text-sm`/`.text-xs`/
 *    `.border-b`/`.border-t`/`.border-l`/`.border-r` design-system classes,
 *    and (deliberately) leaves them unlayered so they keep winning over
 *    Tailwind's same-named utilities everywhere else on the site. That
 *    means those exact seven Tailwind class names silently do nothing
 *    here — use arbitrary-value equivalents instead (`text-[1.125rem]`
 *    for `text-lg`, `border-b-[1px]` for `border-b`, etc.), as done
 *    throughout below. Anything with a numeric suffix Tailwind already
 *    provides (`border-b-2`, `text-xl`, `text-2xl`) doesn't collide and
 *    is used as-is.
 */
const technicalNodes = [
  "Design",
  "Structure",
  "Code",
  "Data",
  "Integrations",
  "Performance",
];

const pipeline = ["Generated", "Reviewed", "Tested", "Secured", "Maintained"];

const promptAndPublish = [
  "Generated quickly",
  "Unreviewed code",
  "Unknown dependencies",
  "Limited accountability",
];

const engineeredAndReviewed = [
  "Reviewed implementation",
  "Tested functionality",
  "Security-conscious development",
  "Ongoing accountability",
];

const engineerConcerns = [
  "How it works",
  "Performance",
  "Security",
  "Reliability",
  "Maintainability",
];

const ownerConcerns = [
  "Why it matters",
  "Customer experience",
  "Trust",
  "Efficiency",
  "Growth",
];

export default function WhyWorkWithMe() {
  return (
    <section id="why-me" className="blueprint-field border-b-[1px]">
      <div className="max-w-7xl mx-auto px-6 py-24 md:px-12 md:py-32 flex flex-col gap-16 md:gap-24">
        <div className="border border-brand bg-white/95 backdrop-blur-sm shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="M0,0 L100,0 L100,100 L0,100 Z" strokeDasharray="4 4" />
              <line x1="0" y1="0" x2="100" y2="100" />
              <line x1="100" y1="0" x2="0" y2="100" />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-brand animate-pulse-slow" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand/70 font-bold border border-brand/30 px-3 py-1">
                Why SIR_
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Why Work With Me?
            </h2>

            <p className="text-[1.125rem] md:text-xl lg:text-2xl text-brand/90 leading-relaxed border-l-2 border-brand/50 pl-6">
              Designed with intention. Engineered with care. Supported by
              someone who understands what&rsquo;s at stake.
            </p>
          </div>
        </div>

        <article className="border border-brand bg-white/95 backdrop-blur-sm shadow-xl flex flex-col lg:flex-row group">
          <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col">
            <div className="mb-12">
              <h3 className="text-2xl font-bold tracking-tight inline-block border-b-2 border-brand pb-2">
                01 &mdash; Technical Foundation
              </h3>
            </div>

            <div className="flex flex-col gap-8 text-base md:text-[1.125rem] text-brand/80 leading-relaxed max-w-2xl">
              <p>
                I earned my bachelor&rsquo;s degree in Computer Science with
                a minor in Statistics and Data Science. My background in
                software engineering and web development allows me to think
                beyond appearance and build websites as complete, functional
                systems.
              </p>
              <p>
                I understand the technology behind the design&mdash;from
                structure and performance to integrations, data, responsive
                behavior, and long-term maintainability.
              </p>
            </div>
          </div>

          <div className="flex-1 p-8 md:p-12 lg:p-16 bg-brand/[0.02] relative overflow-hidden flex items-center justify-center min-h-[400px] border-t-[1px] lg:border-t-0 lg:border-l-[1px] border-brand">
            <div className="absolute inset-0 blueprint-field opacity-30 pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm">
              <div className="absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 dashed-flow-y opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-full h-12 bg-brand blur-[4px] opacity-0 group-hover:opacity-50 group-hover:animate-flow-down" />
              </div>

              <div className="flex flex-col gap-6 md:gap-8 relative">
                {technicalNodes.map((node) => (
                  <div
                    className="flex items-center justify-center group/node cursor-default"
                    key={node}
                  >
                    <div className="bg-white border border-brand px-6 py-3 w-48 text-center shadow-[0_0_0_rgba(0,49,83,0)] group-hover/node:shadow-[0_0_15px_rgba(0,49,83,0.2)] group-hover/node:bg-brand group-hover/node:text-white transition-all duration-300 relative z-10">
                      <span className="text-[0.75rem] font-bold uppercase tracking-widest">
                        {node}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="border border-brand bg-white shadow-2xl flex flex-col relative overflow-hidden ring-1 ring-brand/20 ring-offset-4 ring-offset-white">
          <div className="absolute inset-0 blueprint-field blueprint-field--dense opacity-20 pointer-events-none" />
          <div className="scan-line animate-scan h-[200%] top-[-50%]" />

          <div className="p-8 md:p-12 lg:p-16 relative z-10 border-b-[1px] border-brand bg-white/80 backdrop-blur-sm">
            <div className="mb-10">
              <span className="inline-block border border-brand/30 px-4 py-2 text-[0.875rem] font-bold uppercase tracking-widest text-brand/60 mb-6 bg-white">
                Engineered, Not Generated
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight inline-block border-b-2 border-brand pb-2">
                02 &mdash; Your Website Deserves More Than a Prompt.
              </h3>
            </div>

            <div className="text-base md:text-[1.125rem] text-brand/90 leading-relaxed max-w-4xl columns-1 md:columns-2 gap-12">
              <p className="break-inside-avoid">
                AI can generate a website in minutes, but generating code
                is not the same as understanding it. Many websites are
                created through one-click tools, lightly edited, and
                published without anyone carefully reviewing what is
                happening underneath.
              </p>
              <p className="break-inside-avoid mt-6 md:mt-0">
                Unreviewed AI-generated websites can contain unnecessary
                dependencies, broken forms, poor performance, accessibility
                issues, exposed credentials, and security vulnerabilities.
                When the person delivering the website does not understand
                the code, your business becomes the testing environment.
              </p>
              <p className="break-inside-avoid mt-6">
                I use AI as a tool when it is helpful&mdash;but I do not
                rely on it to replace engineering judgment. I review, test,
                maintain, and take responsibility for the technology behind
                every website I deliver.
              </p>
            </div>
          </div>

          <div className="border-b-[1px] border-brand bg-white z-10 flex overflow-x-auto whitespace-nowrap p-4 text-[10px] uppercase tracking-[0.2em] font-bold text-brand/50 justify-start md:justify-center items-center gap-4">
            {pipeline.map((step, index) => (
              <span key={step} className="inline-flex items-center gap-4">
                <span className="text-brand">{step}</span>
                {index < pipeline.length - 1 && (
                  <span aria-hidden="true">&rarr;</span>
                )}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 bg-white/90 backdrop-blur-md">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-start bg-brand/[0.01]">
              <div className="mb-10">
                <span className="inline-block border border-brand/30 px-4 py-2 text-[0.875rem] font-bold uppercase tracking-widest text-brand/60 mb-6 bg-white">
                  Approach A
                </span>
                <h4 className="text-2xl font-bold tracking-tight text-brand/60 line-through decoration-brand/30">
                  Prompt &amp; Publish
                </h4>
              </div>

              <ul className="flex flex-col gap-8 flex-grow">
                {promptAndPublish.map((item) => (
                  <li className="flex items-start gap-4 opacity-70" key={item}>
                    <span className="text-brand/40 font-bold">&times;</span>
                    <span className="text-[1.125rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-start bg-brand/[0.04] shadow-[inset_0_0_40px_rgba(0,49,83,0.03)] relative border-t-[1px] md:border-t-0 md:border-l-[1px] border-brand">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand/50" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand/50" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand/50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand/50" />

              <div className="mb-10">
                <span className="inline-block border border-brand px-4 py-2 text-[0.875rem] font-bold uppercase tracking-widest text-white bg-brand mb-6">
                  My Approach
                </span>
                <h4 className="text-2xl font-bold tracking-tight text-brand">
                  Engineered &amp; Reviewed
                </h4>
              </div>

              <ul className="flex flex-col gap-8 flex-grow relative z-10">
                {engineeredAndReviewed.map((item) => (
                  <li className="flex items-start gap-4" key={item}>
                    <span className="text-brand font-bold border border-brand rounded-full w-6 h-6 flex items-center justify-center text-[0.75rem]">
                      &#10003;
                    </span>
                    <span className="text-[1.125rem] font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t-[1px] border-brand p-12 md:p-24 relative z-10 bg-white overflow-hidden flex items-center justify-center min-h-[40vh]">
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center text-brand">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="0.2"
                  strokeDasharray="1 2"
                />
                <line
                  x1="100"
                  y1="0"
                  x2="0"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="0.2"
                  strokeDasharray="1 2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="0.2"
                  fill="none"
                />
              </svg>
            </div>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-center leading-tight max-w-5xl bg-white/70 p-4 relative z-10 text-brand shadow-2xl">
              A prompt can generate code.
              <br className="hidden md:block" />
              <span className="text-brand/60">
                It cannot take responsibility for your business.
              </span>
            </h3>
          </div>
        </article>

        <article className="border border-brand bg-white/95 backdrop-blur-sm shadow-xl flex flex-col lg:flex-row group">
          <div className="p-8 md:p-12 lg:p-16 flex-1 flex flex-col order-1 lg:order-2">
            <div className="mb-12">
              <h3 className="text-2xl font-bold tracking-tight inline-block border-b-2 border-brand pb-2">
                03 &mdash; A Business Owner&rsquo;s Perspective
              </h3>
            </div>

            <div className="flex flex-col gap-8 text-base md:text-[1.125rem] text-brand/80 leading-relaxed max-w-2xl">
              <p>
                I built and operate my own local business, so I understand
                that a website needs to do more than look good. It should
                save time, answer customer questions, build trust, and help
                the business grow.
              </p>
              <p>
                I approach every project from both perspectives: the
                engineer responsible for how the website works and the
                business owner who understands why it matters.
              </p>
            </div>
          </div>

          <div className="flex-1 p-6 md:p-12 bg-brand/[0.02] relative overflow-hidden flex items-center justify-center order-2 lg:order-1 min-h-[500px] border-t-[1px] lg:border-t-0 lg:border-r-[1px] border-brand">
            <div className="absolute inset-0 blueprint-field opacity-30 pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg grid grid-cols-3 gap-0 h-full py-8">
              <div className="flex flex-col justify-between py-8 pr-4 md:pr-8 text-right border-r-[1px] border-dashed border-brand/30 relative">
                <div className="absolute right-0 top-1/2 w-8 border-t-[1px] border-dashed border-brand/30 -translate-y-1/2" />

                <div className="mb-8">
                  <h4 className="text-[0.75rem] md:text-[0.875rem] font-bold uppercase tracking-widest border-b-[1px] border-brand/30 pb-2 inline-block">
                    Engineer
                  </h4>
                </div>
                <div className="flex flex-col gap-6 text-[0.875rem] text-brand/70 font-bold uppercase tracking-wider">
                  {engineerConcerns.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <div className="absolute w-full h-px border-t-[1px] border-dashed border-brand/30 top-1/2 -translate-y-1/2 z-0 opacity-50" />
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand rounded-full z-10" />
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-brand rounded-full z-10" />

                <div className="bg-brand border border-brand text-white p-4 md:p-6 text-center shadow-[0_0_30px_rgba(0,49,83,0.15)] relative z-20 group-hover:scale-105 transition-transform duration-500 w-full mx-2 md:mx-4">
                  <span className="block text-[0.75rem] md:text-[0.875rem] font-bold leading-relaxed tracking-widest uppercase">
                    Built to work.
                    <br />
                    <span className="text-white/50 block my-2">&#10005;</span>
                    Built to matter.
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between py-8 pl-4 md:pl-8 text-left border-l-[1px] border-dashed border-brand/30 relative">
                <div className="absolute left-0 top-1/2 w-8 border-t-[1px] border-dashed border-brand/30 -translate-y-1/2" />

                <div className="mb-8">
                  <h4 className="text-[0.75rem] md:text-[0.875rem] font-bold uppercase tracking-widest border-b-[1px] border-brand/30 pb-2 inline-block">
                    Business Owner
                  </h4>
                </div>
                <div className="flex flex-col gap-6 text-[0.875rem] text-brand/70 font-bold uppercase tracking-wider">
                  {ownerConcerns.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-12 md:mt-24 text-center flex flex-col items-center gap-10 md:gap-14 relative z-10 pb-12">
          <div className="max-w-2xl mx-auto border border-brand/20 bg-white/80 p-8 md:p-12 backdrop-blur-sm relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-[1px] border-l-[1px] border-brand" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-[1px] border-r-[1px] border-brand" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[1px] border-l-[1px] border-brand" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[1px] border-r-[1px] border-brand" />

            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              One Person. Both Perspectives.
            </h3>
            <p className="text-base md:text-[1.125rem] text-brand/80 leading-relaxed">
              You work directly with the person designing, building, and
              supporting your site.
            </p>
          </div>

          <a
            href="/intake"
            className="group btn-pill filled relative gap-4 overflow-hidden hover:shadow-[0_0_40px_rgba(0,49,83,0.3)] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-white"
          >
            <span className="relative z-10 flex items-center gap-4">
              Start a Project
              <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300">
                &rarr;
              </span>
            </span>
            <div className="absolute inset-0 h-[200%] w-full bg-gradient-to-b from-transparent via-white/20 to-transparent top-[-100%] group-hover:animate-flow-down pointer-events-none" />
          </a>
        </div>
      </div>
    </section>
  );
}
