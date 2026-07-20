import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FocusCoach – ADHD-Friendly Attention Training",
    short_name: "FocusCoach",
    description: "Short adaptive attention exercises and weekly productivity insights for adults.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8f9",
    theme_color: "#17806f",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
