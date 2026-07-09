"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email ?? "Loading..."}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Subscription</p>
            <Badge
              className={
                user && isSubscriptionActive(user)
                  ? "mt-1 border-primary bg-primary text-primary-foreground"
                  : "mt-1 bg-background/80"
              }
            >
              {user && isSubscriptionActive(user) ? "active" : "free"}
            </Badge>
            {user?.subscriptionExpiresAt ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Expires {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
              </p>
            ) : null}
          </div>
          <Button variant="outline" onClick={setProDemo}>
            Enable Pro demo locally
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
