import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const weekStart = searchParams.get("weekStart");

  if (!userId || !weekStart) {
    return NextResponse.json({ report: null });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ report: null });
  }

  const { data, error } = await supabase
    .from("ai_reports")
    .select("*")
    .eq("user_id", userId)
    .eq("week_start_date", weekStart)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) return NextResponse.json({ report: null });

  return NextResponse.json({
    report: {
      id: data.id,
      weekStartDate: data.week_start_date,
      weekEndDate: data.week_end_date,
      totalSessions: data.total_sessions,
      totalDurationSeconds: data.total_duration_seconds,
      averageAccuracy: data.average_accuracy,
      reportContent: data.report_content,
      improvements: data.improvements ?? [],
      suggestions: data.suggestions ?? []
    }
  });
}
