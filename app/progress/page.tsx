"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { gameConfigByType, gameConfigs } from "@/lib/games";
import { getLocalSessions } from "@/lib/storage";
import type { GameSession } from "@/lib/types";
import { formatDuration } from "@/lib/utils";

export default function ProgressPage() {
  const [sessions, setSessions] = useState<GameSession[]>([]);

  useEffect(() => {
    setSessions(getLocalSessions());
  }, []);

  const byGame = useMemo(
    () =>
      gameConfigs.map((game) => {
        const gameSessions = sessions.filter((session) => session.gameType === game.type);
        const average =
          gameSessions.length === 0
            ? 0
            : Math.round(
                gameSessions.reduce((sum, session) => sum + session.score, 0) /
                  gameSessions.length
              );
        return { game, gameSessions, average };
      }),
    [sessions]
  );

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">
            Focus Training Progress Tracker
          </h1>
          <p className="mt-2 text-muted-foreground">Basic stats are available on the free plan.</p>
          <h2 className="mt-6 text-2xl font-semibold tracking-normal">
            Track attention game scores and training time
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Review session history across Number Memory, N-Back, Stroop Test, Quick Match, and Task
            Switch.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {byGame.map(({ game, gameSessions, average }) => (
            <Card key={game.type} className="bg-background/92 backdrop-blur">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">{game.shortName}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-2xl font-semibold">{average}/100</p>
                <Progress value={average} className="mt-3" />
                <p className="mt-2 text-xs text-muted-foreground">
                  {gameSessions.length} sessions
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-background/92 backdrop-blur">
          <CardHeader>
            <CardTitle>Recent focus training sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="rounded-md border p-6 text-center">
                <p className="text-muted-foreground">No sessions yet.</p>
                <Button className="mt-4" asChild>
                  <Link href="/dashboard">Start training</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {[...sessions].reverse().slice(0, 20).map((session) => (
                  <div
                    key={session.id}
                    className="grid gap-3 rounded-md border bg-background/70 p-4 md:grid-cols-[1fr_auto_auto_auto]"
                  >
                    <div>
                      <p className="font-medium">
                        {gameConfigByType[session.gameType].name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.completedAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge>Level {session.difficultyLevel}</Badge>
                    <Badge>{formatDuration(session.durationSeconds)}</Badge>
                    <Badge>{session.score}/100</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
