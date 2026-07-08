import { NextResponse } from "next/server";
import { adjustDifficulty } from "@/lib/games";
import { createSupabaseAdminClient } from "@/lib/supabase";
import type { GameSessionInput, GameType } from "@/lib/types";

export async function POST(req: Request) {
  const input = (await req.json()) as GameSessionInput;
  const newDifficultyLevel = adjustDifficulty(input.difficultyLevel, input.accuracy);

  if (
    !input.gameType ||
    typeof input.difficultyLevel !== "number" ||
    typeof input.score !== "number" ||
    typeof input.accuracy !== "number"
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid session payload" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({
      success: true,
      sessionId: `demo-${crypto.randomUUID()}`,
      newDifficultyLevel
    });
  }

  const { data, error } = await supabase
    .from("game_sessions")
    .insert({
      user_id: input.userId,
      game_type: input.gameType,
      difficulty_level: input.difficultyLevel,
      score: input.score,
      max_score: input.maxScore,
      accuracy: input.accuracy,
      duration_seconds: input.durationSeconds,
      game_data: input.gameData
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    sessionId: data.id,
    newDifficultyLevel
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const gameType = searchParams.get("gameType") as GameType | null;
  const limit = Number(searchParams.get("limit") ?? 20);

  if (!userId) {
    return NextResponse.json({ sessions: [] });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ sessions: [] });
  }

  let query = supabase
    .from("game_sessions")
    .select("id,game_type,difficulty_level,score,accuracy,duration_seconds,completed_at")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(limit);

  if (gameType) query = query.eq("game_type", gameType);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    sessions: (data ?? []).map((session) => ({
      id: session.id,
      gameType: session.game_type,
      difficultyLevel: session.difficulty_level,
      score: session.score,
      accuracy: session.accuracy,
      durationSeconds: session.duration_seconds,
      completedAt: session.completed_at
    }))
  });
}
