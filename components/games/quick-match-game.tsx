"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { generateQuickMatchRound, scoreQuickMatch } from "@/lib/games";
import type { QuickMatchRound, ShapeStimulus } from "@/lib/types";
import type { GameCompletePayload } from "@/components/games/game-runner";

const totalRounds = 20;

export function QuickMatchGame({
  difficulty,
  onComplete
}: {
  difficulty: number;
  onComplete: (payload: GameCompletePayload) => void;
}) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [round, setRound] = useState(() => generateQuickMatchRound(difficulty));
  const [startedAt] = useState(Date.now());
  const [roundStartedAt, setRoundStartedAt] = useState(Date.now());
  const [responses, setResponses] = useState<QuickMatchRound[]>([]);

  const progress = useMemo(() => (roundIndex / totalRounds) * 100, [roundIndex]);

  function choose(option: ShapeStimulus, selectedIndex: number) {
    const isCorrect =
      option.color === round.target.color && option.shape === round.target.shape;
    const nextResponses = [
      ...responses,
      {
        ...round,
        selectedIndex,
        isCorrect,
        responseTimeMs: Date.now() - roundStartedAt
      }
    ];
    if (nextResponses.length >= totalRounds) {
      const result = scoreQuickMatch(nextResponses);
      onComplete({
        ...result,
        durationSeconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
        gameData: nextResponses
      });
      setRoundIndex(0);
      setResponses([]);
      setRound(generateQuickMatchRound(difficulty));
      setRoundStartedAt(Date.now());
      return;
    }
    setResponses(nextResponses);
    setRoundIndex((value) => value + 1);
    setRound(generateQuickMatchRound(difficulty));
    setRoundStartedAt(Date.now());
  }

  return (
    <Card className="bg-background/92 backdrop-blur">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Round {roundIndex + 1} of {totalRounds}
          </p>
          <p className="text-sm font-medium">Match both color and shape</p>
        </div>
        <div className="grid place-items-center rounded-lg border bg-muted/40 p-8">
          <Shape stimulus={round.target} size="lg" />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {round.options.map((option, index) => (
            <button
              key={`${option.color}-${option.shape}-${index}`}
              className="focus-ring grid h-28 place-items-center rounded-lg border bg-background transition hover:bg-muted"
              onClick={() => choose(option, index)}
            >
              <Shape stimulus={option} />
            </button>
          ))}
        </div>
        <Progress value={progress} />
      </CardContent>
    </Card>
  );
}

function Shape({ stimulus, size = "md" }: { stimulus: ShapeStimulus; size?: "md" | "lg" }) {
  const dimension = size === "lg" ? "h-24 w-24" : "h-14 w-14";
  const colorClass: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  };
  const shapeClass: Record<string, string> = {
    circle: "rounded-full",
    square: "rounded-md",
    triangle: "clip-triangle",
    diamond: "rotate-45 rounded-md",
    pill: "rounded-full scale-x-125",
    star: "rounded-[35%]"
  };
  return (
    <span
      className={`${dimension} ${colorClass[stimulus.color]} ${shapeClass[stimulus.shape]} block shadow-sm`}
      title={`${stimulus.color} ${stimulus.shape}`}
    />
  );
}
