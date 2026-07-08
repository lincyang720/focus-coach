import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";

export async function POST(req: Request) {
  const { userId, priceId } = (await req.json()) as {
    userId?: string;
    priceId?: string;
  };

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const stripe = createStripeClient();
  if (!stripe) {
    return NextResponse.json({
      sessionId: `demo-${crypto.randomUUID()}`,
      url: "/success?demo=1"
    });
  }

  const appUrl =
    process.env.FRONTEND_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId ?? process.env.STRIPE_PRICE_ID,
        quantity: 1
      }
    ],
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/pricing`,
    client_reference_id: userId
  });

  return NextResponse.json({ sessionId: session.id, url: session.url });
}
