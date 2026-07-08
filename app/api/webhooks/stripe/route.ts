import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const stripe = createStripeClient();
  const supabase = createSupabaseAdminClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !supabase || !webhookSecret) {
    return NextResponse.json({ received: true, demo: true });
  }

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid webhook" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await supabase
      .from("users")
      .update({
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : session.customer?.id,
        stripe_subscription_id:
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id,
        subscription_status: "active"
      })
      .eq("id", session.client_reference_id);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    await supabase
      .from("users")
      .update({ subscription_status: "canceled" })
      .eq("stripe_subscription_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}
