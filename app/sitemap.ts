import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/shareMeta";
import { getAllPosts } from "@/lib/blog/posts";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/work", changeFrequency: "monthly", priority: 0.7 },
  { path: "/why-sir", changeFrequency: "monthly", priority: 0.6 },
  { path: "/approach", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/industries/restaurants-and-cafes", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/local-businesses", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/nonprofits", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/portfolios-and-personal-brands", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/startups", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries/something-else", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Drafts are already excluded by getAllPosts() — never listed here.
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
