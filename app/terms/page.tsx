import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const title = "Focus Coach Terms of Service";
const description = "Read the terms for using Focus Coach's free focus training exercises, what the site is not, and how to contact the maintainer.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/terms"
  },
  ...shareMetadata(title, description, "/terms")
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
              Focus Coach provides free, browser-based attention exercises for adults. By using the site you
              agree to these terms. The exercises are provided as-is, for practice and self-comparison only.
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
            <h2 className="text-xl font-semibold text-foreground">No paid plans</h2>
            <p>
              All exercises on Focus Coach are free and require no account. There is no subscription, no
              checkout step, and no billing relationship of any kind.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            <p>Questions about these terms? Email <a className="underline" href="mailto:lincyang85@gmail.com">lincyang85@gmail.com</a>.</p>
          </section>
        </CardContent>
      </Card>
    </PageShell>
  );
}
