import { getAllPosts } from "@/lib/blog/posts";
import { siteUrl } from "@/app/shareMeta";

/** Escapes text for use inside an XML element (not a CDATA block). */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed for /blog — hand-written XML, no feed-generator dependency.
 * Drafts are already excluded by getAllPosts(). */
export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(`${post.publishedAt}T00:00:00Z`).toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category)}</category>
      <content:encoded><![CDATA[${post.html}]]></content:encoded>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SIR_ Websites Blog</title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Practical guidance on websites, design, and getting found online, from SIR_ Websites.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
