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

  return {
    title: `${config.name} Focus Training Game`,
    description: `Play the ${config.name} focus training game in Focus Coach to practice ${config.category.toLowerCase()} with short productivity-oriented sessions.`,
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
