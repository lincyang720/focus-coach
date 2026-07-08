import { NextResponse } from "next/server";
import { getPayPalAccessToken, getPayPalBaseUrl, hasPayPalConfig } from "@/lib/paypal";

type PayPalOrderResponse = {
  id?: string;
  links?: Array<{
    href: string;
    rel: string;
  }>;
};

export async function POST(req: Request) {
  const { userId } = (await req.json()) as { userId?: string };

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (!hasPayPalConfig()) {
    return NextResponse.json({
      orderId: `demo-${crypto.randomUUID()}`,
      approveUrl: "/success?demo=1"
    });
  }

  const accessToken = await getPayPalAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "PayPal is not configured" }, { status: 500 });
  }

  const appUrl =
    process.env.FRONTEND_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const response = await fetch(`${getPayPalBaseUrl()}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: userId,
          description: "Focus Coach Pro annual plan",
          amount: {
            currency_code: "USD",
            value: "29.99"
          }
        }
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: "Focus Coach",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: `${appUrl}/success`,
            cancel_url: `${appUrl}/pricing`
          }
        }
      }
    })
  });

  const data = (await response.json()) as PayPalOrderResponse & { message?: string };
  if (!response.ok) {
    return NextResponse.json(
      { error: data.message ?? "Unable to create PayPal order" },
      { status: 500 }
    );
  }

  const approveUrl = data.links?.find((link) => link.rel === "payer-action")?.href
    ?? data.links?.find((link) => link.rel === "approve")?.href;

  return NextResponse.json({
    orderId: data.id,
    approveUrl
  });
}
