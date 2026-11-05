import Image from "next/image";
import { TransitionLink } from "@/app/components/providers/PageTransition";
import { formatPostDate } from "@/lib/blog/format";
import type { BlogPost } from "@/lib/blog/types";

/**
 * One article card — used in the blog grid, the featured slot (larger), and
 * the related-articles rail (compact). Server component: everything here is
 * either static per-post text or a `TransitionLink`, no client state needed.
 */
export default function BlogPostCard({
  post,
  variant = "default",
}: {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}) {
  const isFeatured = variant === "featured";

  return (
    <TransitionLink
      href={`/blog/${post.slug}`}
      className={`blog-card${isFeatured ? " blog-card--featured" : ""}${
        variant === "compact" ? " blog-card--compact" : ""
      }`}
    >
      {post.coverImage && (
        <div className="blog-card__media">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || ""}
            fill
            sizes={isFeatured ? "(min-width: 900px) 60vw, 100vw" : "(min-width: 900px) 33vw, 100vw"}
            className="blog-card__image"
          />
        </div>
      )}
      <div className="blog-card__body">
        <div className="blog-card__meta text-xs">
          <span className="pill-tag blog-card__category">{post.category}</span>
          <span className="blog-card__dot" aria-hidden="true">
            •
          </span>
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          <span className="blog-card__dot" aria-hidden="true">
            •
          </span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className={isFeatured ? "text-lg blog-card__title" : "text-md blog-card__title"}>
          {post.title}
        </h3>
        <p className="blog-card__description">{post.description}</p>
        <span className="blog-card__link">
          Read Article
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </TransitionLink>
  );
}
