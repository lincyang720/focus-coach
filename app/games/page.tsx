import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Gamepad2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gameConfigs, gameSlugByType } from "@/lib/games";

export const metadata: Metadata = {
  title: "Free Attention Training Games Online",
  description:
    "Play five free attention training games online: Number Memory, N-Back, Stroop Test, Quick Match, and Task Switch for short focus practice.",
  alternates: {
    canonical: "/games"
  },
  openGraph: {
    title: "Free Attention Training Games Online | Focus Coach",
    description:
      "Try short focus training games online with adaptive difficulty and productivity-oriented progress tracking.",
    url: "/games"
  }
};

export default function GamesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Attention Training Games Online",
    description:
      "A collection of short attention training games for focus, reaction speed, task switching, and productivity practice.",
    hasPart: gameConfigs.map((game) => ({
      "@type": "Game",
      name: game.name,
      url: `/games/${gameSlugByType[game.type]}`,
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
        <section className="max-w-3xl">
          <Badge>Free online focus practice</Badge>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            Free Attention Training Games Online
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Practice focus, reaction speed, task switching, and self-control with five short
            productivity-oriented games. Each session is designed to be quick, measurable, and easy
            to repeat during a workday.
          </p>
          <h2 className="mt-8 text-2xl font-semibold tracking-normal">
            Choose a free focus training game
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Start with Number Memory, N-Back, Stroop Test, Quick Match, or Task Switch. Each game
            has a dedicated page for online practice and SEO-friendly discovery.
          </p>
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
                  <Link href={`/games/${gameSlugByType[game.type]}`}>
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
