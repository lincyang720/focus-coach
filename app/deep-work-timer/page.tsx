import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Clock3 } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DeepWorkTimer } from "./timer";

export const metadata: Metadata = {
  title: { absolute: "Deep Work Timer – Free Online Focus Timer | FocusCoach" },
  description:
    "Free deep work timer: run 25-90 minute focus sessions instantly — no signup needed. Built for ADHD brains, with training prompts to help you actually start, not just time yourself.",
  keywords: [
    "deep work timer",
    "deep work timer online",
    "deep work sessions",
    "deep work technique",
    "deep work vs pomodoro"
  ],
  alternates: { canonical: "/deep-work-timer" },
  openGraph: {
    title: "Deep Work Timer – Free Online Focus Timer | FocusCoach",
    description:
      "Run 25-90 minute deep work sessions instantly. No signup required, with ADHD-friendly start prompts and session wrap-up.",
    url: "/deep-work-timer"
  }
};

const faqs = [
  {
    question: "What is a deep work timer?",
    answer:
      "A deep work timer is a focus timer that blocks out a fixed period, often 45 to 90 minutes, for uninterrupted cognitively demanding work. It helps you protect one task instead of constantly switching."
  },
  {
    question: "Is deep work the same as pomodoro?",
    answer:
      "Not exactly. Pomodoro usually uses short 25-minute work cycles with breaks. Deep work sessions are often longer single blocks, usually 60 to 90 minutes, for complex writing, coding, studying, or analysis."
  },
  {
    question: "How long should a deep work session be?",
    answer:
      "It depends on your energy and task. Many people use 45 to 90 minutes. ADHD users may prefer starting with 25 minutes or even a 10-minute reduced-scope block before building longer sessions."
  },
  {
    question: "Do I need to create an account to use this timer?",
    answer:
      "No. FocusCoach's deep work timer is free and works directly in your browser without signup, login, or installation."
  },
  {
    question: "Can this timer help with ADHD?",
    answer:
      "It can help as a productivity support, not a treatment. The timer includes start-blocker prompts, micro-goals, and a session wrap-up so ADHD users get help beginning and returning, not just a countdown."
  }
];

export default function DeepWorkTimerPage() {
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Deep Work Timer",
    url: "https://www.focuscoach.dev/deep-work-timer",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    description:
      "A free online deep work timer with 25, 45, 60, and 90 minute focus sessions, custom durations, ADHD-friendly start prompts, and local session wrap-up."
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="grid gap-8 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="max-w-2xl">
          <Badge className="bg-background/80">Free online focus timer</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-5xl">
            Deep Work Timer
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Start a focus session in one click — no account needed. Choose 25, 45, 60, or
            90 minutes, set a micro-goal if starting feels sticky, and use the wrap-up to learn
            what helped or distracted you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#timer">
                Start a deep work session
                <Clock3 className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/games">Try focus training games</Link>
            </Button>
          </div>
        </div>

        <DeepWorkTimer />
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold">What Is a Deep Work Timer</h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            A deep work timer is a simple boundary for one demanding task. Instead of leaving the
            workday open-ended, a deep work timer gives your brain a visible container: one task,
            one block, one next action. It works best for writing, coding, studying, planning, or
            any project that suffers when you switch tabs every few minutes.
          </p>
          <p>
            The timer is only the tool. The deeper skill is creating conditions that make focus
            easier to begin and easier to return to. That is why this deep work timer includes a
            pre-start prompt and a quick session review, not just a countdown.
          </p>
        </div>
      </section>

      <section className="rounded-lg border bg-background/90 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">How to Use This Deep Work Timer</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["1", "Choose a block", "Pick 25, 45, 60, 90 minutes, or set a custom 5-180 minute session."],
            ["2", "Clear the start", "Use Start Blockers to begin now, write a micro-goal, or reduce the scope."],
            ["3", "Stay with one task", "Watch the circular progress and keep the browser tab title visible."],
            ["4", "Wrap the session", "Rate focus 1-5 and capture the distraction pattern before moving on."]
          ].map(([step, title, text]) => (
            <Card key={step} className="bg-background/88">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-primary">Step {step}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold">Deep Work Timer vs Pomodoro Timer</h2>
        </div>
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-lg border bg-background/90">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th className="p-4 font-semibold">Method</th>
                  <th className="p-4 font-semibold">Best for</th>
                  <th className="p-4 font-semibold">Typical length</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium">Pomodoro timer</td>
                  <td className="p-4 text-muted-foreground">Short tasks, shallow work, quick momentum</td>
                  <td className="p-4 text-muted-foreground">25 minutes + 5 minute break</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Deep work timer</td>
                  <td className="p-4 text-muted-foreground">Writing, coding, studying, strategy, complex work</td>
                  <td className="p-4 text-muted-foreground">45-90 minutes, or shorter when starting is hard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold">Why ADHD Brains Need a Different Kind of Timer</h2>
        </div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>
            ADHD-friendly timers need to solve the beginning problem. A standard timer assumes you
            are ready to start; many distracted brains need help turning a vague intention into a
            concrete first move. Start Blockers give you three launch paths: begin now, define a
            micro-goal, or reduce the task to a 10-minute version.
          </p>
          <p>
            If deep work often feels slippery, pair this page with FocusCoach&apos;s short training
            games and our guide to{" "}
            <Link className="font-medium text-primary" href="/blog/adhd-deep-work-flow">
              ADHD and deep work
            </Link>
            . The goal is not perfect concentration; it is making starting and returning easier.
          </p>
          <Button variant="outline" asChild>
            <Link href="/games">
              Build your focus muscle
              <Brain className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
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
            <h2 className="text-2xl font-semibold">Want a baseline before your next session?</h2>
            <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
              Take the free 60-second attention test, then come back and start a focused work block.
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
