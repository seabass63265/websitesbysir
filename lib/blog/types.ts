export type BlogFrontmatter = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  keywords?: string[];
  coverImage?: string;
  coverImageAlt?: string;
  draft?: boolean;
  canonicalUrl?: string;
};

export type TocEntry = { id: string; text: string; level: 2 | 3 };

export type BlogPost = BlogFrontmatter & {
  /** Rendered article body as HTML (headings carry slugged ids). */
  html: string;
  /** h2/h3 headings pulled from the body, for the optional table of contents. */
  toc: TocEntry[];
  /** Whole-number minutes, computed from the raw Markdown body. */
  readingTime: number;
};
