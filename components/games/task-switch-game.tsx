"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateTaskSwitchSequence, getTaskSwitchAnswer, scoreTaskSwitch } from "@/lib/games";
import type { TaskSwitchData } from "@/lib/types";
import type { GameCompletePayload } from "@/components/games/game-runner";

const totalRounds = 30;

export function TaskSwitchGame({
  difficulty,
  onComplete
}: {
  difficulty: number;
  onComplete: (payload: GameCompletePayload) => void;
}) {
  const [sequence, setSequence] = useState(() => generateTaskSwitchSequence(totalRounds));
  const [roundIndex, setRoundIndex] = useState(0);
  const [responses, setResponses] = useState<TaskSwitchData["userResponses"]>([]);
  const [startedAt] = useState(Date.now());
  const [roundStartedAt, setRoundStartedAt] = useState(Date.now());
  const rule = sequence.rules[roundIndex];
  const number = sequence.numbers[roundIndex];
  const progress = useMemo(() => (roundIndex / totalRounds) * 100, [roundIndex]);

  function answer(value: string) {
    const correctAnswer = getTaskSwitchAnswer(rule, number);
    const isSwitchTrial = roundIndex > 0 && sequence.rules[roundIndex - 1] !== rule;
    const nextResponses = [
      ...responses,
      {
        answer: value,
        correctAnswer,
        isCorrect: value === correctAnswer,
        responseTimeMs: Date.now() - roundStartedAt,
        isSwitchTrial
      }
    ];
    if (nextResponses.length >= totalRounds) {
      const data: TaskSwitchData = {
        ...sequence,
        userResponses: nextResponses
      };
      const result = scoreTaskSwitch(data);
      onComplete({
        ...result,
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        gameData: data
      });
      setSequence(generateTaskSwitchSequence(totalRounds));
      setRoundIndex(0);
      setResponses([]);
      setRoundStartedAt(Date.now());
      return;
    }
    setResponses(nextResponses);
    setRoundIndex((valueIndex) => valueIndex + 1);
    setRoundStartedAt(Date.now());
  }

  return (
    <Card className="bg-background/92 backdrop-blur">
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Round {roundIndex + 1} of {totalRounds}
          </p>
          <p className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
            {rule === "parity" ? "Rule: odd or even" : "Rule: small or large"}
          </p>
        </div>
        <div className="grid min-h-56 place-items-center rounded-lg border bg-muted/40">
          <span className="text-8xl font-semibold">{number}</span>
        </div>
        {rule === "parity" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" onClick={() => answer("odd")}>
              Odd
            </Button>
            <Button onClick={() => answer("even")}>Even</Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" onClick={() => answer("small")}>
              Small 1-4
            </Button>
            <Button onClick={() => answer("large")}>Large 5-9</Button>
          </div>
        )}
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
