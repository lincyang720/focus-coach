import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const title = "Focus Coach Privacy Policy";
const description = "Learn how Focus Coach uses account details and exercise results, and how to contact the maintainer about your data.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy"
  },
  ...shareMetadata(title + " | Focus Coach", description, "/privacy")
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
              You can play the focus exercises without creating an account. When you finish a session,
              Focus Coach saves your result in this browser so you can review your practice over time.
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
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>
              For questions about your account or exercise data, email <a className="underline" href="mailto:lincyang85@gmail.com">lincyang85@gmail.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </PageShell>
  );
}
