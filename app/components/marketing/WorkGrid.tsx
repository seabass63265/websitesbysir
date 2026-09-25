import { TransitionLink } from "@/app/components/providers/PageTransition";

/**
 * "Why a Website" — a compact figure/caption block, not a full section:
 * a small bordered card floating on a blueprint field, three short reasons
 * inside. Server component — the pulsing nodes and hover states are pure
 * CSS.
 */
type Reason = {
  number: string;
  title: string;
  tagline: string;
  points: string[];
  graphic: "found" | "convert" | "trust";
};

const reasons: Reason[] = [
  {
    number: "01",
    title: "Get Found",
    tagline:
      "Be visible at the exact moment people search for your services online.",
    points: ["Local Search", "New Customers"],
    graphic: "found",
  },
  {
    number: "02",
    title: "Convert Visitors",
    tagline: "Guide prospects seamlessly to book, order, or call instead of leaving.",
    points: ["More Calls", "Generate Leads"],
    graphic: "convert",
  },
  {
    number: "03",
    title: "Build Trust",
    tagline:
      "Look established and credible to become the first choice, not a backup.",
    points: ["Credibility", "Professional"],
    graphic: "trust",
  },
];

/* ---------- small blueprint diagrams — pulsing nodes, scale on hover ---------- */

function FoundGraphic() {
  return (
    <svg className="reason-graphic" viewBox="0 0 100 100" aria-hidden="true">
      <path
        className="reason-graphic__line"
        d="M50 30 L50 70 M30 50 L70 50 M36 36 L64 64 M64 36 L36 64"
      />
      <circle className="reason-graphic__node" cx="50" cy="50" r="2.5" />
    </svg>
  );
}

function ConvertGraphic() {
  return (
    <svg className="reason-graphic" viewBox="0 0 100 100" aria-hidden="true">
      <circle className="reason-graphic__node" cx="38" cy="34" r="4" style={{ animationDelay: "0s" }} />
      <path className="reason-graphic__line" d="M41 38 L54 51" />
      <circle className="reason-graphic__node" cx="57" cy="54" r="4" style={{ animationDelay: "1s" }} />
      <circle
        className="reason-graphic__node"
        cx="57"
        cy="70"
        r="6"
        style={{ animationDelay: "1.5s" }}
      />
      <path className="reason-graphic__line reason-graphic__line--faint" d="M57 62 L57 66" />
      <path className="reason-graphic__line reason-graphic__line--faint" d="M49 70 L53 70" />
      <path className="reason-graphic__line reason-graphic__line--faint" d="M61 70 L65 70" />
      <circle className="reason-graphic__dot" cx="57" cy="70" r="1.2" fill="currentColor" />
    </svg>
  );
}

function TrustGraphic() {
  const nodes: [number, number][] = [
    [50, 32],
    [68, 46],
    [61, 68],
    [39, 68],
    [32, 46],
  ];
  const delays = ["0s", "0.6s", "1.2s", "1.8s", "2.4s"];
  return (
    <svg className="reason-graphic" viewBox="0 0 100 100" aria-hidden="true">
      <path
        className="reason-graphic__line"
        d="M50 32 L68 46 L61 68 L39 68 L32 46 Z"
      />
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          className="reason-graphic__node"
          cx={x}
          cy={y}
          r="2.5"
          style={{ animationDelay: delays[i] }}
        />
      ))}
    </svg>
  );
}

const GRAPHICS = {
  found: FoundGraphic,
  convert: ConvertGraphic,
  trust: TrustGraphic,
};

function ReasonCard({ reason }: { reason: Reason }) {
  const Graphic = GRAPHICS[reason.graphic];
  return (
    <div className="work-card">
      <div className="work-card__header border-b">
        <h3 className="text-xs work-card__title">
          {reason.number} &mdash; {reason.title}
        </h3>
      </div>

      <div className="work-visual">
        <Graphic />
      </div>

      <div className="work-details">
        <div>
          <p className="text-xs work-card__tagline">{reason.tagline}</p>
          <div className="tags" style={{ marginTop: "0.75rem" }}>
            {reason.points.map((point) => (
              <span key={point} className="pill-tag">
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkGrid() {
  return (
    <section id="work" className="border-t border-b work-field">
      <h2 className="work-field__title">
        <span>
          “Don’t put your business online,”
          <br className="work-field__title-break" />
          {" "}our parents said.
        </span>
        <span>We made a business out of doing exactly that.</span>
      </h2>
      <div className="work-card-frame">
        <div className="work-card-frame__header border-b">
          <span className="work-card-frame__label">Why You Need A Website</span>
          <span className="pill-tag">Fig. 1</span>
        </div>

        <div className="work-grid">
          {reasons.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </div>
      </div>
      <TransitionLink href="/why-sir" className="btn-pill">
        Why SIR_? <span aria-hidden="true">&nbsp;&rarr;</span>
      </TransitionLink>
    </section>
  );
}
