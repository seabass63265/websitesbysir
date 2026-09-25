import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  previews,
  sharePreviewMetadata,
  siteDescription,
  siteTitle,
} from "@/app/shareMeta";
import ShareRedirect from "./ShareRedirect";

/**
 * `/share/<name>` — a link to send when you want a specific link preview
 * (e.g. `/share/homepage` vs `/share/tunnel`). Chat apps read this page's
 * preview tags; people who open the link are sent straight to the homepage.
 * Kept out of search results.
 */
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(previews).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const preview = previews[slug as keyof typeof previews];
  if (!preview) return {};
  return {
    title: siteTitle,
    description: siteDescription,
    robots: { index: false, follow: false },
    ...sharePreviewMetadata(preview),
  };
}

export default async function SharePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!(slug in previews)) notFound();
  return <ShareRedirect />;
}
