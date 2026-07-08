"use client";

import { Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { generateNumberSequence, scoreNumberMemory } from "@/lib/games";
import type { NumberMemoryData } from "@/lib/types";
import type { GameCompletePayload } from "@/components/games/game-runner";

type Phase = "ready" | "showing" | "input";

export function NumberMemoryGame({
  difficulty,
  onComplete
}: {
  difficulty: number;
  onComplete: (payload: GameCompletePayload) => void;
}) {
  const [sequence, setSequence] = useState<number[]>(() => generateNumberSequence(difficulty));
  const [phase, setPhase] = useState<Phase>("ready");
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const progress = useMemo(
    () => (phase === "showing" ? ((index + 1) / sequence.length) * 100 : 0),
    [index, phase, sequence.length]
  );

  function reset() {
    setSequence(generateNumberSequence(difficulty));
    setPhase("ready");
    setIndex(0);
    setInput("");
    setStartedAt(null);
  }

  function start() {
    const next = generateNumberSequence(difficulty);
    setSequence(next);
    setPhase("showing");
    setIndex(0);
    setStartedAt(Date.now());
    showAt(0, next);
  }

  function showAt(nextIndex: number, nextSequence: number[]) {
    window.setTimeout(() => {
      if (nextIndex + 1 >= nextSequence.length) {
        setPhase("input");
        setIndex(nextIndex);
      } else {
        setIndex(nextIndex + 1);
        showAt(nextIndex + 1, nextSequence);
      }
    }, 1000);
  }

  function submit() {
    const userInput = input
      .replace(/\D/g, "")
      .split("")
      .map(Number);
    const correctCount = sequence.reduce(
      (count, digit, digitIndex) => count + (userInput[digitIndex] === digit ? 1 : 0),
      0
    );
    const data: NumberMemoryData = {
      sequence,
      userInput,
      correctCount,
      totalLength: sequence.length,
      sequenceSpeed: 1000
    };
    const result = scoreNumberMemory(data);
    onComplete({
      ...result,
      durationSeconds: Math.max(1, Math.round((Date.now() - (startedAt ?? Date.now())) / 1000)),
      gameData: data
    });
    reset();
  }

  return (
    <Card className="bg-background/92 backdrop-blur">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Remember {sequence.length} digits</p>
          <Button variant="ghost" size="icon" onClick={reset} title="Reset">
            <RotateCcw className="h-4 w-4" aria-hidden />
          </Button>
        </div>

        <div className="grid min-h-56 place-items-center rounded-lg border bg-muted/40">
          {phase === "ready" ? (
            <Button onClick={start}>
              <Play className="h-4 w-4" aria-hidden />
              Start
            </Button>
          ) : null}
          {phase === "showing" ? (
            <div
              key={`${index}-${sequence[index]}`}
              className="animate-pulse text-7xl font-semibold"
            >
              {sequence[index]}
            </div>
          ) : null}
          {phase === "input" ? (
            <div className="w-full max-w-sm space-y-4 p-4 text-center">
              <p className="text-sm text-muted-foreground">Enter the digits in order.</p>
              <Input
                inputMode="numeric"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="37295"
                autoFocus
              />
              <Button className="w-full" onClick={submit}>
                Submit
              </Button>
            </div>
          ) : null}
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}
