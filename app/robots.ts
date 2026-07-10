import type { MetadataRoute } from "next";

const appUrl = "https://www.focuscoach.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"]
      }
    ],
    sitemap: `${appUrl}/sitemap.xml`,
    host: appUrl
  };
}
