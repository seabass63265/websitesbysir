# Publishing a blog article from Outrigger Content

The blog is plain Markdown files — no CMS, no database, no login. Every
article lives in `content/blog/` as one `.md` file. Adding, previewing,
editing, or publishing an article just means adding or editing that file
and deploying like normal.

## 1. Export or copy the approved article from Outrigger

Get the final, reviewed text as plain text or Markdown — headings,
paragraphs, links, bold/italics. You don't need any special formatting from
Outrigger; you'll paste it into the body section below.

## 2. Create a new article file

Copy `content/blog/_TEMPLATE.md` to a new file in the same folder, named
after the article, e.g.:

```
content/blog/how-to-choose-a-web-designer.md
```

The filename itself doesn't matter (it's not the URL) — but keeping it
readable makes the folder easier to scan later.

## 3. Fill in every field at the top of the file

The template has a comment above every field explaining what it's for.
The required ones are:

| Field | What it is |
| --- | --- |
| `title` | The headline, shown as the page title and the `<h1>` |
| `slug` | The URL: `sirwebs.com/blog/<slug>` — lowercase, hyphenated |
| `description` | 1–2 sentences, shown on the card and in Google search results |
| `publishedAt` | `YYYY-MM-DD` |
| `author` | Byline |
| `category` | Reuse an existing category where it fits (check other files in the folder) |

`keywords`, `coverImage`/`coverImageAlt`, `updatedAt`, and `canonicalUrl`
are optional — the template explains each one.

## 4. Add and optimize a cover image (optional)

1. Save the image under `public/blog/` (e.g. `public/blog/how-to-choose-a-web-designer.jpg`).
   Keep it reasonably sized — under ~500KB, ideally a `.jpg` or `.webp` — the
   page will resize it responsively, but a huge source file still slows down
   the initial load.
2. Set `coverImage: "/blog/how-to-choose-a-web-designer.jpg"` in the
   frontmatter.
3. Always set `coverImageAlt` too — a plain-language description of what's
   in the image, for screen readers and for search engines.

If there's no image yet, leave both fields out entirely (commented out, as
in the template) — the card and article will just skip the image, not show
a broken one.

## 5. Paste the article body

Below the second `---`, paste the reviewed Outrigger article as Markdown:

- `##` for section headings (these automatically populate the "On This
  Page" table of contents once there are 3 or more)
- `###` for sub-headings
- Blank line between paragraphs
- `**bold**`, `*italics*`, `[link text](https://...)` for links
- `-` for bullet lists, `1.` for numbered lists

Don't add a top-level `#` heading — the page already renders `title` as the
`<h1>` above the body.

## 6. Preview the article

With `draft: true` (the template's default), the article:

- Is **not** listed on `/blog`, in related articles, in the sitemap, or in
  the RSS feed
- **Is** viewable directly, locally, by running `npm run dev` and visiting
  `http://localhost:3000/blog/<slug>`
- If pushed to production while still a draft, it's also viewable at its
  direct live URL (e.g. for sharing a preview link with someone else before
  it's public) — the page shows a yellow "Draft" banner and tells search
  engines not to index it, so it stays effectively unlisted

Check the title, images, links, reading time, and that every section reads
correctly before moving on.

## 7. Keep it as a draft until it's ready

Leave `draft: true` for as long as needed — there's no deadline pressure
baked into the system. Nothing public changes until you flip it.

## 8. Publish

Set `draft: false` and deploy (commit + push, same as any other change on
this site). The article will then:

- Appear on `/blog`, sorted by `publishedAt` (newest first)
- Show up as a candidate for "related articles" on other posts that share
  its category or keywords
- Be included in `/sitemap.xml` and `/blog/feed.xml`

## Updating an article later without changing its URL

Edit the same file directly. The URL (`slug`) is what matters for
links/bookmarks/search rankings — as long as you don't change `slug`, you
can freely edit the title, body, or image and redeploy; the URL stays the
same. If you make a substantive revision after publishing, also set
`updatedAt` to the date of the revision (this shows "Updated <date>" on the
article and updates its structured data).

## Reusing a category

Before inventing a new `category` value, check the other files in
`content/blog/` for one that already fits — articles with the same category
string group together automatically (they show up as "related" to each
other), so consistent spelling matters.
