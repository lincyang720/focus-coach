"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getAnnualSubscriptionExpiry,
  getCurrentUser,
  saveCurrentUser
} from "@/lib/storage";

export default function SuccessPage() {
  const [message, setMessage] = useState(
    "Your checkout completed. PayPal is confirming the payment."
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const demo = params.get("demo");
    const orderId = params.get("token") ?? params.get("order_id");
    const currentUser = getCurrentUser();
    const userId = params.get("user_id") ?? currentUser?.id;

    if (demo) {
      const user =
        getCurrentUser() ??
        ({
          id: "demo-user",
          email: "demo@focuscoach.local",
          name: "Demo User",
          subscriptionStatus: "free" as const
        });
      saveCurrentUser({
        ...user,
        subscriptionStatus: "active",
        subscriptionExpiresAt: getAnnualSubscriptionExpiry()
      });
      setMessage("Demo checkout completed. Your local Pro status is active.");
      return;
    }

    if (!orderId || !userId) {
      setMessage(
        "Checkout completed. If your Pro status does not update shortly, contact support with your PayPal receipt."
      );
      return;
    }

    fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, userId })
    })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.success) {
          throw new Error(result.error ?? "Unable to confirm PayPal payment");
        }
        const user = getCurrentUser();
        if (!user) {
          throw new Error("Sign in again to refresh your Pro status.");
        }
        saveCurrentUser({
          ...user,
          subscriptionStatus: "active",
          subscriptionExpiresAt: result.subscriptionExpiresAt ?? getAnnualSubscriptionExpiry()
        });
        setMessage("Your PayPal payment was confirmed and your Pro status is active.");
      })
      .catch((error) => {
        setMessage(
          error instanceof Error
            ? error.message
            : "PayPal payment confirmation failed. Please contact support."
        );
      });
  }, []);

  return (
    <PageShell>
      <Card className="mx-auto max-w-lg bg-background/92 backdrop-blur">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
          <h1 className="mt-4 text-2xl font-semibold">
            Focus Coach subscription active
          </h1>
          <p className="mt-2 text-muted-foreground">
            {message}
          </p>
          <Button className="mt-6" asChild>
            <Link href="/dashboard">Return to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
