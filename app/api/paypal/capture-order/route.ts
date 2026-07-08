import { NextResponse } from "next/server";
import { getPayPalAccessToken, getPayPalBaseUrl, hasPayPalConfig } from "@/lib/paypal";
import { createSupabaseAdminClient } from "@/lib/supabase";

type PayPalCaptureResponse = {
  id?: string;
  status?: string;
  payer?: {
    payer_id?: string;
  };
  purchase_units?: Array<{
    payments?: {
      captures?: Array<{
        id?: string;
        status?: string;
      }>;
    };
  }>;
};

export async function POST(req: Request) {
  const { orderId, userId } = (await req.json()) as {
    orderId?: string;
    userId?: string;
  };

  if (!orderId || !userId) {
    return NextResponse.json(
      { success: false, error: "orderId and userId are required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdminClient();
  if (!hasPayPalConfig() || !supabase) {
    return NextResponse.json({
      success: true,
      demo: true,
      status: "COMPLETED"
    });
  }

  const accessToken = await getPayPalAccessToken();
  if (!accessToken) {
    return NextResponse.json(
      { success: false, error: "PayPal is not configured" },
      { status: 500 }
    );
  }

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });

  const data = (await response.json()) as PayPalCaptureResponse & {
    name?: string;
    message?: string;
  };

  if (!response.ok && data.name !== "ORDER_ALREADY_CAPTURED") {
    return NextResponse.json(
      { success: false, error: data.message ?? "Unable to capture PayPal order" },
      { status: 500 }
    );
  }

  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
  const { error } = await supabase
    .from("users")
    .update({
      paypal_payer_id: data.payer?.payer_id ?? null,
      paypal_order_id: orderId,
      paypal_subscription_id: orderId,
      subscription_status: "active"
    })
    .eq("id", userId);

  if (error) {
    return NextResponse.json(
      { success: false, error: `Supabase update failed: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    orderId,
    captureId: capture?.id,
    status: data.status ?? capture?.status ?? "COMPLETED"
  });
}
