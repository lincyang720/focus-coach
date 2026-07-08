import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email, password, name } = (await req.json()) as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json({
        success: true,
        userId: `demo-${crypto.randomUUID()}`
      });
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name }
    });

    if (error || !data.user) {
      return NextResponse.json(
        { success: false, error: error?.message ?? "Registration failed" },
        { status: 400 }
      );
    }

    const { error: profileError } = await supabase.from("users").upsert({
      id: data.user.id,
      email,
      name,
      subscription_status: "free"
    });

    if (profileError) {
      return NextResponse.json(
        { success: false, error: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, userId: data.user.id });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error && error.message
            ? `Registration service error: ${error.message}`
            : "Registration service error. Check Supabase environment variables."
      },
      { status: 502 }
    );
  }
}
