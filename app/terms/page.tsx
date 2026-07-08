import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Focus Coach Terms of Service",
  description:
    "Read the Focus Coach terms for using short focus training games, AI productivity recaps, subscriptions, and account features.",
  alternates: {
    canonical: "/terms"
  }
};

export default function TermsPage() {
  return (
    <PageShell>
      <Card className="bg-background/92 backdrop-blur">
        <CardHeader>
          <CardTitle>Focus Coach Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <section>
            <h1 className="text-3xl font-semibold tracking-normal text-foreground">
              Focus Coach Terms of Service
            </h1>
            <p>
              Focus Coach provides productivity-oriented focus training games and weekly AI recaps.
              These placeholder terms should be replaced with a formal legal document before launch.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Use of focus training games
            </h2>
            <p>
              The app is intended for productivity and work-focus routines. It is not a medical
              product and does not diagnose, treat, or prevent any condition.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">AI productivity recaps</h2>
            <p>
              AI-generated weekly reports are informational summaries of your training activity and
              may contain errors. Review recommendations before relying on them.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Subscriptions</h2>
            <p>
              The Pro plan is designed as an annual subscription for unlimited focus training,
              weekly AI recaps, and detailed data views. Stripe handles checkout and billing.
            </p>
          </section>
        </CardContent>
      </Card>
    </PageShell>
  );
}
