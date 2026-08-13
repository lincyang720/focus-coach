import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Pause, Play, RotateCcw } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeepWorkTimer } from "./timer";

export const metadata: Metadata = {
  title: { absolute: "Deep Work Timer for Adults | Focus Coach" },
  description:
    "Use a focused deep work timer with 25, 45, 60, or 90 minute sessions, simple controls, and a quick pre-work reset. Built for adults who want fewer distractions and clearer work blocks.",
  keywords: [
    "deep work timer",
    "focus timer for adults",
    "pomodoro timer for deep work",
    "work session timer",
    "productivity timer"
  ],
  alternates: { canonical: "/deep-work-timer" },
  openGraph: {
    title: "Deep Work Timer for Adults | Focus Coach",
    description:
      "A simple deep work timer with flexible 25-90 minute sessions for focused work blocks.",
    url: "/deep-work-timer"
  }
};

const durations = [25, 45, 60, 90];

const faqs = [
  {
    question: "What makes this a deep work timer instead of a regular countdown?",
    answer:
      "This page is built around long, deliberate work blocks instead of a generic short timer. It is meant to help you start one clear task, stay with it, and then reset before the next block."
  },
  {
    question: "Can I use it for ADHD or distractibility?",
    answer:
      "Yes. Many adults with ADHD prefer a visible, simple work block that reduces decision fatigue. The timer is not a treatment, but it can support a more predictable work rhythm."
  },
  {
    question: "Do I need an account?",
    answer:
      "No. The timer works in your browser without signing in. You can pair it with the free focus check or use it on its own."
  },
  {
    question: "What should I do before starting the timer?",
    answer:
      "Pick one task, define the first physical action, and remove one obvious distraction. A clear start beats a perfect plan."
  }
];

export default function DeepWorkTimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Deep Work Timer",
    url: "https://www.focuscoach.dev/deep-work-timer",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    description:
      "A simple deep work timer for adults with adjustable 25 to 90 minute sessions and a distraction-free browser workflow."
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="grid gap-8 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <div className="max-w-2xl">
          <Badge className="bg-background/80">FocusCoach deep work timer</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-5xl">
            Deep Work Timer for Adults
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Use a clean, adjustable timer for focused work blocks. Start with 25, 45, 60, or 90
            minutes, then stay with one task until the block ends. It is designed for deep work,
            not for racing the clock.
          </p>
          <p className="mt-3 leading-7 text-muted-foreground">
            Pair it with a short reset before you begin, or jump straight in when you already know
            the next action.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#timer">
                Start timer
                <Clock3 className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/free-adhd-focus-test">Use the 60-second focus check</Link>
            </Button>
          </div>
        </div>

        <DeepWorkTimer />
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold">Why a deep work timer helps</h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            A deep work timer does one job well: it creates a visible block for real work. That
            matters when the hardest part is starting, not understanding the task. Use the timer to
            protect one outcome, not to prove discipline.
          </p>
          <p>
            The best block length depends on your day. A 25-minute session can reduce friction when
            you feel avoidant, while 60 or 90 minutes is better when you have already crossed the
            start line and want to stay in the work.
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-background/90 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Suggested deep work block lengths</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {durations.map((minutes) => (
            <Card key={minutes} className="bg-background/88">
              <CardHeader>
                <CardTitle>{minutes} minutes</CardTitle>
                <CardDescription>
                  {minutes === 25
                    ? "Good for a quick start or a low-energy day."
                    : minutes === 45
                      ? "Useful when you want focus without a long commitment."
                      : minutes === 60
                        ? "A balanced block for most deep work sessions."
                        : "Best for uninterrupted writing, coding, or analysis."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Before starting, write the first physical action. When the block ends, decide
                  whether to stop, recover, or begin a second round.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold">What to do before the clock starts</h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            Choose one task, close one distracting tab, and define the first action in plain
            language. If the work still feels vague, spend thirty seconds making the task smaller
            before pressing start.
          </p>
          <p>
            The timer is a boundary, not a verdict. If you stop early, treat it as a signal to
            adjust the next block rather than a failed session.
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-background/90 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Deep Work Timer FAQ</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question} className="bg-background/88">
              <CardContent className="p-5">
                <h3 className="font-semibold leading-6">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="flex flex-col gap-4 rounded-lg border bg-background/90 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="text-2xl font-semibold">Need a shorter reset first?</h2>
            <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
              Try the free focus check, then return here with one task and one clear starting move.
            </p>
          </div>
          <Button asChild>
            <Link href="/free-adhd-focus-test">
              Take the free focus test
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
