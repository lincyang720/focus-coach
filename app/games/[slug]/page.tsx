import { permanentRedirect } from "next/navigation";

const legacySlugMap: Record<string, string> = {
  "number-memory": "number-memory",
  "quick-match": "quick-match",
  "n-back": "n-back",
  "task-switch": "task-switch",
  stroop: "stroop-test",
  "stroop-test": "stroop-test"
};

export default function LegacyGamePage({ params }: { params: { slug: string } }) {
  const slug = legacySlugMap[params.slug];
  permanentRedirect(slug ? `/exercises/${slug}` : "/games");
}
