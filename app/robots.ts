import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/shareMeta";

/**
 * No robots.txt existed before this — crawlers (Google, legitimate AI
 * assistants) got no explicit guidance at all. This opens the whole site up
 * except the no-index `/share/*` preview-link pages, and points to the new
 * sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/share/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
