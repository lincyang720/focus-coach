"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, Timer } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const rounds = [
  { target: "Blue circle", options: ["Blue circle", "Green square", "Red triangle"] },
  { target: "Green square", options: ["Yellow circle", "Green square", "Blue triangle"] },
  { target: "Red triangle", options: ["Red triangle", "Blue square", "Green circle"] },
  { target: "Yellow circle", options: ["Red square", "Yellow circle", "Blue triangle"] },
  { target: "Blue square", options: ["Green triangle", "Red circle", "Blue square"] }
];

export function FocusCheck() {
  const [currentRound, setCurrentRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);

  const round = rounds[currentRound];
  const isFinished = finishedAt !== null;
  const elapsedSeconds = useMemo(() => {
    if (!startedAt) return 0;
    const end = finishedAt ?? Date.now();
    return Math.max(1, Math.round((end - startedAt) / 1000));
  }, [finishedAt, startedAt]);
  const accuracy = Math.round((correctCount / rounds.length) * 100);

  function chooseOption(option: string) {
    const now = Date.now();
    if (!startedAt) setStartedAt(now);
    if (option === round.target) setCorrectCount((count) => count + 1);
    if (currentRound === rounds.length - 1) {
      setFinishedAt(now);
      return;
    }
    setCurrentRound((index) => index + 1);
  }

  function reset() {
    setCurrentRound(0);
    setCorrectCount(0);
    setStartedAt(null);
    setFinishedAt(null);
  }

  return (
    <Card className="bg-background/92 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">Free · no signup required</p>
            <h2 className="mt-2 text-lg font-semibold leading-none tracking-normal">
              60-Second Attention Test
            </h2>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Timer className="h-5 w-5" aria-hidden />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isFinished ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border bg-card p-4">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <p className="mt-1 text-2xl font-semibold">{accuracy}%</p>
              </div>
              <div className="rounded-md border bg-card p-4">
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="mt-1 text-2xl font-semibold">{elapsedSeconds}s</p>
              </div>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              This quick result is a practice snapshot, not a clinical assessment. FocusCoach can
              track accuracy, response speed, and weekly patterns across multiple focus exercises.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/games">
                  Continue training
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button type="button" variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" aria-hidden />
                Try again
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
              <span>
                Round {currentRound + 1} of {rounds.length}
              </span>
              <span>{correctCount} correct</span>
            </div>
            <div className="rounded-md border bg-card p-5">
              <p className="text-sm text-muted-foreground">Match this target</p>
              <p className="mt-2 text-2xl font-semibold">{round.target}</p>
            </div>
            <div className="grid gap-3">
              {round.options.map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant="outline"
                  className="h-12 justify-between px-4"
                  onClick={() => chooseOption(option)}
                >
                  {option}
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
