"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NBackGame } from "@/components/games/n-back-game";
import { NumberMemoryGame } from "@/components/games/number-memory-game";
import { QuickMatchGame } from "@/components/games/quick-match-game";
import { StroopGame } from "@/components/games/stroop-game";
import { TaskSwitchGame } from "@/components/games/task-switch-game";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adjustDifficulty, gameConfigByType, getLatestDifficulty } from "@/lib/games";
import { getCurrentUser, getLocalSessions, saveLocalSession } from "@/lib/storage";
import type { GameSessionInput, GameType } from "@/lib/types";

export interface GameCompletePayload {
  score: number;
  accuracy: number;
  durationSeconds: number;
  gameData: unknown;
}

export function GameRunner({
  gameType,
  seoTitle
}: {
  gameType: GameType;
  seoTitle?: string;
}) {
  const config = gameConfigByType[gameType];
  const [difficulty, setDifficulty] = useState(1);
  const [lastResult, setLastResult] = useState<GameCompletePayload | null>(null);

  useEffect(() => {
    setDifficulty(getLatestDifficulty(getLocalSessions(), gameType));
  }, [gameType]);

  async function handleComplete(payload: GameCompletePayload) {
    const user = getCurrentUser();
    const input: GameSessionInput = {
      userId: user.id,
      gameType,
      difficultyLevel: difficulty,
      score: payload.score,
      maxScore: 100,
      accuracy: payload.accuracy,
      durationSeconds: payload.durationSeconds,
      gameData: payload.gameData
    };
    saveLocalSession(input);
    setLastResult(payload);
    setDifficulty(adjustDifficulty(difficulty, payload.accuracy));

    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    }).catch(() => undefined);
  }

  return (
    <div className="space-y-5">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Dashboard
        </Link>
      </Button>

      <div>
        <p className="text-sm font-medium text-primary">Level {difficulty}</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-normal">
          {seoTitle ?? `${config.name} Focus Training Game`}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{config.description}</p>
        <h2 className="mt-6 text-2xl font-semibold tracking-normal">
          Adaptive {config.category.toLowerCase()} practice for short work breaks
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Complete one quick round, review your score, and let Focus Coach adjust the next level
          based on accuracy.
        </p>
      </div>

      {lastResult ? (
        <Card className="bg-background/92 backdrop-blur">
          <CardHeader>
            <CardTitle>Session complete</CardTitle>
            <CardDescription>Difficulty will adapt for your next attempt.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <ResultMetric label="Score" value={`${lastResult.score}/100`} />
            <ResultMetric label="Accuracy" value={`${(lastResult.accuracy * 100).toFixed(1)}%`} />
            <ResultMetric label="Next level" value={`${difficulty}`} />
          </CardContent>
        </Card>
      ) : null}

      {gameType === "number_memory" ? (
        <NumberMemoryGame difficulty={difficulty} onComplete={handleComplete} />
      ) : null}
      {gameType === "quick_match" ? (
        <QuickMatchGame difficulty={difficulty} onComplete={handleComplete} />
      ) : null}
      {gameType === "n_back" ? <NBackGame difficulty={difficulty} onComplete={handleComplete} /> : null}
      {gameType === "task_switch" ? (
        <TaskSwitchGame difficulty={difficulty} onComplete={handleComplete} />
      ) : null}
      {gameType === "stroop" ? <StroopGame difficulty={difficulty} onComplete={handleComplete} /> : null}
    </div>
  );
}

function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background/70 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
