import { NextResponse } from "next/server";
import { hasPayPalConfig } from "@/lib/paypal";
import { createSupabaseAdminClient } from "@/lib/supabase";

type PayPalWebhookEvent = {
  event_type?: string;
  resource?: {
    id?: string;
    custom_id?: string;
    payer?: {
      payer_id?: string;
    };
    purchase_units?: Array<{
      custom_id?: string;
    }>;
  };
};

export async function POST(req: Request) {
  const supabase = createSupabaseAdminClient();

  if (!hasPayPalConfig() || !supabase) {
    return NextResponse.json({ received: true, demo: true });
  }

  const transmissionId = req.headers.get("paypal-transmission-id");
  const certUrl = req.headers.get("paypal-cert-url");
  const authAlgo = req.headers.get("paypal-auth-algo");

  if (!transmissionId || !certUrl || !authAlgo) {
    return NextResponse.json({ error: "Missing PayPal webhook headers" }, { status: 400 });
  }

  const event = (await req.json()) as PayPalWebhookEvent;
  const resource = event.resource;

  if (event.event_type === "CHECKOUT.ORDER.APPROVED") {
    const userId = resource?.purchase_units?.[0]?.custom_id ?? resource?.custom_id;
    if (!userId) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    const { error } = await supabase
      .from("users")
      .update({
        paypal_payer_id: resource?.payer?.payer_id ?? null,
        paypal_order_id: resource?.id ?? null,
        paypal_subscription_id: resource?.id ?? null,
        subscription_status: "active"
      })
      .eq("id", userId);

    if (error) {
      return NextResponse.json(
        { error: `Supabase update failed: ${error.message}` },
        { status: 500 }
      );
    }
  }

  if (event.event_type === "BILLING.SUBSCRIPTION.CANCELLED" && resource?.id) {
    const { error } = await supabase
      .from("users")
      .update({ subscription_status: "canceled" })
      .eq("paypal_subscription_id", resource.id);

    if (error) {
      return NextResponse.json(
        { error: `Supabase update failed: ${error.message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
