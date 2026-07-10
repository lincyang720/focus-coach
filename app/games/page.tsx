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
  title: "Free Brain Training & Cognitive Training Games Online",
  description:
    "Play five free brain training and cognitive training games online: Number Memory, N-Back, Stroop Test, Quick Match, and Task Switch for short focus practice.",
  alternates: {
    canonical: "/games"
  },
  openGraph: {
    title: "Free Brain Training & Cognitive Training Games Online | Focus Coach",
    description:
      "Try short brain training games online with adaptive difficulty and productivity-oriented progress tracking.",
    url: "/games"
  }
};

export default function GamesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Brain Training & Cognitive Training Games Online",
    description:
      "A collection of short brain training and cognitive training games for focus, reaction speed, task switching, and productivity practice.",
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
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-3xl">
            <Badge>Free online focus practice</Badge>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">
              Free Brain Training & Cognitive Training Games Online
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Practice focus, reaction speed, working memory, task switching, and self-control with
              five short productivity-oriented brain training games. Each cognitive training
              session is quick, measurable, and easy to repeat during a workday.
            </p>
            <h2 className="mt-8 text-2xl font-semibold tracking-normal">
              Choose a free cognitive training game
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Start with Number Memory, N-Back, Stroop Test, Quick Match, or Task Switch. Each game
              supports a different mental skill, from working memory training to reaction time tests
              and task switching exercises.
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
