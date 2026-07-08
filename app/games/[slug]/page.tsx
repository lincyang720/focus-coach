import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameRunner } from "@/components/games/game-runner";
import { PageShell } from "@/components/layout/page-shell";
import { gameConfigByType, gameSlugByType, gameTypeBySlug } from "@/lib/games";

const keywordBySlug: Record<string, string> = {
  "number-memory": "Number Memory Test Online",
  "quick-match": "Reaction Speed Training Game",
  "n-back": "Free N-Back Training Online",
  "task-switch": "Task Switching Exercise Online",
  stroop: "Free Stroop Test Online"
};

export function generateStaticParams() {
  return Object.values(gameSlugByType).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const gameType = gameTypeBySlug[params.slug];
  if (!gameType) {
    return {
      title: "Attention Training Game"
    };
  }

  const config = gameConfigByType[gameType];
  const keyword = keywordBySlug[params.slug] ?? `${config.name} Attention Training Game`;

  return {
    title: `${keyword} - Focus Coach`,
    description: `Play ${keyword} in Focus Coach. Practice ${config.category.toLowerCase()} with a short focus training game and adaptive difficulty.`,
    alternates: {
      canonical: `/games/${params.slug}`
    },
    openGraph: {
      title: `${keyword} | Focus Coach`,
      description: `Try this short online focus training game for ${config.category.toLowerCase()} practice.`,
      url: `/games/${params.slug}`
    }
  };
}

export default function GameSeoPage({ params }: { params: { slug: string } }) {
  const gameType = gameTypeBySlug[params.slug];
  if (!gameType) notFound();

  const config = gameConfigByType[gameType];
  const keyword = keywordBySlug[params.slug] ?? `${config.name} Attention Training Game`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: keyword,
    description: `A short online focus training game for ${config.category.toLowerCase()} practice.`,
    genre: "Attention Training Game",
    applicationCategory: "ProductivityApplication",
    url: `/games/${params.slug}`
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GameRunner gameType={gameType} seoTitle={keyword} />
    </PageShell>
  );
}
