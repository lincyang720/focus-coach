import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Gamepad2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gameConfigs, gameSlugByType } from "@/lib/games";

export const metadata: Metadata = {
  title: "Free Focus Games Online for Adults",
  description:
    "Play five free focus games online for adults: Number Memory, N-Back, Stroop Test, Quick Match, and Task Switch. No download required.",
  keywords: [
    "free focus games for adults",
    "online attention games for adults",
    "free brain games online",
    "working memory games for adults",
    "attention training games"
  ],
  alternates: {
    canonical: "/games"
  },
  openGraph: {
    title: "Free Focus Games Online for Adults | Focus Coach",
    description:
      "Play five short online attention games for working memory, reaction speed, task switching, and inhibition. Free to start in your browser.",
    url: "/games"
  }
};

export default function GamesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Focus Games Online for Adults",
    description:
      "A collection of free online attention games for adults covering working memory, reaction speed, task switching, and inhibition.",
    hasPart: gameConfigs.map((game) => ({
      "@type": "Game",
      name: game.name,
      url: `/exercises/${gameSlugByType[game.type]}`,
      genre: "Attention Training Game"
    }))
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge>Free online focus practice</Badge>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">
              Free Focus Games Online for Adults
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Play five short attention games for working memory, reaction speed, task switching,
              and self-control. Each game runs in your browser with no download, is free to start,
              and fits into a quick workday reset.
            </p>
            <h2 className="mt-8 text-2xl font-semibold tracking-normal">
              Choose a free online attention game
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Start with Number Memory, N-Back, Stroop Test, Quick Match, or Task Switch. Each
              dedicated game page explains the rules, the skill being practiced, and realistic
              limits—without presenting a game score as an ADHD diagnosis or treatment result.
            </p>
          </div>
          <figure className="overflow-hidden rounded-lg border bg-background/90 shadow-sm">
            <Image
              src="/images/focus-coach-games.jpg"
              alt="Brain training app interface showing number memory, color matching, n-back, task switching, and Stroop games"
              width={1536}
              height={1024}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 52vw, 100vw"
              priority
            />
          </figure>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gameConfigs.map((game) => (
            <Card key={game.type} className="bg-background/92 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge>{game.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden />
                    {game.durationMinutes}m
                  </span>
                </div>
                <CardTitle>{game.name} Attention Training Game</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href={`/exercises/${gameSlugByType[game.type]}`}>
                    <Gamepad2 className="h-4 w-4" aria-hidden />
                    Play free game
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </PageShell>
  );
}
