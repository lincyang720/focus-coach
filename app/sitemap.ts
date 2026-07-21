import type { MetadataRoute } from "next";
import { gameConfigs, gameSlugByType } from "@/lib/games";
import { articles } from "@/lib/articles";

const appUrl = "https://www.focuscoach.dev";
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/ai-brain-training-cognitive-coaching-app",
    "/games",
    "/free-adhd-focus-test",
    "/blog",
    "/pricing",
    "/login",
    "/register",
    "/privacy",
    "/terms"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: route === "" ? `${appUrl}/` : `${appUrl}${route}`,
      lastModified: now,
      changeFrequency: (route === "" ? "weekly" : "monthly") as ChangeFrequency,
      priority:
        route === ""
          ? 1
          : route === "/ai-brain-training-cognitive-coaching-app"
            ? 0.9
          : route === "/games"
            ? 0.9
            : route === "/pricing"
              ? 0.8
              : route === "/login" || route === "/register"
                ? 0.2
                : 0.5
    })),
    ...articles.map((article) => ({
      url: `${appUrl}/blog/${article.slug}`,
      lastModified: new Date(article.published),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    ...gameConfigs.map((game) => ({
      url: `${appUrl}/exercises/${gameSlugByType[game.type]}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
