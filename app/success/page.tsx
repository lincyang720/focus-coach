import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SuccessPage() {
  return (
    <PageShell>
      <Card className="mx-auto max-w-lg bg-background/92 backdrop-blur">
        <CardContent className="flex flex-col items-center p-10 text-center">
          <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
          <h1 className="mt-4 text-2xl font-semibold">
            Focus Coach subscription active
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your checkout completed. Stripe webhooks update the Supabase user record when configured.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/dashboard">Return to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
