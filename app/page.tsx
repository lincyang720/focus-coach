import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Clock, Sparkles } from "lucide-react";
import { FocusCheck } from "@/components/home/focus-check";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: {
    absolute: "AI Brain Training Cognitive Coaching App | Focus Coach"
  },
  description:
    "AI brain training cognitive coaching app with short focus games, personalized insights, and weekly reports to help adults train attention and working memory.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName: "Focus Coach",
    title: "AI Brain Training Cognitive Coaching App | Focus Coach",
    description:
      "Try short brain training games, personalized cognitive coaching insights, and weekly AI reports for daily focus practice.",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Focus Coach brain training app dashboard preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Brain Training Cognitive Coaching App | Focus Coach",
    description:
      "Short focus games, cognitive coaching insights, and weekly AI reports for practical brain training.",
    images: ["/opengraph-image"]
  }
};

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
          "An AI brain training cognitive coaching app with short attention games, adaptive difficulty, and weekly productivity recaps.",
        offers: {
          "@type": "Offer",
          price: "29.99",
          priceCurrency: "USD",
          category: "annual subscription"
        },
        featureList: [
          "10-minute cognitive training sessions",
          "Brain training games for attention and reaction speed",
          "Cognitive coaching insights",
          "Adaptive difficulty",
          "Weekly AI productivity recap"
        ]
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is an AI brain training cognitive coaching app?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "An AI brain training cognitive coaching app combines short cognitive training games, performance tracking, and AI-generated coaching insights. Focus Coach uses that workflow to help adults practice attention, working memory, reaction speed, and task switching."
            }
          },
          {
            "@type": "Question",
            name: "How is Focus Coach different from a regular brain training app?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A regular brain training app may only show scores. Focus Coach adds cognitive coaching by turning game results into practical weekly insights about consistency, accuracy, response speed, and next steps for daily focus."
            }
          },
          {
            "@type": "Question",
            name: "Is Focus Coach a medical app?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Focus Coach is a productivity and mental fitness tool. It is not a medical device, does not diagnose conditions, and does not make clinical treatment claims."
            }
          },
          {
            "@type": "Question",
            name: "How often should I use this brain training app?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A short daily routine is usually easier to sustain than occasional long sessions. Focus Coach is designed around brief games that can fit before focused work, between meetings, or at the end of a workday review."
            }
          },
          {
            "@type": "Question",
            name: "What cognitive skills does Focus Coach train?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The games are organized around attention control, working memory, reaction speed, task switching, and inhibition. The AI report helps explain which areas looked consistent and which areas may deserve the next short practice session."
            }
          },
          {
            "@type": "Question",
            name: "Why compare this with a regular brain training app?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "People often search for an AI brain training cognitive coaching app brain training app when they want both quick games and meaningful feedback. Focus Coach connects the two by pairing practice with weekly coaching explanations."
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
      <section className="grid min-h-[calc(100vh-120px)] items-center gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground">
            <Sparkles className="mr-2 h-4 w-4 text-secondary" aria-hidden />
            10-minute brain training app for workdays
          </p>
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
            AI Brain Training Cognitive Coaching App
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Focus Coach is a brain training app for adults who want short, practical cognitive
            training. Play quick attention, memory, reaction, and task-switching games, then get AI
            coaching insights that explain what your results mean for daily focus and productivity.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            Try a short focus check on this page, then continue into the full AI brain training
            cognitive coaching app when you are ready for personalized weekly reports.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#focus-check">
                Try a 60-second focus check
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/games">View brain training games</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/ai-brain-training-cognitive-coaching-app">
                AI coaching guide
              </Link>
            </Button>
          </div>
        </div>
        <div id="focus-check">
          <FocusCheck />
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold tracking-normal">
            AI Brain Training Games for Daily Focus
          </h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            Focus Coach helps adults build a short, repeatable brain training routine. Each session
            includes cognitive training games for attention, reaction speed, working memory, and
            task switching. Instead of long lessons or vague charts, the app turns your training
            results into simple next steps you can use during a workday.
          </p>
          <p>
            The goal is practical mental fitness. You can start with a quick game, see how accurate
            you were, and return tomorrow with a clearer idea of what to practice next. This keeps
            daily brain training focused, measurable, and easy to repeat without making medical
            claims.
          </p>
        </div>
      </section>

      <section className="grid gap-4 py-8 md:grid-cols-3">
          {[
            {
              icon: Clock,
              title: "Short Cognitive Training for Working Adults",
              text: "Each cognitive training game is designed for 3-5 minutes so practice stays sustainable."
            },
            {
              icon: Brain,
              title: "Cognitive Coaching App with Personalized Insights",
              text: "Accuracy above 80% raises the challenge; below 60% lowers it for adaptive focus practice."
            },
            {
              icon: BarChart3,
              title: "Brain Training App with Weekly AI Reports",
              text: "Weekly AI reports summarize brain training patterns, consistency, and next steps."
            }
          ].map((item) => (
            <Card key={item.title} className="bg-background/88 backdrop-blur">
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">
            Cognitive Coaching App with Personalized Insights
          </h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            As a cognitive coaching app, Focus Coach looks at your recent game performance,
            accuracy, response time, and consistency. The app recommends short practice sessions
            based on your results, so your brain training feels focused instead of random.
          </p>
          <p>
            The coaching layer is designed for adults who want better work sessions, not another
            complicated dashboard. After you complete training, Focus Coach explains which cognitive
            skills were strongest, which games felt harder, and how to structure the next session.
          </p>
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">
            Brain Training App with Weekly AI Reports
          </h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            The weekly AI report explains your focus patterns in plain language. It highlights where
            your attention was strongest, which cognitive training games were hardest, and what to
            try next. Focus Coach is designed for productivity and mental fitness, not medical
            diagnosis or treatment.
          </p>
          <p>
            A useful AI brain training cognitive coaching app should let users experience the core
            workflow quickly: play, review, understand, and improve. That is why the homepage starts
            with an interactive focus check instead of asking every visitor to jump to another page
            before trying the product.
          </p>
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">
            How the AI Brain Training Cognitive Coaching App Works
          </h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            Focus Coach follows a simple training loop: play a short cognitive game, review
            accuracy and response speed, then use AI coaching insights to decide what to practice
            next. This makes the brain training app useful for adults who want practical focus
            support during workdays, not long lessons, medical-style dashboards, or abstract scores
            that are hard to act on.
          </p>
          <p>
            For people comparing an AI brain training cognitive coaching app with a regular brain
            training app, the difference is the coaching layer. Focus Coach connects game results to
            plain-language feedback about consistency, attention control, task switching, and
            working memory. The result is a routine that feels small enough to repeat and specific
            enough to guide the next session.
          </p>
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">
            Who This Brain Training App Is For
          </h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            Focus Coach is built for knowledge workers, students, founders, and busy adults who
            want short cognitive training sessions they can repeat consistently. The app is meant
            for a workday context: a quick warmup before deep work, a reset between meetings, or a
            simple way to track focus practice without turning it into another complicated project.
          </p>
          <p>
            The experience is intentionally practical. You can use the 60-second preview on this
            page, move into the full game library, and then review weekly patterns when enough
            training data is available. Focus Coach avoids clinical promises and keeps the language
            focused on attention practice, mental fitness, productivity, and better training
            consistency.
          </p>
        </div>
      </section>

      <section className="grid gap-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal">
            What You Can Practice with Focus Coach
          </h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            Each game targets a different part of focus. Number Memory supports working memory
            practice, Quick Match trains fast visual decisions, N-Back challenges active recall,
            Task Switch builds flexible attention, and Stroop Test practices inhibition and
            self-control. Together, these games make the app more complete than a single-purpose
            brain training tool.
          </p>
          <p>
            The weekly report brings those signals together. Instead of treating every score as an
            isolated number, Focus Coach looks for patterns across accuracy, response speed, game
            type, and training frequency. That is what turns a set of short games into an AI brain
            training cognitive coaching app for adults who want a repeatable focus routine.
          </p>
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-semibold tracking-normal">
          AI Brain Training Cognitive Coaching App FAQ
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {[
            {
              question: "What is an AI brain training cognitive coaching app?",
              answer:
                "It combines cognitive training games, performance tracking, and AI-generated coaching insights. Focus Coach uses short exercises to help adults practice attention, working memory, reaction speed, and task switching."
            },
            {
              question: "How is Focus Coach different from a regular brain training app?",
              answer:
                "A regular brain training app may stop at scores. Focus Coach adds weekly cognitive coaching insights that explain accuracy, consistency, response speed, and practical next steps for daily focus."
            },
            {
              question: "Is Focus Coach a medical app?",
              answer:
                "No. Focus Coach is a productivity and mental fitness tool. It does not diagnose conditions, treat health issues, or make clinical claims about cognitive improvement."
            },
            {
              question: "How often should I use this brain training app?",
              answer:
                "A short daily routine is usually easier to sustain than occasional long sessions. Focus Coach is designed around brief games that can fit before focused work, between meetings, or at the end of a workday review."
            },
            {
              question: "What cognitive skills does Focus Coach train?",
              answer:
                "The games are organized around attention control, working memory, reaction speed, task switching, and inhibition. The AI report helps explain which areas looked consistent and which areas may deserve the next short practice session."
            },
            {
              question: "Why compare this with a regular brain training app?",
              answer:
                "People often search for an AI brain training cognitive coaching app brain training app when they want both quick games and meaningful feedback. Focus Coach connects the two by pairing practice with weekly coaching explanations."
            }
          ].map((item) => (
            <Card key={item.question} className="bg-background/88 backdrop-blur">
              <CardContent className="p-5">
                <h3 className="font-semibold leading-6">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
