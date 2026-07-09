import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Clock, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Focus Coach",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        description:
          "An AI brain training and cognitive training app with short attention games, adaptive difficulty, and weekly productivity recaps.",
        offers: {
          "@type": "Offer",
          price: "29.99",
          priceCurrency: "USD",
          category: "annual subscription"
        },
        featureList: [
          "10-minute cognitive training sessions",
          "Brain training games for attention and reaction speed",
          "Adaptive difficulty",
          "Weekly AI productivity recap"
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Focus Coach?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Focus Coach is an AI brain training and cognitive coaching app for short focus practice, attention games, and weekly productivity insights."
            }
          },
          {
            "@type": "Question",
            name: "Who is this cognitive training app for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Focus Coach is designed for adults who want practical focus training for work, study, and daily mental fitness without medical claims."
            }
          },
          {
            "@type": "Question",
            name: "How long does daily brain training take?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most sessions take 3 to 5 minutes per game, so users can build a daily brain training routine in about 10 minutes."
            }
          }
        ]
      }
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
            10-minute brain training app for workdays
          </p>
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
            AI Brain Training & Cognitive Coaching App
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Train attention, reaction speed, working memory, task switching, and self-control with
            five short cognitive training games. Weekly AI recaps turn your scores into practical
            next steps for better work sessions.
          </p>
          <h2 className="mt-8 text-2xl font-semibold tracking-normal">
            Cognitive Training Games with AI-Powered Productivity Reports
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Unlike generic brain training apps, Focus Coach combines short cognitive training
            exercises with weekly AI reports. Each session targets specific mental skills: working
            memory, reaction speed, attention control, and task switching.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            This AI cognitive coach translates your progress into productivity insights for adults
            who want personalized cognitive training, daily brain training, and focus games for work
            without medical claims or vague charts.
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
              title: "Short daily brain training",
              text: "Each cognitive training game is designed for 3-5 minutes so practice stays sustainable."
            },
            {
              icon: Brain,
              title: "Personalized cognitive training",
              text: "Accuracy above 80% raises the challenge; below 60% lowers it for adaptive focus practice."
            },
            {
              icon: BarChart3,
              title: "AI cognitive coach reports",
              text: "Weekly AI reports summarize brain training patterns without medical claims or vague charts."
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
