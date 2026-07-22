import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FocusCheck } from "@/components/home/focus-check";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: { absolute: "Free ADHD Focus Test – 60-Second Attention Assessment | FocusCoach" },
  description:
    "Try a free 60-second ADHD-friendly focus test. Check attention speed and accuracy online with no signup, then explore practical focus exercises for adults.",
  keywords: [
    "free adhd focus test",
    "adhd attention test online free",
    "60 second focus test",
    "attention test for adults"
  ],
  alternates: { canonical: "/free-adhd-focus-test" },
  openGraph: {
    title: "Free ADHD Focus Test – Check Your Attention in 60 Seconds",
    description: "A free, no-signup attention check with immediate task-specific feedback.",
    url: "/free-adhd-focus-test"
  }
};

const faqs = [
  {
    question: "Is this a diagnostic ADHD test?",
    answer:
      "No. This is a brief attention exercise, not a validated ADHD screening instrument, medical assessment, or diagnosis. Only a qualified clinician can diagnose ADHD."
  },
  {
    question: "What does the 60-second focus test measure?",
    answer:
      "It records accuracy on five visual matching decisions. The result describes performance on this short task only and should not be treated as a measure of overall attention or health."
  },
  {
    question: "Do I need an account?",
    answer: "No. You can complete the focus check in your browser without registering."
  },
  {
    question: "What should I do after the test?",
    answer:
      "Use the result as a starting point, then try a short Number Memory, N-Back, Task Switch, Quick Match, or Stroop exercise. Track task-specific trends rather than judging a single score."
  }
];

export default function FreeAdhdFocusTestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free ADHD-Friendly Focus Test",
        url: "https://www.focuscoach.dev/free-adhd-focus-test",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: "A free 60-second visual attention check for adults. Not a diagnostic test."
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="grid gap-10 py-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-sm font-medium text-primary">Free · 60 seconds · no signup</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
            Free ADHD Focus Test: Check Your Attention in 60 Seconds
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Complete five quick visual matching decisions and receive immediate feedback on your
            accuracy. This ADHD-friendly focus check is designed as a low-friction starting point
            for adults who want a structured reset before work.
          </p>
          <aside className="mt-6 rounded-lg border border-accent/30 bg-background/90 p-4 text-sm leading-6 text-muted-foreground">
            <strong className="text-foreground">Important:</strong> this is a productivity exercise,
            not an ADHD screening, clinical assessment, or diagnosis. A score cannot confirm or rule
            out ADHD.
          </aside>
        </div>
        <FocusCheck />
      </section>

      <section className="grid gap-6 py-12 md:grid-cols-3">
        <div><h2 className="text-2xl font-semibold">What This Focus Check Measures</h2></div>
        <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
          <p>The task asks you to identify a matching color-and-shape target across five rounds. It reports how many choices were correct, giving you simple feedback on this specific visual-selection task.</p>
          <p>Sleep, stress, interruptions, device input, and familiarity can all affect a short score. Use it as a momentary observation—not a label—and avoid comparing it with another person’s result.</p>
        </div>
      </section>

      <section className="rounded-lg border bg-background/90 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Turn the Check Into a 10-Minute Focus Routine</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          After the check, choose one exercise that matches the transition you need: Number Memory
          for recall, Quick Match for visual selection, N-Back for continuous updating, Task Switch
          for rule changes, or Stroop for inhibition. Then move directly into one clearly defined
          work action.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/games">Explore all free focus exercises <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </Button>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-semibold">Free ADHD Focus Test FAQ</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question} className="bg-background/88">
              <CardContent className="p-5">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
