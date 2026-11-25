import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { GameRunner } from "@/components/games/game-runner";
import { gameConfigByType, gameSlugByType } from "@/lib/games";
import type { GameType } from "@/lib/types";

export function generateMetadata({
  params
}: {
  params: { gameType: GameType };
}): Metadata {
  const config = gameConfigByType[params.gameType];
  if (!config) {
    return {
      title: "Focus Training Game"
    };
  }

  const title = `${config.name} Focus Training Game`;
  const description = `Play the ${config.name} focus training game in Focus Coach to practice ${config.category.toLowerCase()} with short productivity-oriented sessions.`;
  return {
    title,
    description,
    openGraph: shareMetadata(title + " | Focus Coach", description, `/train/${params.gameType}`),
    alternates: {
      canonical: `/exercises/${gameSlugByType[params.gameType]}`
    },
    robots: {
      index: false,
      follow: true
    }
  };
}

export default function TrainPage({ params }: { params: { gameType: GameType } }) {
  const config = gameConfigByType[params.gameType];
  if (!config) notFound();

  return (
    <PageShell>
      <GameRunner gameType={params.gameType} />
    </PageShell>
  );
}
