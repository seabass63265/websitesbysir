import type { TocEntry } from "@/lib/blog/types";

/** Anchor list of an article's h2/h3 headings — static, no scroll-spy JS. */
export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  return (
    <nav className="blog-toc" aria-label="Table of contents">
      <div className="text-xs blog-toc__label">On This Page</div>
      <ol>
        {toc.map((entry) => (
          <li key={entry.id} data-level={entry.level}>
            <a href={`#${entry.id}`}>{entry.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
