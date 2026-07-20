import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";

const appUrl = "https://www.focuscoach.dev";
const title = "ADHD Focus App – AI Attention Training | FocusCoach";
const description =
  "FocusCoach is an AI-powered ADHD focus app for adults. Train your attention in 10 minutes a day with adaptive exercises and a free focus test.";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: title,
    template: "%s | Focus Coach"
  },
  description,
  applicationName: "Focus Coach",
  keywords: [
    "adhd focus app",
    "focus app for ADHD adults",
    "ADHD productivity",
    "ADHD focus tools",
    "focus timer for ADHD",
    "focus training for adults",
    "brain training",
    "cognitive training",
    "attention games",
    "attention training games",
    "AI focus training",
    "AI cognitive coach",
    "AI brain training",
    "brain training with AI reports",
    "personalized cognitive training",
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
        alt: "FocusCoach ADHD focus app dashboard"
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
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  },
  other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
    : undefined
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}
