"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Timer, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gameConfigs, gameSlugByType, getRecommendedGames } from "@/lib/games";
import { getCurrentUser, getLocalSessions, isSubscriptionActive } from "@/lib/storage";
import type { GameSession } from "@/lib/types";
import { formatDuration } from "@/lib/utils";

export default function DashboardPage() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const user = getCurrentUser();
  const isPro = isSubscriptionActive(user);

  useEffect(() => {
    setSessions(getLocalSessions());
  }, []);

  const recommended = useMemo(() => getRecommendedGames(sessions), [sessions]);
  const today = new Date().toISOString().slice(0, 10);
  const todaySessions = sessions.filter((session) => session.completedAt.startsWith(today));
  const averageScore =
    sessions.length === 0
      ? 0
      : Math.round(sessions.reduce((sum, session) => sum + session.score, 0) / sessions.length);
  const totalDuration = sessions.reduce((sum, session) => sum + session.durationSeconds, 0);

  return (
    <PageShell>
      <div className="space-y-8">
        <section>
          <Badge
            className={
              isPro
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background/80"
            }
          >
            {isPro ? "Pro plan active" : "Free plan"}
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            Daily Focus Training Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Three recommendations keep the session simple. Complete one short game now, then review
            progress when you have a few results.
          </p>
          <h2 className="mt-6 text-2xl font-semibold tracking-normal">
            Recommended attention games for today
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Focus Coach recommends three short games to reduce choice overload and keep training
            practical.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Today" value={`${todaySessions.length}/1`} detail="Free daily sessions used" />
          <StatCard label="Average score" value={`${averageScore}/100`} detail="Across local sessions" />
          <StatCard label="Total time" value={formatDuration(totalDuration)} detail="Training time logged" />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {recommended.map((game) => (
            <Card key={game.type} className="bg-background/92 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge>{game.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" aria-hidden />
                    {game.durationMinutes}m
                  </span>
                </div>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href={`/games/${gameSlugByType[game.type]}`}>
                    Train
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">All attention training games</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/progress">
                <CalendarDays className="h-4 w-4" aria-hidden />
                View history
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {gameConfigs.map((game) => (
              <Link
                key={game.type}
                href={`/games/${gameSlugByType[game.type]}`}
                className="rounded-lg border bg-background/80 p-4 transition hover:bg-background"
              >
                <Trophy className="h-5 w-5 text-primary" aria-hidden />
                <p className="mt-3 font-medium">{game.shortName}</p>
                <p className="mt-1 text-xs text-muted-foreground">{game.category}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
