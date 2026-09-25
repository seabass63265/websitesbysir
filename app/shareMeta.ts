import type { Metadata } from "next";

// Absolute base for the share-preview image/video URLs. Vercel sets the
// production hostname automatically; set NEXT_PUBLIC_SITE_URL once a custom
// domain is connected.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteTitle = "SIR_ Websites | Los Angeles";
export const siteDescription =
  "Custom website design and development for business. No templates. Built directly with Sebastian Rocha in Los Angeles, CA.";

export type SharePreview = {
  /** Still shown by apps that only display an image (path under /public). */
  image: { src: string; width: number; height: number; alt: string };
  /** Video for apps that can play one (path under /public). */
  video: { src: string; width: number; height: number };
};

/**
 * The "link preview" tags (Open Graph + Twitter) for one preview: a video
 * plus a still of it. The homepage uses one of these by default; each
 * `/share/<name>` link (see app/share) carries a different one.
 */
export function sharePreviewMetadata(preview: SharePreview): Metadata {
  const { image, video } = preview;
  return {
    openGraph: {
      type: "website",
      siteName: "SIR_ Websites",
      title: siteTitle,
      description: siteDescription,
      images: [
        { url: image.src, width: image.width, height: image.height, alt: image.alt },
      ],
      videos: [
        {
          // Not resolved against metadataBase automatically, so made absolute.
          url: new URL(video.src, siteUrl).toString(),
          width: video.width,
          height: video.height,
          type: "video/mp4",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [image.src],
    },
  };
}

/** The previews you can choose between — the key is the `/share/<key>` link. */
export const previews = {
  tunnel: {
    image: {
      src: "/og-image.jpg",
      width: 1600,
      height: 900,
      alt: "SIR_ — All businesses. All budgets. Seriously_",
    },
    video: { src: "/textpre0.mp4", width: 1920, height: 1080 },
  },
  homepage: {
    image: {
      src: "/og-image-homepage.jpg",
      width: 1200,
      height: 630,
      alt: "SIR_ — Websites for business. Los Angeles, CA.",
    },
    video: { src: "/textpre.mp4", width: 1920, height: 1080 },
  },
} satisfies Record<string, SharePreview>;

/** Which preview the plain homepage link uses. */
export const defaultPreview: keyof typeof previews = "tunnel";
