import { Marked } from "marked";
import type { TocEntry } from "@/lib/blog/types";

/** Lowercase, hyphenated, URL-safe anchor id for a heading's text. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Renders an article's Markdown body to HTML and, alongside it, the list of
 * h2/h3 headings (each given a matching `id`) for the optional table of
 * contents. One isolated `Marked` instance (not the shared default export)
 * so this module's renderer override can't leak into anything else that
 * might use `marked` later.
 */
export function renderMarkdown(markdown: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const seen = new Map<string, number>();

  const marked = new Marked({
    renderer: {
      heading(token) {
        const text = this.parser.parseInline(token.tokens);
        let id = slugify(token.text);
        const count = seen.get(id) ?? 0;
        seen.set(id, count + 1);
        if (count > 0) id = `${id}-${count}`;

        if (token.depth === 2 || token.depth === 3) {
          toc.push({ id, text: token.text, level: token.depth });
        }

        return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//i.test(href) && !href.includes("sirwebs");
        const titleAttr = title ? ` title="${title}"` : "";
        const externalAttrs = external
          ? ' target="_blank" rel="noopener noreferrer"'
          : "";
        return `<a href="${href}"${titleAttr}${externalAttrs}>${text}</a>`;
      },
    },
  });

  const html = marked.parse(markdown, { async: false });
  return { html, toc };
}
