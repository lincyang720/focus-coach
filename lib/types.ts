export type GameType =
  | "number_memory"
  | "quick_match"
  | "n_back"
  | "task_switch"
  | "stroop";

export type SubscriptionStatus = "free" | "active" | "canceled";

export interface GameConfig {
  type: GameType;
  name: string;
  shortName: string;
  category: string;
  description: string;
  durationMinutes: number;
  accent: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiresAt?: string | null;
}

export interface GameSessionInput {
  userId?: string;
  gameType: GameType;
  difficultyLevel: number;
  score: number;
  maxScore: number;
  accuracy: number;
  durationSeconds: number;
  gameData: unknown;
}

export interface GameSession extends GameSessionInput {
  id: string;
  userId: string;
  completedAt: string;
}

export interface WeeklyReport {
  id?: string;
  weekStartDate: string;
  weekEndDate: string;
  totalSessions: number;
  totalDurationSeconds: number;
  averageAccuracy: number;
  reportContent: string;
  improvements: string[];
  suggestions: string[];
}

export interface NumberMemoryData {
  sequence: number[];
  userInput: number[];
  correctCount: number;
  totalLength: number;
  sequenceSpeed: number;
}

export interface QuickMatchRound {
  target: ShapeStimulus;
  options: ShapeStimulus[];
  selectedIndex: number;
  isCorrect: boolean;
  responseTimeMs: number;
}

export interface ShapeStimulus {
  color: string;
  shape: string;
}

export interface NBackData {
  n: number;
  positions: Array<{ row: number; col: number }>;
  letters: string[];
  userResponses: Array<{
    isMatch: boolean;
    actualMatch: boolean;
    isCorrect: boolean;
    responseTimeMs: number;
  }>;
}

export interface TaskSwitchData {
  rules: Array<"parity" | "magnitude">;
  numbers: number[];
  userResponses: Array<{
    answer: string;
    correctAnswer: string;
    isCorrect: boolean;
    responseTimeMs: number;
    isSwitchTrial: boolean;
  }>;
}

export interface StroopData {
  words: Array<{
    text: string;
    color: string;
  }>;
  userResponses: Array<{
    selectedColor: string;
    isCorrect: boolean;
    responseTimeMs: number;
  }>;
}
