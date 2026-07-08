import { NextResponse } from "next/server";
import { gameConfigByType } from "@/lib/games";
import {
  createOpenAIClient,
  getAIModel,
  getDefaultAIModel,
  WEEKLY_REPORT_PROMPT
} from "@/lib/openai";
import { createSupabaseAdminClient } from "@/lib/supabase";
import type { GameType } from "@/lib/types";

export async function POST(req: Request) {
  const { userId, weekStart } = (await req.json()) as {
    userId?: string;
    weekStart?: string;
  };

  if (!userId || !weekStart) {
    return NextResponse.json(
      { success: false, error: "userId and weekStart are required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({
      success: true,
      reportId: `demo-${crypto.randomUUID()}`
    });
  }

  const weekStartDate = new Date(`${weekStart}T00:00:00.000Z`);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setUTCDate(weekStartDate.getUTCDate() + 6);
  const nextWeekDate = new Date(weekStartDate);
  nextWeekDate.setUTCDate(weekStartDate.getUTCDate() + 7);

  const { data: sessions, error } = await supabase
    .from("game_sessions")
    .select("*")
    .eq("user_id", userId)
    .gte("completed_at", weekStartDate.toISOString())
    .lt("completed_at", nextWeekDate.toISOString());

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  if (!sessions || sessions.length === 0) {
    return NextResponse.json(
      { success: false, error: "Not enough data for a weekly report" },
      { status: 400 }
    );
  }

  const totalSessions = sessions.length;
  const totalDurationSeconds = sessions.reduce(
    (sum, session) => sum + session.duration_seconds,
    0
  );
  const averageAccuracy =
    sessions.reduce((sum, session) => sum + session.accuracy, 0) / totalSessions;
  const statsByGame = formatGameStats(sessions);
  const bestDayOfWeek = getBestDayOfWeek(sessions);
  const totalDurationLabel = formatReportDuration(totalDurationSeconds);
  const prompt = WEEKLY_REPORT_PROMPT.replace("{totalSessions}", String(totalSessions))
    .replace("{totalDuration}", totalDurationLabel)
    .replace("{averageAccuracy}", (averageAccuracy * 100).toFixed(1))
    .replace("{statsByGame}", statsByGame)
    .replace("{bestDayOfWeek}", bestDayOfWeek);

  const openai = createOpenAIClient();
  let reportContent: string;
  if (openai) {
    try {
      const result = await generateOpenAIReport(openai, prompt);
      reportContent = result.content;
    } catch (error) {
      console.error("AI report generation failed, using fallback report.", error);
      reportContent = fallbackReport(
        totalSessions,
        totalDurationSeconds,
        averageAccuracy,
        bestDayOfWeek
      );
    }
  } else {
    reportContent = fallbackReport(
      totalSessions,
      totalDurationSeconds,
      averageAccuracy,
      bestDayOfWeek
    );
  }

  const improvements = extractLines(reportContent, ["You"]);
  const suggestions = extractLines(reportContent, ["Try", "Suggestion", "建议"]);

  const { data: report, error: insertError } = await supabase
    .from("ai_reports")
    .upsert(
      {
        user_id: userId,
        week_start_date: weekStart,
        week_end_date: weekEndDate.toISOString().slice(0, 10),
        total_sessions: totalSessions,
        total_duration_seconds: totalDurationSeconds,
        average_accuracy: averageAccuracy,
        report_content: reportContent,
        improvements,
        suggestions
      },
      { onConflict: "user_id,week_start_date" }
    )
    .select("id")
    .single();

  if (insertError) {
    return NextResponse.json(
      { success: false, error: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, reportId: report.id });
}

async function generateOpenAIReport(
  openai: NonNullable<ReturnType<typeof createOpenAIClient>>,
  prompt: string
) {
  const configuredModel = getAIModel();
  const defaultModel = getDefaultAIModel();

  try {
    return {
      content: await requestOpenAIReport(openai, prompt, configuredModel),
      model: configuredModel
    };
  } catch (error) {
    if (configuredModel !== defaultModel && isInvalidModelError(error)) {
      try {
        return {
          content: await requestOpenAIReport(openai, prompt, defaultModel),
          model: defaultModel
        };
      } catch (fallbackError) {
        throw new Error(
          `Configured model "${configuredModel}" failed, and fallback model "${defaultModel}" also failed: ${getErrorMessage(
            fallbackError
          )}`
        );
      }
    }

    throw new Error(`${getErrorMessage(error)} (model: ${configuredModel})`);
  }
}

async function requestOpenAIReport(
  openai: NonNullable<ReturnType<typeof createOpenAIClient>>,
  prompt: string,
  model: string
) {
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: "You are a friendly focus coach for productivity training."
      },
      { role: "user", content: prompt }
    ],
    max_tokens: 500,
    temperature: 0.7
  });
  return (
    response.choices[0]?.message.content ??
    "You completed focused training this week. Try one short session tomorrow and keep the pace sustainable."
  );
}

function isInvalidModelError(error: unknown) {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes("invalid model") || message.includes("model_not_found");
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Unknown OpenAI error";
}

function formatGameStats(sessions: Array<Record<string, any>>) {
  const grouped = new Map<GameType, Array<Record<string, any>>>();
  for (const session of sessions) {
    const type = session.game_type as GameType;
    grouped.set(type, [...(grouped.get(type) ?? []), session]);
  }
  return [...grouped.entries()]
    .map(([type, list]) => {
      const avgScore = list.reduce((sum, item) => sum + item.score, 0) / list.length;
      const avgAccuracy =
        list.reduce((sum, item) => sum + item.accuracy, 0) / list.length;
      return `${gameConfigByType[type]?.name ?? type}: ${list.length} sessions, average score ${avgScore.toFixed(1)}, accuracy ${(avgAccuracy * 100).toFixed(1)}%`;
    })
    .join("\n");
}

function getBestDayOfWeek(sessions: Array<Record<string, any>>) {
  const days = new Map<string, { score: number; count: number }>();
  for (const session of sessions) {
    const label = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(session.completed_at)
    );
    const current = days.get(label) ?? { score: 0, count: 0 };
    days.set(label, { score: current.score + session.score, count: current.count + 1 });
  }
  return [...days.entries()].sort(
    (a, b) => b[1].score / b[1].count - a[1].score / a[1].count
  )[0]?.[0] ?? "Monday";
}

function fallbackReport(
  totalSessions: number,
  totalDurationSeconds: number,
  averageAccuracy: number,
  bestDayOfWeek: string
) {
  return `You completed ${totalSessions} focused sessions this week for ${formatReportDuration(
    totalDurationSeconds
  )} total. Your average accuracy was ${(averageAccuracy * 100).toFixed(
    1
  )}%, with your strongest results on ${bestDayOfWeek}.

You kept sessions short and measurable.
You built enough data to spot which games need attention.

Try repeating your lowest-accuracy game first tomorrow.
Try keeping each training block under 15 minutes.

Next week goal: complete one focused session on at least five days.`;
}

function formatReportDuration(totalDurationSeconds: number) {
  if (totalDurationSeconds <= 0) return "less than 1 minute";
  if (totalDurationSeconds < 60) return "under 1 minute";
  const minutes = Math.round(totalDurationSeconds / 60);
  return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
}

function extractLines(content: string, prefixes: string[]) {
  return content
    .split(/\n+/)
    .map((line) => line.replace(/^[-*\d.\s]+/, "").trim())
    .filter((line) => prefixes.some((prefix) => line.startsWith(prefix)))
    .slice(0, 3);
}
