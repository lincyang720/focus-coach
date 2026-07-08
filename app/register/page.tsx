"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { saveCurrentUser } from "@/lib/storage";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });
      const result = await response.json().catch(() => ({
        success: false,
        error: "Registration failed: invalid server response"
      }));
      if (!response.ok || !result.success) {
        setError(result.error ?? "Registration failed");
        return;
      }
      saveCurrentUser({
        id: result.userId,
        email,
        name,
        subscriptionStatus: "free"
      });
      router.push("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? `Registration request failed: ${error.message}`
          : "Registration request failed"
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
            <CardTitle>Create a focus training account</CardTitle>
            <CardDescription>Start with one free training session per day.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
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
                {loading ? "Creating..." : "Create account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
