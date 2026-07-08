import { NextResponse } from "next/server";
import { createSupabaseAnonClient, createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "Email and password are required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAnonClient();
  const admin = createSupabaseAdminClient();
  if (!supabase || !admin) {
    return NextResponse.json({
      success: true,
      token: "demo-token",
      userId: "demo-user",
      subscriptionStatus: "free"
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user || !data.session) {
    return NextResponse.json(
      { success: false, error: error?.message ?? "Login failed" },
      { status: 401 }
    );
  }

  const { data: profile } = await admin
    .from("users")
    .select("subscription_status")
    .eq("id", data.user.id)
    .single();

  return NextResponse.json({
    success: true,
    token: data.session.access_token,
    userId: data.user.id,
    subscriptionStatus: profile?.subscription_status ?? "free"
  });
}
