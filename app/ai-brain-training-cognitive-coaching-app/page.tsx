import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, ClipboardList, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: {
    absolute: "AI Brain Training Cognitive Coaching App & Brain Training App"
  },
  description:
    "Learn how Focus Coach combines AI brain training, cognitive coaching, short focus games, and weekly reports in one practical brain training app.",
  alternates: {
    canonical: "/ai-brain-training-cognitive-coaching-app"
  },
  openGraph: {
    type: "website",
    siteName: "Focus Coach",
    title: "AI Brain Training Cognitive Coaching App & Brain Training App",
    description:
      "A practical guide to Focus Coach as an AI brain training cognitive coaching app for attention, memory, and focus practice.",
    url: "/ai-brain-training-cognitive-coaching-app",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Focus Coach AI brain training cognitive coaching app"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Brain Training Cognitive Coaching App & Brain Training App",
    description:
      "Short cognitive training games, AI coaching insights, and weekly focus reports in one brain training app.",
    images: ["/opengraph-image"]
  }
};

export default function AiBrainTrainingCognitiveCoachingAppPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Brain Training Cognitive Coaching App & Brain Training App",
    description:
      "A guide to how Focus Coach combines cognitive training games, AI coaching insights, and weekly reports for practical focus practice.",
    url: "https://www.focuscoach.dev/ai-brain-training-cognitive-coaching-app",
    about: [
      "AI brain training",
      "cognitive coaching app",
      "brain training app",
      "cognitive training games"
    ]
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="space-y-12 py-8">
        <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground">
              <Sparkles className="mr-2 h-4 w-4 text-secondary" aria-hidden />
              Focus training guide
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-5xl">
              AI Brain Training Cognitive Coaching App & Brain Training App
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Focus Coach is an AI brain training cognitive coaching app for adults who want short,
              measurable focus practice. It combines a brain training app experience with cognitive
              coaching insights, so users can play quick games, review results, and understand what
              to practice next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/#focus-check">
                  Try the focus check
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/games">View cognitive training games</Link>
              </Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-lg border bg-background/90 shadow-sm">
            <Image
              src="/images/focus-coach-ai-report.jpg"
              alt="AI cognitive coaching weekly report dashboard with attention trend, accuracy, response speed, and focus insights"
              width={1536}
              height={1024}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 54vw, 100vw"
              priority
            />
          </figure>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "Short brain training games",
              text: "Practice attention, working memory, reaction speed, task switching, and inhibition with short games built for repeated use."
            },
            {
              icon: ClipboardList,
              title: "Cognitive coaching insights",
              text: "Use weekly summaries to understand accuracy, response speed, consistency, and what to practice in the next session."
            },
            {
              icon: Sparkles,
              title: "AI reports for focus",
              text: "Turn training data into plain-language guidance for workday focus without medical claims or clinical positioning."
            }
          ].map((item) => (
            <Card key={item.title} className="bg-background/88 backdrop-blur">
              <CardContent className="p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              What Makes It Different from a Regular Brain Training App
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
            <p>
              A regular brain training app often focuses on games and scores. Focus Coach keeps the
              games, but adds a coaching layer that explains patterns in plain language. That makes
              the experience more useful for adults who want focus practice that connects to daily
              work instead of isolated numbers.
            </p>
            <p>
              The app is not designed around medical claims. It is a productivity and mental fitness
              tool that helps users practice attention control, working memory, reaction speed, and
              task switching through short sessions. The AI report gives practical next steps based
              on recent training data.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              How the Cognitive Coaching Workflow Works
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
            <p>
              The workflow is simple: play a short game, collect a measurable result, then review
              what the result suggests. Over time, Focus Coach can compare performance across
              cognitive training games and produce weekly summaries that highlight consistency,
              accuracy, and response speed.
            </p>
            <p>
              This structure helps the app serve people who are searching for an AI brain training
              cognitive coaching app and a brain training app in one product. The games provide the
              training surface, while the AI coach helps interpret what happened and how to continue.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-normal">
              When to Use Focus Coach
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground md:col-span-2">
            <p>
              Focus Coach works best as a short routine. Users can open the app before a deep work
              block, during a break between meetings, or at the end of a day to keep their practice
              consistent. The sessions are intentionally brief so they support the workday rather
              than interrupt it.
            </p>
            <p>
              The product is useful for knowledge workers, students, founders, and adults who want a
              repeatable focus habit. It is not a replacement for sleep, medical care, or clinical
              advice, but it can provide a structured way to practice and reflect on focus-related
              skills.
            </p>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
