"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser, saveCurrentUser } from "@/lib/storage";
import type { UserProfile } from "@/lib/types";

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  function setProDemo() {
    const current = getCurrentUser();
    const next = { ...current, subscriptionStatus: "active" as const };
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
            <Badge className="mt-1">{user?.subscriptionStatus ?? "free"}</Badge>
          </div>
          <Button variant="outline" onClick={setProDemo}>
            Enable Pro demo locally
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
