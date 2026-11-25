import type { Metadata } from "next";

export function shareMetadata(title: string, description: string, url: string): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: "Focus Coach",
    title,
    description,
    url,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }]
  };
}
