"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Clock3, Pause, Play, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const presets = [25, 45, 60, 90];

export function DeepWorkTimer() {
  const [minutes, setMinutes] = useState(45);
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [startedOnce, setStartedOnce] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(intervalRef.current ?? undefined);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);

  useEffect(() => {
    if (startedOnce) return;
    setRemainingSeconds(minutes * 60);
  }, [minutes, startedOnce]);

  const totalSeconds = minutes * 60;
  const progress = useMemo(() => {
    if (totalSeconds === 0) return 0;
    return Math.max(0, Math.min(100, ((totalSeconds - remainingSeconds) / totalSeconds) * 100));
  }, [remainingSeconds, totalSeconds]);

  const mm = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (remainingSeconds % 60).toString().padStart(2, "0");

  function setDuration(nextMinutes: number) {
    setMinutes(nextMinutes);
    setRemainingSeconds(nextMinutes * 60);
    setIsRunning(false);
    setStartedOnce(false);
  }

  function start() {
    setStartedOnce(true);
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setStartedOnce(false);
    setRemainingSeconds(minutes * 60);
  }

  return (
    <Card id="timer" className="bg-background/92 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-primary">Deep work block</p>
            <h2 className="mt-2 text-lg font-semibold leading-none tracking-normal">
              Timer and session controls
            </h2>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Clock3 className="h-5 w-5" aria-hidden />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="text-sm text-muted-foreground">Remaining</p>
          <p className="mt-2 font-mono text-6xl font-semibold tracking-tight tabular-nums">
            {mm}:{ss}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {isRunning ? "Keep going. One task only." : remainingSeconds === 0 ? "Block complete." : "Ready to start."}
          </p>
          <div className="mt-5">
            <Progress value={progress} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {presets.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant={minutes === preset ? "default" : "outline"}
              className="h-11"
              onClick={() => setDuration(preset)}
            >
              {preset} min
            </Button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Button type="button" onClick={start} disabled={isRunning || remainingSeconds === 0}>
            <Play className="h-4 w-4" aria-hidden />
            Start
          </Button>
          <Button type="button" variant="outline" onClick={pause} disabled={!isRunning}>
            <Pause className="h-4 w-4" aria-hidden />
            Pause
          </Button>
          <Button type="button" variant="outline" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset
          </Button>
        </div>

        <div className="rounded-lg border bg-background/80 p-4 text-sm leading-6 text-muted-foreground">
          <p className="font-medium text-foreground">Before you press start</p>
          <p className="mt-2">
            Write the first action, close one distracting tab, and decide what “done enough” looks
            like for this block.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
