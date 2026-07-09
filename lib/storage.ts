"use client";

import type { GameSession, GameSessionInput, UserProfile, WeeklyReport } from "@/lib/types";
import { getMonday, toDateInputValue } from "@/lib/utils";

const USER_KEY = "focus-coach:user";
const SESSIONS_KEY = "focus-coach:sessions";
const REPORTS_KEY = "focus-coach:reports";
const DEFAULT_AUTH_SESSION_MS = 24 * 60 * 60 * 1000;

export function getDefaultAuthExpiresAt() {
  return new Date(Date.now() + DEFAULT_AUTH_SESSION_MS).toISOString();
}

export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem(USER_KEY);
  if (!saved) return null;

  try {
    const user = JSON.parse(saved) as UserProfile;
    if (!user.authExpiresAt || new Date(user.authExpiresAt).getTime() <= Date.now()) {
      clearCurrentUser();
      return null;
    }
    return user;
  } catch {
    clearCurrentUser();
    return null;
  }
}

export function saveCurrentUser(user: UserProfile) {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      ...user,
      authExpiresAt: user.authExpiresAt ?? getDefaultAuthExpiresAt()
    })
  );
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}

export function isSubscriptionActive(user: Pick<UserProfile, "subscriptionStatus" | "subscriptionExpiresAt">) {
  if (user.subscriptionStatus !== "active") return false;
  if (!user.subscriptionExpiresAt) return false;
  return new Date(user.subscriptionExpiresAt).getTime() > Date.now();
}

export function getAnnualSubscriptionExpiry() {
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  return expiresAt.toISOString();
}

export function getLocalSessions() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(SESSIONS_KEY);
  return raw ? (JSON.parse(raw) as GameSession[]) : [];
}

export function saveLocalSession(input: GameSessionInput) {
  const user = getCurrentUser();
  const session: GameSession = {
    ...input,
    id: crypto.randomUUID(),
    userId: input.userId ?? user?.id ?? "anonymous-user",
    completedAt: new Date().toISOString()
  };
  const sessions = [...getLocalSessions(), session];
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  return session;
}

export function getLocalReports() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(REPORTS_KEY);
  return raw ? (JSON.parse(raw) as WeeklyReport[]) : [];
}

export function saveLocalReport(report: WeeklyReport) {
  const reports = getLocalReports().filter(
    (item) => item.weekStartDate !== report.weekStartDate
  );
  reports.push(report);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

export function createLocalWeeklyReport(sessions: GameSession[]) {
  const monday = getMonday();
  const weekStart = toDateInputValue(monday);
  const weekEndDate = new Date(monday);
  weekEndDate.setDate(monday.getDate() + 6);
  const thisWeek = sessions.filter((session) => session.completedAt.slice(0, 10) >= weekStart);
  const totalSessions = thisWeek.length;
  const totalDurationSeconds = thisWeek.reduce(
    (sum, session) => sum + session.durationSeconds,
    0
  );
  const averageAccuracy =
    totalSessions === 0
      ? 0
      : thisWeek.reduce((sum, session) => sum + session.accuracy, 0) / totalSessions;
  const bestScore = Math.max(0, ...thisWeek.map((session) => session.score));

  const report: WeeklyReport = {
    weekStartDate: weekStart,
    weekEndDate: toDateInputValue(weekEndDate),
    totalSessions,
    totalDurationSeconds,
    averageAccuracy,
    reportContent:
      totalSessions === 0
        ? "Start with one short session this week. Focus Coach will turn your training data into a weekly recap once you have a few results."
        : `You completed ${totalSessions} focused sessions this week with an average accuracy of ${(averageAccuracy * 100).toFixed(1)}%. Your best score was ${bestScore}/100. Keep sessions short and consistent so training stays useful for work, not another source of fatigue.`,
    improvements:
      totalSessions === 0
        ? ["Complete your first training session"]
        : [`You completed ${totalSessions} focused sessions`, `Your best score reached ${bestScore}/100`],
    suggestions:
      totalSessions === 0
        ? ["Try Number Memory as a 3-minute warmup"]
        : ["Repeat your lowest-accuracy game tomorrow", "Keep each session under 15 minutes"]
  };
  saveLocalReport(report);
  return report;
}
