import type { Metadata } from "next";
import "./globals.css";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://focuscoach.app";
const title = "Focus Coach | AI Focus Training & Attention Games";
const description =
  "Train focus with short attention games, adaptive difficulty, and weekly AI productivity recaps. Free daily focus training, $29.99/year for Pro.";

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
    "AI focus training",
    "productivity training",
    "attention games",
    "attention training games",
    "focus improvement app",
    "work focus",
    "AI weekly recap",
    "cognitive productivity"
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
