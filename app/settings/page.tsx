"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAnnualSubscriptionExpiry,
  getCurrentUser,
  isSubscriptionActive,
  saveCurrentUser
} from "@/lib/storage";
import type { UserProfile } from "@/lib/types";

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  function setProDemo() {
    const current = getCurrentUser();
    if (!current) return;
    const next = {
      ...current,
      subscriptionStatus: "active" as const,
      subscriptionExpiresAt: getAnnualSubscriptionExpiry()
    };
    saveCurrentUser(next);
    setUser(next);
  }

  return (
    <PageShell>
      <Card className="max-w-2xl bg-background/92 backdrop-blur">
        <CardHeader>
          <CardTitle>Focus Coach account settings</CardTitle>
          <CardDescription>
            Manage your local account details and subscription status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email ?? "Not signed in"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Subscription</p>
            {user ? (
              <>
                <Badge
                  className={
                    isSubscriptionActive(user)
                      ? "mt-1 border-primary bg-primary text-primary-foreground"
                      : "mt-1 bg-background/80"
                  }
                >
                  {isSubscriptionActive(user) ? "active" : "free"}
                </Badge>
                {user.subscriptionExpiresAt ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Expires {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
                  </p>
                ) : null}
              </>
            ) : (
              <p className="font-medium">Not signed in</p>
            )}
          </div>
          {user ? (
            <Button variant="outline" onClick={setProDemo}>
              Enable Pro demo locally
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Sign in to view account email and subscription details.
              </p>
              <Button asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}
