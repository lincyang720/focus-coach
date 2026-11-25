import type { Metadata } from "next";

export function twitterMetadata(title: string, description: string): Metadata["twitter"] {
  return { card: "summary_large_image", title, description, images: ["/opengraph-image"] };
}

export function shareMetadata(title: string, description: string, url: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    twitter: twitterMetadata(title, description),
    openGraph: {
      type: "website",
      siteName: "Focus Coach",
      title,
      description,
      url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }]
    }
  };
}
