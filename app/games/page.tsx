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
  title: "Free Focus & Brain Training Games Online for Adults",
  description:
    "Play five free focus and brain training games online for adults: Number Memory, N-Back, Stroop Test, Quick Match, and Task Switch. No download required.",
  keywords: [
    "free focus games for adults",
    "brain training games online",
    "free brain training games",
    "online attention games for adults",
    "free brain games online",
    "working memory games for adults",
    "attention training games"
  ],
  alternates: {
    canonical: "/games"
  },
  openGraph: {
    title: "Free Focus & Brain Training Games Online | Focus Coach",
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
              Free Focus &amp; Brain Training Games Online for Adults
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

        <section className="grid gap-6 border-t py-12 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              What these brain training games practice
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
            <p>
              Online brain training is most useful when you treat a game as a short, repeatable
              practice task rather than a measure of intelligence or a promise of broader change.
              Each FocusCoach game concentrates on one narrow skill: holding a sequence in mind,
              comparing visual details, updating information, switching rules, or ignoring a
              distracting response. That makes it easier to choose a game that matches the kind of
              attention reset you want before work.
            </p>
            <p>
              A higher score usually means that you are becoming more familiar with that game’s
              rules and timing. It does not diagnose ADHD, predict job performance, or replace
              professional care. The practical value is the routine: one short, defined activity
              can create a clearer handoff from scrolling, email, or a meeting into the next
              useful task.
            </p>
          </div>
        </section>

        <section className="grid gap-6 py-4 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              Choose a game by the attention skill you want to warm up
            </h2>
          </div>
          <div className="space-y-5 leading-7 text-muted-foreground md:col-span-2">
            <p>
              <strong className="text-foreground">Number Memory</strong> is a useful choice when
              you need to hold names, numbers, or instructions in mind. <strong className="text-foreground">Quick Match</strong>
              works as a fast visual-attention reset before a task that requires careful scanning.
              <strong className="text-foreground">N-Back</strong> is for continuous updating,
              while <strong className="text-foreground">Task Switch</strong> gives you a brief
              rule-change challenge after interruptions. Choose the <strong className="text-foreground">Stroop Test</strong>
              when you want to slow down and practice ignoring a distracting automatic response.
            </p>
            <p>
              Keep the routine deliberately small. Play one round, write the first physical action
              of your work task, then begin it. If a game feels frustrating or overstimulating,
              switch to a shorter round, choose a different exercise, or use a quiet timer instead.
              Consistency and an easy restart matter more than a perfect streak.
            </p>
          </div>
        </section>

        <section className="rounded-lg border bg-background/90 p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-normal">
            Free online brain training games: common questions
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Are these focus games free?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Yes. You can start each browser-based game for free without downloading software.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Which brain training game should I start with?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Start with Number Memory for recall, Quick Match for visual attention, or Stroop
                for inhibition. Pick the one that feels easiest to repeat before work.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Can brain games improve ADHD symptoms?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                These games are productivity-oriented practice, not treatment or diagnosis. Their
                scores describe performance within the game and should not be used as clinical
                evidence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">How often should I play?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A short, repeatable session before a focus block is enough. Stop when it no longer
                helps you transition into the work you intended to do.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
