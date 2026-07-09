import type { Metadata } from "next";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://focuscoach.app";
const title = "Focus Coach | AI Brain Training & Cognitive Training App";
const description =
  "AI brain training and cognitive coaching app. Train attention, reaction speed, and working memory with 5 short games. Weekly AI reports turn scores into productivity insights.";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: title,
    template: "%s | Focus Coach"
  },
  description,
  applicationName: "Focus Coach",
  keywords: [
    "focus training",
    "brain training",
    "cognitive training",
    "attention games",
    "attention training games",
    "AI focus training",
    "AI cognitive coach",
    "AI brain training",
    "brain training with AI reports",
    "personalized cognitive training",
    "focus training for adults",
    "focus games for work",
    "productivity training",
    "mental fitness app",
    "daily brain training",
    "working memory training",
    "reaction time test",
    "task switching exercise",
    "improve attention span",
    "AI weekly recap",
    "cognitive productivity",
    "Focus Coach",
    "cognitive training app",
    "brain training app",
    "short attention games"
  ],
  authors: [{ name: "Focus Coach" }],
  creator: "Focus Coach",
  publisher: "Focus Coach",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Focus Coach",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Focus Coach dashboard preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"]
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon"
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
