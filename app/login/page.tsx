"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { saveCurrentUser } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@focuscoach.local");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json().catch(() => ({
        success: false,
        error: "Login failed: invalid server response"
      }));
      if (!response.ok || !result.success) {
        setError(result.error ?? "Login failed");
        return;
      }
      saveCurrentUser({
        id: result.userId,
        email,
        subscriptionStatus: result.subscriptionStatus ?? "free",
        subscriptionExpiresAt: result.subscriptionExpiresAt ?? null,
        authExpiresAt: result.authExpiresAt ?? null
      });
      router.push("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? `Login request failed: ${error.message}`
          : "Login request failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md">
        <Card className="bg-background/92 backdrop-blur">
          <CardHeader>
            <CardTitle>Focus Coach login</CardTitle>
            <CardDescription>Use demo credentials locally or your Supabase account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <p className="mt-4 text-sm text-muted-foreground">
              New here?{" "}
              <Link className="font-medium text-primary" href="/register">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
