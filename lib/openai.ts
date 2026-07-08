import OpenAI from "openai";

export function createOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
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
