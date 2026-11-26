import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const title = "Focus Coach Privacy Policy";
const description = "Learn where Focus Coach stores exercise results in your browser, how advertising cookies may be used, and how to manage personalized ads.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/privacy"
  },
  ...shareMetadata(title, description, "/privacy")
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
              Focus Coach stores your exercise results in your own browser. The site does not create
              user accounts or generate weekly reports.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Your exercise results</h2>
            <p>
              When you finish an exercise, this browser saves your responses, score, accuracy,
              difficulty and session duration in local storage. The game uses results on this device
              to choose the next difficulty level. Clearing browser data for this site removes those results.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Advertising and cookies</h2>
            <p>
              Third-party advertising providers, including Google, may use cookies to choose ads
              based on previous visits to Focus Coach and other websites. Advertising cookies may
              help Google and its partners personalize the ads you see. To manage or turn off
              personalized Google ads, visit <a className="underline" href="https://myadcenter.google.com/">Google Ads Settings</a>.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>
              For questions about your privacy or exercise data, email <a className="underline" href="mailto:lincyang85@gmail.com">lincyang85@gmail.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </PageShell>
  );
}
