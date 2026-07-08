import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Focus Coach Privacy Policy",
  description:
    "Read the Focus Coach privacy policy for focus training data, account information, analytics, AI reports, and payment processing.",
  alternates: {
    canonical: "/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <Card className="bg-background/92 backdrop-blur">
        <CardHeader>
          <CardTitle>Focus Coach Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
          <section>
            <h1 className="text-3xl font-semibold tracking-normal text-foreground">
              Focus Coach Privacy Policy
            </h1>
            <p>
              Focus Coach is a productivity app for short focus training sessions. This placeholder
              policy explains the data categories the MVP is designed to handle before a formal legal
              policy is generated.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              Focus training data we collect
            </h2>
            <p>
              The app may store account details, game session scores, accuracy, difficulty level,
              training duration, and weekly AI recap content.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              How focus training data is used
            </h2>
            <p>
              Session data is used to show progress, adjust game difficulty, recommend short
              training sessions, and generate productivity-oriented weekly recaps.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Payments and processors</h2>
            <p>
              Payments are processed through Stripe. Focus Coach does not store full card numbers in
              the application database.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>
              Replace this placeholder with your support email before launch. For production, review
              this policy with a qualified legal provider.
            </p>
          </section>
        </CardContent>
      </Card>
    </PageShell>
  );
}
