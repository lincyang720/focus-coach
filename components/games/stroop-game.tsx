"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateStroopWords, scoreStroop, stroopColors } from "@/lib/games";
import { cn } from "@/lib/utils";
import type { StroopData } from "@/lib/types";
import type { GameCompletePayload } from "@/components/games/game-runner";

const totalRounds = 30;

export function StroopGame({
  difficulty,
  onComplete
}: {
  difficulty: number;
  onComplete: (payload: GameCompletePayload) => void;
}) {
  const [words, setWords] = useState(() => generateStroopWords(totalRounds));
  const [roundIndex, setRoundIndex] = useState(0);
  const [responses, setResponses] = useState<StroopData["userResponses"]>([]);
  const [startedAt] = useState(Date.now());
  const [roundStartedAt, setRoundStartedAt] = useState(Date.now());
  const current = words[roundIndex];
  const color = stroopColors.find((item) => item.id === current.color);
  const progress = useMemo(() => (roundIndex / totalRounds) * 100, [roundIndex]);

  function choose(colorId: string) {
    const nextResponses = [
      ...responses,
      {
        selectedColor: colorId,
        isCorrect: colorId === current.color,
        responseTimeMs: Date.now() - roundStartedAt
      }
    ];
    if (nextResponses.length >= totalRounds) {
      const data: StroopData = {
        words,
        userResponses: nextResponses
      };
      const result = scoreStroop(data);
      onComplete({
        ...result,
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        gameData: data
      });
      setWords(generateStroopWords(totalRounds));
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
            Round {roundIndex + 1} of {totalRounds}
          </p>
          <p className="text-sm font-medium">Choose the ink color</p>
        </div>
        <div className="grid min-h-56 place-items-center rounded-lg border bg-muted/40">
          <span className={cn("text-7xl font-semibold", color?.className)}>{current.text}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stroopColors.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              className="justify-start"
              onClick={() => choose(item.id)}
            >
              <span className={cn("h-4 w-4 rounded-full", item.swatch)} />
              {item.label}
            </Button>
          ))}
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
