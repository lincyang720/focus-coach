import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Clock, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Focus Coach",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    description:
      "A focus training app with short attention games, adaptive difficulty, and weekly AI productivity recaps.",
    offers: {
      "@type": "Offer",
      price: "29.99",
      priceCurrency: "USD",
      category: "annual subscription"
    },
    featureList: [
      "10-minute focus training sessions",
      "Attention and reaction speed games",
      "Adaptive difficulty",
      "Weekly AI productivity recap"
    ]
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="grid min-h-[calc(100vh-120px)] items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground">
            <Sparkles className="mr-2 h-4 w-4 text-secondary" aria-hidden />
            10-minute focus training app for workdays
          </p>
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
            AI Focus Training App for Work and Productivity
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Train attention, reaction speed, task switching, and self-control with five short games.
            Weekly AI recaps turn your scores into practical next steps for better work sessions.
          </p>
          <h2 className="mt-8 text-2xl font-semibold tracking-normal">
            Short attention games with AI productivity coaching
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Focus Coach combines five online attention training games with adaptive difficulty and
            weekly AI recaps, so each session stays focused on workday productivity.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start training
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            {
              icon: Clock,
              title: "Short focus training sessions",
              text: "Each game is designed for 3-5 minutes so training stays sustainable."
            },
            {
              icon: Brain,
              title: "Adaptive attention games",
              text: "Accuracy above 80% raises the challenge; below 60% lowers it."
            },
            {
              icon: BarChart3,
              title: "AI productivity recaps",
              text: "Weekly AI reports summarize patterns without medical claims or vague charts."
            }
          ].map((item) => (
            <Card key={item.title} className="bg-background/88 backdrop-blur">
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
