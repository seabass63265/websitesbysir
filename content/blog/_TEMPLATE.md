---
# REUSABLE ARTICLE TEMPLATE — copy this file to a new name (e.g.
# how-to-choose-a-web-designer.md) and fill it in. See
# docs/blog-publishing.md for the full step-by-step workflow.
#
# This file starts with `_` so the blog's content loader skips it (it only
# reads files ending in .md/.mdx, and ignores any that start with `_`) —
# it's a reference copy, not a real post. Don't name your copy starting
# with `_` or it'll be ignored the same way.
#
# IMPORTANT: nothing may appear before this opening `---` line — the
# frontmatter parser requires it to be the very first thing in the file.

# REQUIRED — shown as the <h1> and in <title>/meta tags. Keep it close to
# what Outrigger wrote; trim only if it runs long for a page title.
title: "REPLACE: Article Title Here"

# REQUIRED — the article's URL: sirwebs.com/blog/<slug>. Lowercase,
# hyphenated, no dates/numbers needed. Once published, NEVER change this —
# see "Updating an article later" in the publishing guide.
slug: "replace-with-url-slug"

# REQUIRED — one or two sentences. Shown on the blog index card and used as
# the page's meta description (what shows up in Google search results).
description: "REPLACE: A one-to-two sentence summary of the article."

# REQUIRED — ISO date (YYYY-MM-DD), the day this goes live.
publishedAt: "2026-01-01"

# OPTIONAL — only add this when you substantively revise a published
# article. Leave it out on first publish.
# updatedAt: "2026-02-01"

# REQUIRED — byline shown on the article.
author: "Sebastian Rocha"

# REQUIRED — one category. Reuse an existing one where it fits (check the
# other files in this folder) so articles group together on the blog;
# invent a new one only when nothing existing applies.
category: "REPLACE: Category Name"

# OPTIONAL but recommended — a few topical keywords/phrases, used only for
# "related articles" matching. Not a meta-keywords tag (those don't affect
# SEO) — just internal matching.
keywords:
  - "REPLACE: keyword one"
  - "REPLACE: keyword two"

# OPTIONAL — path under /public, e.g. "/blog/your-image.jpg". Drop the file
# in public/blog/ first. Leave both fields out entirely if there's no cover
# image yet; don't fill in a path that doesn't exist.
# coverImage: "/blog/replace-with-filename.jpg"
# coverImageAlt: "REPLACE: describe what's in the image, for screen readers"

# REQUIRED while working on this — sirwebs.com/blog/<slug> will 404 for
# visitors and the page is skipped from the blog grid, sitemap, related
# articles, and RSS feed. You can still open it directly on localhost (or on
# the live site via its direct URL, marked "DRAFT" and hidden from search)
# to preview it. Flip to `false` only when it's ready to go live.
draft: true

# OPTIONAL — only set this if the article was originally published
# elsewhere and this is a republished/syndicated copy; it tells search
# engines which URL is canonical so this copy doesn't compete with it.
# canonicalUrl: "https://example.com/original-article"
---

<!--
  Everything below the second `---` is the article body, in Markdown.
  Use ## and ### for section headings (## shows up in the table of
  contents on longer articles) — don't use a single top-level #, the page
  already renders the title above this as the <h1>.
-->

## REPLACE: First Section Heading

REPLACE: Paste the reviewed Outrigger article body here, section by
section. Keep headings as `##`/`###`, keep paragraphs as plain text
separated by blank lines, and use standard Markdown for lists, **bold**,
*italics*, and [links](https://example.com).

## REPLACE: Next Section Heading

REPLACE: Continue the article here.
