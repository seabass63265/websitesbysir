import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "@/lib/blog/markdown";
import type { BlogFrontmatter, BlogPost } from "@/lib/blog/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

function readingTimeFor(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function loadFile(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;

  const required: (keyof BlogFrontmatter)[] = [
    "title",
    "slug",
    "description",
    "publishedAt",
    "author",
    "category",
  ];
  for (const field of required) {
    if (!fm[field]) {
      throw new Error(`content/blog/${filename} is missing required field "${field}"`);
    }
  }

  const { html, toc } = renderMarkdown(content);

  return {
    ...fm,
    keywords: fm.keywords ?? [],
    html,
    toc,
    readingTime: readingTimeFor(content),
  };
}

/** Every post file, including drafts — not sorted or filtered. Cheap to
 * recompute per request: content is a handful of local files, not a
 * network call, and Next caches the route around it anyway. */
function loadAll(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(
      (file) => (file.endsWith(".md") || file.endsWith(".mdx")) && !file.startsWith("_")
    )
    .map(loadFile)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

/** Published posts, newest first — what the blog index, sitemap, feed, and
 * "related articles" are all built from. */
export function getAllPosts(): BlogPost[] {
  return loadAll().filter((post) => !post.draft);
}

/**
 * A single post by slug. Drafts are included by default so a direct link
 * still works for previewing an unpublished article (see the publishing
 * guide) — they're just never linked to, listed, or indexed (the article
 * page sets `noindex` on drafts; see app/blog/[slug]/page.tsx).
 */
export function getPostBySlug(
  slug: string,
  { includeDrafts = true }: { includeDrafts?: boolean } = {}
): BlogPost | undefined {
  return loadAll().find(
    (post) => post.slug === slug && (includeDrafts || !post.draft)
  );
}

/** Slugs for every published post — what generateStaticParams statically
 * builds. A draft's slug is deliberately left out, so it only ever renders
 * via on-demand dynamic rendering (direct link), never pre-built. */
export function getPublishedSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((post) => post.category))).sort();
}

/** Up to `limit` other published posts, ranked by shared category first,
 * then by shared keywords. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const keywordSet = new Set((post.keywords ?? []).map((k) => k.toLowerCase()));

  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sameCategory = candidate.category === post.category ? 1 : 0;
      const sharedKeywords = (candidate.keywords ?? []).filter((k) =>
        keywordSet.has(k.toLowerCase())
      ).length;
      return { candidate, score: sameCategory * 10 + sharedKeywords };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
