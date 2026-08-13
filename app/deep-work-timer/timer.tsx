"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bell, CheckCircle2, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const presets = [25, 45, 60, 90];
const distractionReasons = ["Notifications", "Unclear task", "Boredom", "Anxiety", "Other tab", "Environment"];

type BlockerMode = "idle" | "choose";

export function DeepWorkTimer() {
  const [minutes, setMinutes] = useState(45);
  const [customMinutes, setCustomMinutes] = useState("45");
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [startedOnce, setStartedOnce] = useState(false);
  const [blockerMode, setBlockerMode] = useState<BlockerMode>("idle");
  const [microGoal, setMicroGoal] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [focusRating, setFocusRating] = useState<number | null>(null);
  const [distractionReason, setDistractionReason] = useState("");
  const intervalRef = useRef<number | null>(null);
  const originalTitleRef = useRef<string | null>(null);

  const totalSeconds = minutes * 60;
  const progress = useMemo(() => {
    if (totalSeconds === 0) return 0;
    return Math.max(0, Math.min(100, ((totalSeconds - remainingSeconds) / totalSeconds) * 100));
  }, [remainingSeconds, totalSeconds]);
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;
  const mm = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
  const ss = (remainingSeconds % 60).toString().padStart(2, "0");

  useEffect(() => {
    originalTitleRef.current = document.title;
    return () => {
      if (originalTitleRef.current) document.title = originalTitleRef.current;
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      document.title = `${mm}:${ss} – Deep Work Timer | FocusCoach`;
    } else if (originalTitleRef.current) {
      document.title = originalTitleRef.current;
    }
  }, [isRunning, mm, ss]);

  const notifyComplete = useCallback(() => {
    if (soundEnabled) {
      const browserWindow = window as Window & typeof globalThis & {
        webkitAudioContext?: typeof AudioContext;
      };
      const AudioContextClass = browserWindow.AudioContext || browserWindow.webkitAudioContext;
      if (AudioContextClass) {
        const audio = new AudioContextClass();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.frequency.value = 720;
        gain.gain.setValueAtTime(0.08, audio.currentTime);
        oscillator.start();
        oscillator.stop(audio.currentTime + 0.35);
      }
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Deep work session complete", {
        body: "Rate the session and choose your next move.",
      });
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(intervalRef.current ?? undefined);
          intervalRef.current = null;
          setIsRunning(false);
          setSessionComplete(true);
          notifyComplete();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning, notifyComplete]);

  useEffect(() => {
    if (startedOnce) return;
    setRemainingSeconds(minutes * 60);
  }, [minutes, startedOnce]);

  async function requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }

  function setDuration(nextMinutes: number) {
    const safeMinutes = Math.max(5, Math.min(180, Math.round(nextMinutes)));
    setMinutes(safeMinutes);
    setCustomMinutes(String(safeMinutes));
    setRemainingSeconds(safeMinutes * 60);
    setIsRunning(false);
    setStartedOnce(false);
    setSessionComplete(false);
    setBlockerMode("idle");
  }

  function applyCustomDuration() {
    const parsed = Number(customMinutes);
    if (Number.isFinite(parsed)) setDuration(parsed);
  }

  function openStartBlockers() {
    if (remainingSeconds === 0) reset();
    setBlockerMode("choose");
    setSessionComplete(false);
  }

  async function beginSession(nextMinutes?: number) {
    if (nextMinutes) setDuration(nextMinutes);
    await requestNotificationPermission();
    setStartedOnce(true);
    setIsRunning(true);
    setBlockerMode("idle");
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setStartedOnce(false);
    setSessionComplete(false);
    setFocusRating(null);
    setDistractionReason("");
    setRemainingSeconds(minutes * 60);
    setBlockerMode("idle");
  }

  function saveWrap() {
    const sessions = JSON.parse(window.localStorage.getItem("deepWorkSessions") || "[]") as unknown[];
    window.localStorage.setItem(
      "deepWorkSessions",
      JSON.stringify([
        {
          completedAt: new Date().toISOString(),
          minutes,
          microGoal,
          focusRating,
          distractionReason,
        },
        ...sessions,
      ].slice(0, 20))
    );
    setSessionComplete(false);
    reset();
  }

  const statusText = isRunning
    ? microGoal
      ? `Stay with: ${microGoal}`
      : "Keep going. One task only."
    : sessionComplete
      ? "Block complete. Capture what happened."
      : "Ready when the first action is clear.";

  return (
    <Card
      id="timer"
      className="bg-background/92 backdrop-blur"
      style={{
        background: `linear-gradient(135deg, hsl(230 28% ${16 + progress / 6}%), hsl(260 35% ${10 + progress / 5}%))`,
      }}
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-3 text-white">
          <div>
            <p className="text-sm font-medium opacity-80">No-signup deep work timer</p>
            <h2 className="mt-2 text-lg font-semibold leading-none tracking-normal">
              Start one focused block
            </h2>
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            onClick={() => setSoundEnabled((value) => !value)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="sr-only">Toggle sound</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-white">
        <div className="rounded-xl border border-white/15 bg-white/10 p-5 text-center shadow-xl">
          <div className="relative mx-auto h-60 w-60">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 220 220" aria-hidden>
              <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="14" />
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs uppercase tracking-[0.28em] opacity-70">Remaining</p>
              <p className="mt-2 font-mono text-6xl font-semibold tracking-tight tabular-nums">
                {mm}:{ss}
              </p>
              <p className="mt-2 max-w-44 text-sm opacity-80">{statusText}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {presets.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant={minutes === preset ? "secondary" : "outline"}
              className="h-11 border-white/25 bg-white/10 text-white hover:bg-white/20"
              onClick={() => setDuration(preset)}
              disabled={isRunning}
            >
              {preset} min
            </Button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Input
            min={5}
            max={180}
            type="number"
            value={customMinutes}
            onChange={(event) => setCustomMinutes(event.target.value)}
            className="border-white/25 bg-white/10 text-white placeholder:text-white/60"
            placeholder="Custom minutes, 5-180"
            disabled={isRunning}
          />
          <Button
            type="button"
            variant="outline"
            className="border-white/25 bg-white/10 text-white hover:bg-white/20"
            onClick={applyCustomDuration}
            disabled={isRunning}
          >
            Set custom
          </Button>
        </div>

        {blockerMode === "choose" && (
          <div className="rounded-xl border border-white/20 bg-white/12 p-4">
            <p className="font-semibold">Start Blockers: choose your launch move</p>
            <div className="mt-4 grid gap-3">
              <Button type="button" variant="secondary" onClick={() => beginSession()}>
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                I&apos;m starting now
              </Button>
              <div className="grid gap-2 rounded-lg border border-white/15 p-3">
                <label className="text-sm font-medium" htmlFor="micro-goal">Set a micro-goal first</label>
                <Input
                  id="micro-goal"
                  value={microGoal}
                  onChange={(event) => setMicroGoal(event.target.value)}
                  className="border-white/25 bg-white/10 text-white placeholder:text-white/60"
                  placeholder="Example: draft the first 5 bullets"
                />
                <Button type="button" variant="secondary" onClick={() => beginSession()}>
                  Start with this goal
                </Button>
              </div>
              <Button type="button" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20" onClick={() => beginSession(10)}>
                Reduce scope: 10 minutes instead
              </Button>
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <Button type="button" onClick={openStartBlockers} disabled={isRunning}>
            <Play className="h-4 w-4" aria-hidden />
            Start
          </Button>
          <Button type="button" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20" onClick={pause} disabled={!isRunning}>
            <Pause className="h-4 w-4" aria-hidden />
            Pause
          </Button>
          <Button type="button" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20" onClick={reset}>
            <RotateCcw className="h-4 w-4" aria-hidden />
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/80">
          <Bell className="h-4 w-4" aria-hidden />
          Browser notification is requested only when you start a session.
        </div>

        {sessionComplete && (
          <div className="rounded-xl border border-white/20 bg-white/12 p-4">
            <p className="font-semibold">Session Wrap</p>
            <p className="mt-1 text-sm text-white/80">Rate how focused you felt and capture the main distraction.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  type="button"
                  variant={focusRating === rating ? "secondary" : "outline"}
                  className="border-white/25 bg-white/10 text-white hover:bg-white/20"
                  onClick={() => setFocusRating(rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
            <select
              value={distractionReason}
              onChange={(event) => setDistractionReason(event.target.value)}
              className="mt-3 w-full rounded-md border border-white/25 bg-slate-950/70 px-3 py-2 text-sm text-white"
            >
              <option value="">What distracted you?</option>
              {distractionReasons.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button type="button" variant="secondary" onClick={saveWrap} disabled={!focusRating}>
                Save session locally
              </Button>
              <Button type="button" variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20" asChild>
                <a href="/games">Build your focus muscle → Try a 3-min training game</a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
