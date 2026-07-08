"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateNBackSequence, scoreNBack } from "@/lib/games";
import type { NBackData } from "@/lib/types";
import type { GameCompletePayload } from "@/components/games/game-runner";

const totalRounds = 30;

export function NBackGame({
  difficulty,
  onComplete
}: {
  difficulty: number;
  onComplete: (payload: GameCompletePayload) => void;
}) {
  const [sequence, setSequence] = useState(() => generateNBackSequence(difficulty, totalRounds));
  const [roundIndex, setRoundIndex] = useState(0);
  const [responses, setResponses] = useState<NBackData["userResponses"]>([]);
  const [startedAt] = useState(Date.now());
  const [roundStartedAt, setRoundStartedAt] = useState(Date.now());
  const current = sequence.positions[roundIndex];
  const progress = useMemo(() => (roundIndex / totalRounds) * 100, [roundIndex]);

  function answer(isMatch: boolean) {
    const actualMatch =
      roundIndex >= sequence.n &&
      current.row === sequence.positions[roundIndex - sequence.n].row &&
      current.col === sequence.positions[roundIndex - sequence.n].col;
    const nextResponses = [
      ...responses,
      {
        isMatch,
        actualMatch,
        isCorrect: isMatch === actualMatch,
        responseTimeMs: Date.now() - roundStartedAt
      }
    ];
    if (nextResponses.length >= totalRounds) {
      const data: NBackData = { ...sequence, userResponses: nextResponses };
      const result = scoreNBack(data);
      onComplete({
        ...result,
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        gameData: data
      });
      setSequence(generateNBackSequence(difficulty, totalRounds));
      setRoundIndex(0);
      setResponses([]);
      setRoundStartedAt(Date.now());
      return;
    }
    setResponses(nextResponses);
    setRoundIndex((value) => value + 1);
    setRoundStartedAt(Date.now());
  }

  return (
    <Card className="bg-background/92 backdrop-blur">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {sequence.n}-Back · Round {roundIndex + 1} of {totalRounds}
          </p>
          <p className="text-sm font-medium">Does this match {sequence.n} steps ago?</p>
        </div>
        <div className="mx-auto grid aspect-square w-full max-w-sm grid-cols-3 gap-2 rounded-lg border bg-muted/40 p-3">
          {Array.from({ length: 9 }, (_, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            const active = current.row === row && current.col === col;
            return (
              <div
                key={index}
                className={`grid place-items-center rounded-md border text-2xl font-semibold ${
                  active ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                {active ? sequence.letters[roundIndex] : ""}
              </div>
            );
          })}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="outline" onClick={() => answer(false)}>
            No match
          </Button>
          <Button onClick={() => answer(true)}>Match</Button>
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
