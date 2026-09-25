import type { Metadata } from "next";
import { Space_Mono, Anton, Knewave } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import SmoothScrollProvider from "@/app/components/providers/SmoothScrollProvider";
import { PageTransitionProvider } from "@/app/components/providers/PageTransition";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const knewave = Knewave({
  variable: "--font-knewave",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Condensed display face for industry-page hero headlines.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Display faces used only by the fullscreen navigation menu.
const display = localFont({
  src: "./fonts/display.woff2",
  variable: "--font-display",
  display: "swap",
});

const displayItalic = localFont({
  src: "./fonts/display-italic.woff2",
  variable: "--font-display-italic",
  display: "swap",
});

// Absolute base for the share-preview image/video URLs. Vercel sets the
// production hostname automatically; set NEXT_PUBLIC_SITE_URL once a custom
// domain is connected.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const siteTitle = "SIR_ Websites | Los Angeles";
const siteDescription =
  "Custom website design and development for business. No templates. Built directly with Sebastian Rocha in Los Angeles, CA.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  // Link preview (texts, chat apps, social): the reel, with a still of it for
  // apps that only show an image.
  openGraph: {
    type: "website",
    siteName: "SIR_ Websites",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIR_ — Something else? Let's build it.",
      },
    ],
    videos: [
      {
        // Not resolved against metadataBase automatically, so made absolute here.
        url: new URL("/sir-reel-loop-16x9-30fps.mp4", siteUrl).toString(),
        width: 2560,
        height: 1440,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${anton.variable} ${knewave.variable} ${display.variable} ${displayItalic.variable}`}
    >
      <body>
        <PageTransitionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </PageTransitionProvider>
        <Analytics />
      </body>
    </html>
  );
}
