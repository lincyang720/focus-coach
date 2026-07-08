import type { MetadataRoute } from "next";
import { gameConfigs, gameSlugByType } from "@/lib/games";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://focuscoach.app";
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/games",
    "/pricing",
    "/login",
    "/register",
    "/privacy",
    "/terms"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${appUrl}${route}`,
      lastModified: now,
      changeFrequency: (route === "" ? "weekly" : "monthly") as ChangeFrequency,
      priority:
        route === ""
          ? 1
          : route === "/games"
            ? 0.9
            : route === "/pricing"
              ? 0.8
              : route === "/login" || route === "/register"
                ? 0.2
                : 0.5
    })),
    ...gameConfigs.map((game) => ({
      url: `${appUrl}/games/${gameSlugByType[game.type]}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
