"use client";

import { Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, isSubscriptionActive } from "@/lib/storage";
import type { UserProfile } from "@/lib/types";

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const isPro = user ? isSubscriptionActive(user) : false;
  const isExpired =
    user?.subscriptionStatus === "active" &&
    Boolean(user.subscriptionExpiresAt) &&
    !isSubscriptionActive(user);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  async function startCheckout() {
    if (user && isSubscriptionActive(user)) {
      setError("Your Pro plan is already active.");
      return;
    }
    setLoading(true);
    setError("");
    const currentUser = user ?? getCurrentUser();
    if (!currentUser) {
      setLoading(false);
      router.push("/login");
      return;
    }
    const response = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id })
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(result.error ?? "Unable to open PayPal checkout.");
      return;
    }
    if (result.approveUrl) window.location.href = result.approveUrl;
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <Badge>Transparent annual pricing</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">
            Affordable AI Brain Training App Pricing - $29.99/year
          </h1>
          <p className="mt-2 text-muted-foreground">
            Free plan for basic validation. Upgrade to Pro for personalized cognitive training,
            unlimited brain training sessions, and weekly AI recaps.
          </p>
          <h2 className="mt-8 text-2xl font-semibold tracking-normal">
            Free cognitive training or Pro AI weekly recaps
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start with daily free attention games, then upgrade when unlimited sessions, adaptive
            difficulty, and AI productivity reports become useful.
          </p>
          {isPro && user?.subscriptionExpiresAt ? (
            <div className="mx-auto mt-5 max-w-md rounded-lg border border-primary bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
              Current Pro plan active until{" "}
              {new Date(user.subscriptionExpiresAt).toLocaleDateString()}.
            </div>
          ) : null}
          {isExpired ? (
            <p className="mt-4 text-sm font-medium text-accent">
              Your previous Pro plan has expired. Renew to continue using Pro features.
            </p>
          ) : null}
          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Plan
            title="Free"
            price="$0"
            features={[
              "1 cognitive training session per day",
              "Basic brain training score history",
              "Five core games"
            ]}
            action={
              <Button variant="outline" className="w-full" disabled={isPro}>
                {isPro ? "Included with Pro" : "Current plan"}
              </Button>
            }
          />
          <Plan
            title="Pro"
            price="$29.99/year"
            highlight
            features={[
              "Unlimited training sessions",
              "Weekly AI recap",
              "Detailed data analysis",
              "Personalized cognitive training insights",
              "Priority access to new games"
            ]}
            action={
              <Button className="w-full" onClick={startCheckout} disabled={loading || isPro}>
                <Sparkles className="h-4 w-4" aria-hidden />
                {isPro
                  ? "Current Pro plan"
                  : loading
                    ? "Opening PayPal..."
                    : isExpired
                      ? "Renew Pro"
                      : "Upgrade"}
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
    <Card
      className={
        highlight
          ? "border-primary bg-background/95 shadow-sm shadow-primary/20"
          : "bg-background/90"
      }
    >
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
