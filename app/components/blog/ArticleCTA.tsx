import { TransitionLink } from "@/app/components/providers/PageTransition";

/** Standard end-of-article CTA, linking to the existing intake/quote flow. */
export default function ArticleCTA() {
  return (
    <div className="blog-cta">
      <h2 className="text-lg blog-cta__title">
        Need a website built around your business? Tell us what you&rsquo;re
        working on.
      </h2>
      <TransitionLink href="/intake" className="btn-pill">
        Start a Project
      </TransitionLink>
    </div>
  );
}
