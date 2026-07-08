import type {
  GameConfig,
  GameSession,
  GameType,
  NBackData,
  NumberMemoryData,
  QuickMatchRound,
  ShapeStimulus,
  StroopData,
  TaskSwitchData
} from "@/lib/types";
import { clamp } from "@/lib/utils";

export const gameConfigs: GameConfig[] = [
  {
    type: "number_memory",
    name: "Number Memory",
    shortName: "Memory",
    category: "Focus",
    description: "Recall a short sequence after it flashes on screen.",
    durationMinutes: 3,
    accent: "teal"
  },
  {
    type: "quick_match",
    name: "Quick Match",
    shortName: "Match",
    category: "Reaction",
    description: "Choose the option that matches the target color and shape.",
    durationMinutes: 4,
    accent: "amber"
  },
  {
    type: "n_back",
    name: "N-Back",
    shortName: "N-Back",
    category: "Working focus",
    description: "Decide whether the current square matches N steps ago.",
    durationMinutes: 5,
    accent: "sky"
  },
  {
    type: "task_switch",
    name: "Task Switch",
    shortName: "Switch",
    category: "Flexibility",
    description: "Answer by parity or size as the rule changes.",
    durationMinutes: 4,
    accent: "rose"
  },
  {
    type: "stroop",
    name: "Stroop Test",
    shortName: "Stroop",
    category: "Control",
    description: "Pick the ink color and ignore the word meaning.",
    durationMinutes: 4,
    accent: "emerald"
  }
];

export const gameConfigByType = Object.fromEntries(
  gameConfigs.map((game) => [game.type, game])
) as Record<GameType, GameConfig>;

export const gameSlugByType: Record<GameType, string> = {
  number_memory: "number-memory",
  quick_match: "quick-match",
  n_back: "n-back",
  task_switch: "task-switch",
  stroop: "stroop"
};

export const gameTypeBySlug = Object.fromEntries(
  Object.entries(gameSlugByType).map(([type, slug]) => [slug, type])
) as Record<string, GameType>;

export function adjustDifficulty(currentLevel: number, accuracy: number) {
  if (accuracy >= 0.8) return clamp(currentLevel + 1, 1, 10);
  if (accuracy < 0.6) return clamp(currentLevel - 1, 1, 10);
  return clamp(currentLevel, 1, 10);
}

export function getRecommendedGames(sessions: GameSession[]) {
  if (sessions.length === 0) {
    return gameConfigs.filter((game) =>
      ["number_memory", "quick_match", "stroop"].includes(game.type)
    );
  }

  const byType = new Map<GameType, GameSession[]>();
  for (const session of sessions) {
    const list = byType.get(session.gameType) ?? [];
    list.push(session);
    byType.set(session.gameType, list);
  }

  return [...gameConfigs]
    .sort((a, b) => {
      const aLast = byType.get(a.type)?.at(-1);
      const bLast = byType.get(b.type)?.at(-1);
      const aScore = aLast ? aLast.accuracy : 0.5;
      const bScore = bLast ? bLast.accuracy : 0.5;
      return aScore - bScore;
    })
    .slice(0, 3);
}

export function getLatestDifficulty(sessions: GameSession[], gameType: GameType) {
  const latest = [...sessions].reverse().find((session) => session.gameType === gameType);
  if (!latest) return 1;
  return adjustDifficulty(latest.difficultyLevel, latest.accuracy);
}

export function getSequenceLength(level: number) {
  return 3 + clamp(level, 1, 10);
}

export function generateNumberSequence(level: number) {
  return Array.from({ length: getSequenceLength(level) }, () =>
    Math.floor(Math.random() * 10)
  );
}

export function scoreNumberMemory(data: NumberMemoryData) {
  const accuracy = data.correctCount / data.totalLength;
  return {
    accuracy,
    score: Math.round(accuracy * 100)
  };
}

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
const shapes = ["circle", "square", "triangle", "diamond", "pill", "star"];

export function getQuickMatchParams(level: number) {
  return {
    responseTimeLimit: Math.max(3000, 10000 - clamp(level, 1, 10) * 700),
    colorCount: Math.min(2 + Math.floor(level / 3), colors.length),
    shapeCount: Math.min(2 + Math.floor(level / 3), shapes.length)
  };
}

export function generateQuickMatchRound(level: number) {
  const params = getQuickMatchParams(level);
  const usableColors = colors.slice(0, params.colorCount);
  const usableShapes = shapes.slice(0, params.shapeCount);
  const target = randomStimulus(usableColors, usableShapes);
  const options = new Map<string, ShapeStimulus>();
  options.set(`${target.color}-${target.shape}`, target);
  while (options.size < 4) {
    const option = randomStimulus(usableColors, usableShapes);
    options.set(`${option.color}-${option.shape}`, option);
  }
  return {
    target,
    options: shuffle([...options.values()])
  };
}

