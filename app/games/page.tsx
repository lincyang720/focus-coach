import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Gamepad2 } from "lucide-react";
import { GamesInlineDemo } from "@/components/games/games-inline-demo";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gameConfigs, gameSlugByType } from "@/lib/games";

export const metadata: Metadata = {
  title: { absolute: "Free Focus Games | Play Online in Your Browser | Focus Coach" },
  description:
    "Play free focus games online: Number Memory, N-Back, Stroop, Quick Match, and Task Switch. Browser-based attention games for adults—free to start, no download.",
  alternates: {
    canonical: "/games"
  },
  openGraph: {
    title: "Free Focus Games | Focus Coach",
    description:
      "Five free focus games you can play in your browser. Short attention games for working memory, speed, switching, and inhibition.",
    url: "/games"
  }
};

export default function GamesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Focus Games",
    description:
      "Free online focus games for adults: working memory, reaction speed, task switching, and inhibition practice in the browser.",
    hasPart: gameConfigs.map((game) => ({
      "@type": "Game",
      name: game.name,
      url: `/exercises/${gameSlugByType[game.type]}`,
      genre: "Focus Game"
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
            <Badge>Free focus games · browser-based</Badge>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">Free Focus Games</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              These are free focus games and attention games you can play online in a few minutes.
              Each one trains a narrow skill—recall, visual matching, updating, rule changes, or
              inhibition—so you can pick a reset that matches your next work block.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Part of{" "}
              <Link href="/" className="text-primary underline underline-offset-4">
                Focus Coach (FocusCoach)
              </Link>
              . Comparing{" "}
              <Link
                href="/blog/best-focus-apps-for-adhd-adults"
                className="text-primary underline underline-offset-4"
              >
                ADHD focus tools
              </Link>
              ? Start here if you want playable games instead of another timer app.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#try-a-game">
                  Try a game now
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Back to Focus Coach home</Link>
              </Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-lg border bg-background/90 shadow-sm">
            <Image
              src="/images/focus-coach-games.jpg"
              alt="Free focus games library showing number memory, quick match, n-back, task switch, and Stroop"
              width={1536}
              height={1024}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 52vw, 100vw"
              priority
            />
          </figure>
        </section>

        <GamesInlineDemo />

        <section>
          <h2 className="text-2xl font-semibold tracking-normal">All free focus games</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Open any game below to play a full adaptive round. Every game is free to start in your
            browser with no download.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <CardTitle>{game.name}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href={`/exercises/${gameSlugByType[game.type]}`}>
                      <Gamepad2 className="h-4 w-4" aria-hidden />
                      Play free focus game
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-6 border-t py-12 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              What free focus games practice
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
            <p>
              Free focus games are most useful when you treat them as a short, repeatable practice
              task—not a score that defines you. Each game concentrates on one narrow skill: holding
              a sequence, comparing visual details, updating information, switching rules, or
              ignoring a distracting response.
            </p>
            <p>
              A higher score usually means you are learning that game&apos;s rules and timing. It
              does not diagnose ADHD or replace professional care. The practical value is the
              routine: one defined activity can create a clearer handoff into the next useful task.
            </p>
          </div>
        </section>

        <section className="grid gap-6 py-4 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              Pick a free focus game by skill
            </h2>
          </div>
          <div className="space-y-5 leading-7 text-muted-foreground md:col-span-2">
            <p>
              <strong className="text-foreground">Number Memory</strong> when you need to hold
              details in mind. <strong className="text-foreground">Quick Match</strong> for a fast
              visual-attention reset. <strong className="text-foreground">N-Back</strong> for
              continuous updating, <strong className="text-foreground">Task Switch</strong> after
              interruptions, and the <strong className="text-foreground">Stroop Test</strong> when
              you want to practice ignoring an automatic response.
            </p>
            <p>
              Play one round, write the first physical action of your work task, then begin it. If a
              game feels frustrating, switch exercises or return to the{" "}
              <Link href="/" className="text-primary underline underline-offset-4">
                Focus Coach
              </Link>{" "}
              homepage check instead.
            </p>
          </div>
        </section>

        <section className="rounded-lg border bg-background/90 p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-normal">Free focus games: common questions</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Are these focus games free?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Yes. You can start each browser-based focus game for free without downloading
                software.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Which free focus game should I start with?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Try the 60-second demo above, then Number Memory for recall or Quick Match for
                visual attention.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Can focus games treat ADHD?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                These are productivity-oriented practice, not treatment. Scores describe performance
                within the game only.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">How often should I play?</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                One short session before a focus block is enough. Stop when it no longer helps you
                transition into work.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
