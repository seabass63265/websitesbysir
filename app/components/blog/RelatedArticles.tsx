import BlogPostCard from "@/app/components/blog/BlogPostCard";
import type { BlogPost } from "@/lib/blog/types";

export default function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="pad-global border-t" aria-labelledby="related-articles-heading">
      <h2 id="related-articles-heading" className="text-sm" style={{ marginBottom: "1.5rem" }}>
        Related Articles
      </h2>
      <div className="blog-related__grid">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} variant="compact" />
        ))}
      </div>
    </section>
  );
}