export function scoreQuickMatch(rounds: QuickMatchRound[]) {
  if (rounds.length === 0) return { accuracy: 0, score: 0 };
  const correctCount = rounds.filter((round) => round.isCorrect).length;
  const avgResponseTime =
    rounds.reduce((sum, round) => sum + round.responseTimeMs, 0) / rounds.length;
  const accuracy = correctCount / rounds.length;
  const accuracyScore = accuracy * 70;
  const speedScore = Math.max(0, (2000 - avgResponseTime) / 2000) * 30;
  return {
    accuracy,
    score: Math.round(accuracyScore + speedScore)
  };
}

export function adjustNLevel(level: number) {
  if (level <= 3) return 1;
  if (level <= 6) return 2;
  return 3;
}

export function generateNBackSequence(level: number, rounds = 30) {
  const n = adjustNLevel(level);
  const positions: NBackData["positions"] = [];
  const letters: string[] = [];
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";

  for (let index = 0; index < rounds; index += 1) {
    const shouldMatch = index >= n && Math.random() < 0.32;
    if (shouldMatch) {
      positions.push({ ...positions[index - n] });
    } else {
      positions.push({
        row: Math.floor(Math.random() * 3),
        col: Math.floor(Math.random() * 3)
      });
    }
    letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }

  return { n, positions, letters };
}

export function scoreNBack(data: NBackData) {
  if (data.userResponses.length === 0) return { accuracy: 0, score: 0 };
  const accuracy =
    data.userResponses.filter((response) => response.isCorrect).length /
    data.userResponses.length;
  return { accuracy, score: Math.round(accuracy * 100) };
}

export function generateTaskSwitchSequence(rounds = 30) {
  const rules: TaskSwitchData["rules"] = [];
  const numbers: number[] = [];
  for (let index = 0; index < rounds; index += 1) {
    rules.push(Math.floor(index / 5) % 2 === 0 ? "parity" : "magnitude");
    numbers.push(Math.floor(Math.random() * 9) + 1);
  }
  return { rules, numbers };
}

export function getTaskSwitchAnswer(rule: "parity" | "magnitude", number: number) {
  if (rule === "parity") return number % 2 === 0 ? "even" : "odd";
  return number >= 5 ? "large" : "small";
}

export function scoreTaskSwitch(data: TaskSwitchData) {
  if (data.userResponses.length === 0) return { accuracy: 0, score: 0 };
  const accuracy =
    data.userResponses.filter((response) => response.isCorrect).length /
    data.userResponses.length;
  return { accuracy, score: Math.round(accuracy * 100) };
}

export const stroopColors = [
  { id: "red", label: "Red", className: "text-red-600", swatch: "bg-red-500" },
  { id: "blue", label: "Blue", className: "text-blue-600", swatch: "bg-blue-500" },
  { id: "green", label: "Green", className: "text-emerald-600", swatch: "bg-emerald-500" },
  { id: "yellow", label: "Yellow", className: "text-yellow-500", swatch: "bg-yellow-400" }
];

export function generateStroopWords(rounds = 30) {
  return Array.from({ length: rounds }, () => {
    const text = stroopColors[Math.floor(Math.random() * stroopColors.length)].label;
    let color = stroopColors[Math.floor(Math.random() * stroopColors.length)].id;
    if (Math.random() < 0.75) {
      while (color.toLowerCase() === text.toLowerCase()) {
        color = stroopColors[Math.floor(Math.random() * stroopColors.length)].id;
      }
    }
    return { text, color };
  });
}

export function scoreStroop(data: StroopData) {
  if (data.userResponses.length === 0) return { accuracy: 0, score: 0 };
  const correctCount = data.userResponses.filter((response) => response.isCorrect).length;
  const accuracy = correctCount / data.userResponses.length;
  const avgResponseTime =
    data.userResponses.reduce((sum, response) => sum + response.responseTimeMs, 0) /
    data.userResponses.length;
  const accuracyScore = accuracy * 70;
  const speedScore = Math.max(0, (3000 - avgResponseTime) / 3000) * 30;
  return { accuracy, score: Math.round(accuracyScore + speedScore) };
}

function randomStimulus(colorList: string[], shapeList: string[]) {
  return {
    color: colorList[Math.floor(Math.random() * colorList.length)],
    shape: shapeList[Math.floor(Math.random() * shapeList.length)]
  };
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}
