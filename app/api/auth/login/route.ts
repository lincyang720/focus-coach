import { NextResponse } from "next/server";
import { createSupabaseAnonClient, createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
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
        subscriptionStatus: "free",
        authExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
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
      .select("subscription_status, subscription_expires_at")
      .eq("id", data.user.id)
      .single();
    const subscriptionExpiresAt = profile?.subscription_expires_at ?? null;
    const isExpired =
      profile?.subscription_status === "active" &&
      (!subscriptionExpiresAt || new Date(subscriptionExpiresAt).getTime() <= Date.now());

    return NextResponse.json({
      success: true,
      token: data.session.access_token,
      userId: data.user.id,
      subscriptionStatus: isExpired ? "free" : profile?.subscription_status ?? "free",
      subscriptionExpiresAt,
      authExpiresAt: data.session.expires_at
        ? new Date(data.session.expires_at * 1000).toISOString()
        : new Date(Date.now() + 60 * 60 * 1000).toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error && error.message
            ? `Login service error: ${error.message}`
            : "Login service error. Check Supabase environment variables."
      },
      { status: 502 }
    );
  }
}
