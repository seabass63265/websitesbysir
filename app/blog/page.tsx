import type { Metadata } from "next";
import BlogHeader from "@/app/components/blog/BlogHeader";
import BlogPostCard from "@/app/components/blog/BlogPostCard";
import { getAllPosts } from "@/lib/blog/posts";
import { siteUrl } from "@/app/shareMeta";

export const metadata: Metadata = {
  title: "SIR_ Websites | Blog",
  description:
    "Practical guidance on websites, design, and getting found online — for restaurants, local businesses, startups, nonprofits, and more. From SIR_ Websites in Los Angeles.",
  alternates: {
    canonical: `${siteUrl}/blog`,
    types: { "application/rss+xml": `${siteUrl}/blog/feed.xml` },
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <BlogHeader />
      <main className="grid-container">
        <div className="pad-global border-b">
          <div className="text-sm" style={{ marginBottom: "0.5rem" }}>
            Blog
          </div>
          <h1 className="text-lg" style={{ marginBottom: "1rem" }}>
            Notes on Websites, Design, and Getting Found
          </h1>
          <p className="text-md">
            Practical guidance for business owners thinking about their
            website — written in plain language, with no jargon and no
            hidden agenda.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="pad-global blog-empty">
            <p className="text-md">
              Nothing&rsquo;s published here yet — check back soon.
            </p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="pad-global border-b">
                <div className="text-sm" style={{ marginBottom: "1rem" }}>
                  Latest
                </div>
                <BlogPostCard post={featured} variant="featured" />
              </div>
            )}

            {rest.length > 0 && (
              <div className="pad-global blog-grid">
                {rest.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
