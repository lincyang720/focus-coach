"use client";

import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/storage";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    const user = getCurrentUser();
    const response = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id })
    });
    const result = await response.json();
    setLoading(false);
    if (result.approveUrl) window.location.href = result.approveUrl;
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <Badge>Transparent annual pricing</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            Affordable Focus Training App Pricing - $29.99/year
          </h1>
          <p className="mt-2 text-muted-foreground">
            Free plan for basic validation. Upgrade to Pro for $29.99/year when weekly recaps and detailed data matter.
          </p>
          <h2 className="mt-8 text-2xl font-semibold tracking-normal">
            Free focus training or Pro AI weekly recaps
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start with daily free attention games, then upgrade when unlimited sessions and AI
            productivity reports become useful.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Plan
            title="Free"
            price="$0"
            features={["1 training session per day", "Basic score history", "Five core games"]}
            action={<Button variant="outline" className="w-full">Current plan</Button>}
          />
          <Plan
            title="Pro"
            price="$29.99/year"
            highlight
            features={[
              "Unlimited training sessions",
              "Weekly AI recap",
              "Detailed data analysis",
              "Priority access to new games"
            ]}
            action={
              <Button className="w-full" onClick={startCheckout} disabled={loading}>
                <Sparkles className="h-4 w-4" aria-hidden />
                {loading ? "Opening PayPal..." : "Upgrade"}
              </Button>
            }
          />
        </div>
      </div>
    </PageShell>
  );
}

function Plan({
  title,
  price,
  features,
  action,
  highlight
}: {
  title: string;
  price: string;
  features: string[];
  action: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "border-primary bg-background/95" : "bg-background/90"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-3xl font-semibold">{price}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-6">{action}</div>
      </CardContent>
    </Card>
  );
}
