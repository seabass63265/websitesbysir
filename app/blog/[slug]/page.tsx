import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TransitionLink } from "@/app/components/providers/PageTransition";
import BlogHeader from "@/app/components/blog/BlogHeader";
import TableOfContents from "@/app/components/blog/TableOfContents";
import RelatedArticles from "@/app/components/blog/RelatedArticles";
import ArticleCTA from "@/app/components/blog/ArticleCTA";
import { getPostBySlug, getPublishedSlugs, getRelatedPosts } from "@/lib/blog/posts";
import { formatPostDate } from "@/lib/blog/format";
import { siteTitle, siteUrl } from "@/app/shareMeta";

type Params = { slug: string };

/** Only published posts are statically built — a draft's slug is left out,
 * so it only ever renders via on-demand dynamic rendering (a direct link),
 * never pre-built into the production bundle. */
export function generateStaticParams(): Params[] {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`;
  const images = post.coverImage ? [new URL(post.coverImage, siteUrl).toString()] : undefined;

  return {
    title: `${post.title} | ${siteTitle}`,
    description: post.description,
    alternates: { canonical: url },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: "SIR_ Websites",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const url = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`;
  const hasToc = post.toc.length >= 3;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "SIR_ Websites",
      url: siteUrl,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(post.coverImage
      ? { image: [new URL(post.coverImage, siteUrl).toString()] }
      : {}),
    keywords: post.keywords?.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <BlogHeader crumb={post.title} />
      <main className="grid-container">
        {post.draft && (
          <div className="blog-draft-banner">
            Draft — not published, hidden from search, not linked anywhere
          </div>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <article className="pad-global border-b">
          <nav className="blog-breadcrumb text-xs" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <TransitionLink href="/">Home</TransitionLink>
            <span aria-hidden="true">/</span>
            <TransitionLink href="/blog">Blog</TransitionLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{post.title}</span>
          </nav>

          <div className="blog-article__header">
            <span className="pill-tag" style={{ alignSelf: "flex-start" }}>
              {post.category}
            </span>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__description">{post.description}</p>
            <div className="blog-article__meta text-xs">
              <span>By {post.author}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              {post.updatedAt && (
                <>
                  <span aria-hidden="true">•</span>
                  <span>Updated {formatPostDate(post.updatedAt)}</span>
                </>
              )}
              <span aria-hidden="true">•</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </article>

        {post.coverImage && (
          <div className="blog-article__cover">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || ""}
              fill
              sizes="100vw"
              priority
            />
          </div>
        )}

        <div className="pad-global border-b">
          <div className={`blog-article__layout${hasToc ? " blog-article__layout--with-toc" : ""}`}>
            <div
              className="blog-article__body blog-article__main"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            {hasToc && <TableOfContents toc={post.toc} />}
          </div>
        </div>

        <RelatedArticles posts={related} />
        <ArticleCTA />
      </main>
    </>
  );
}
