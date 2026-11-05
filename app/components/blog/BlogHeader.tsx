"use client";

import { TransitionLink } from "@/app/components/providers/PageTransition";
import NavMenu from "@/app/components/marketing/NavMenu";

/**
 * /blog and /blog/[slug] header — wordmark plus a page breadcrumb, matching
 * the other pages' headers (/work, /why-sir, /contact), with the standard
 * fullscreen blob menu. "Blog" reads the same in English and Spanish, so
 * unlike the other breadcrumbs this one doesn't need useT().
 */
export default function BlogHeader({
  crumb,
}: {
  /** Article title, shown as a third breadcrumb segment on an article page. */
  crumb?: string;
}) {
  return (
    <>
      <header className="border-b pad-global text-sm">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          <TransitionLink href="/">SIR_</TransitionLink>
          <span style={{ opacity: 0.5 }}>/</span>
          <TransitionLink href="/blog">Blog</TransitionLink>
          {crumb && (
            <>
              <span style={{ opacity: 0.5 }}>/</span>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {crumb}
              </span>
            </>
          )}
        </div>
      </header>
      <NavMenu />
    </>
  );
}
