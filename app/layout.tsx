import type { Metadata } from "next";
import { Space_Mono, Anton, Knewave } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScrollProvider from "@/app/components/providers/SmoothScrollProvider";
import { PageTransitionProvider } from "@/app/components/providers/PageTransition";
import { LanguageProvider } from "@/app/components/providers/LanguageProvider";
import { ThemeProvider } from "@/app/components/providers/ThemeProvider";
import "./globals.css";
import {
  defaultPreview,
  previews,
  sharePreviewMetadata,
  siteDescription,
  siteTitle,
  siteUrl,
} from "@/app/shareMeta";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  // Link preview (texts, chat apps, social) — see app/shareMeta.ts, and
  // app/share for the alternate `/share/<name>` links.
  ...sharePreviewMetadata(previews[defaultPreview]),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${anton.variable} ${knewave.variable} ${display.variable} ${displayItalic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{if(localStorage.getItem("sir_theme")==="dark"){document.documentElement.dataset.theme="dark";}}catch(e){}})();',
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <PageTransitionProvider>
              <SmoothScrollProvider>{children}</SmoothScrollProvider>
            </PageTransitionProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
