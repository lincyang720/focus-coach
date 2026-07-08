import OpenAI from "openai";

export const DEFAULT_AI_BASE_URL = "https://api.deepseek.com";
export const DEFAULT_AI_MODEL = "deepseek-v4-flash";
export const DEFAULT_OPENAI_MODEL = "gpt-4.1-mini";

export function createOpenAIClient() {
  const apiKey =
    process.env.AI_API_KEY || process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) return null;

  const baseURL = getAIBaseURL();

  return new OpenAI({
    apiKey,
    ...(baseURL ? { baseURL } : {})
  });
}

export function getAIModel() {
  return (
    process.env.AI_MODEL?.trim() ||
    process.env.DEEPSEEK_MODEL?.trim() ||
    process.env.OPENAI_MODEL?.trim() ||
    getDefaultAIModel()
  );
}

export function getDefaultAIModel() {
  return isOpenAIOnlyConfig() ? DEFAULT_OPENAI_MODEL : DEFAULT_AI_MODEL;
}

function getAIBaseURL() {
  if (process.env.AI_BASE_URL) return process.env.AI_BASE_URL;
  if (process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_BASE_URL) {
    return process.env.DEEPSEEK_BASE_URL || DEFAULT_AI_BASE_URL;
  }
  return process.env.OPENAI_BASE_URL;
}

function isOpenAIOnlyConfig() {
  return Boolean(
    process.env.OPENAI_API_KEY &&
      !process.env.AI_API_KEY &&
      !process.env.DEEPSEEK_API_KEY &&
      !process.env.AI_BASE_URL &&
      !process.env.DEEPSEEK_BASE_URL
  );
}

export const WEEKLY_REPORT_PROMPT = `
You are a friendly, professional focus-training coach. Based on the user's weekly training data, write a concise and encouraging weekly report.

User weekly data:
- Total sessions: {totalSessions}
- Total training time: {totalDurationMinutes} minutes
- Average accuracy: {averageAccuracy}%

Game performance:
{statsByGame}

Best day of week: {bestDayOfWeek}

Return:
1. Weekly summary in 2-3 sentences
2. 2-3 concrete highlights starting with "You..."
3. 2-3 concrete suggestions starting with "Try..."
4. One next-week goal

Rules:
- Use a friendly, practical tone
- Do not make medical claims or say this improves memory, brain health, or prevents decline
- Use concrete numbers
- Stay under 300 words
`;
