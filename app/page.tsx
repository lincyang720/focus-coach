import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Clock, Sparkles } from "lucide-react";
import { FocusCheck } from "@/components/home/focus-check";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: { absolute: "ADHD Focus App – AI Attention Training | FocusCoach" },
  description: "FocusCoach is an AI-powered ADHD focus app for adults. Train your attention in 10 minutes a day with adaptive exercises. Try the free 60-second focus test.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: "FocusCoach", url: "/",
    title: "ADHD Focus App – AI Attention Training | FocusCoach",
    description: "ADHD-friendly attention training with adaptive exercises and a free 60-second focus test.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ADHD focus app dashboard" }]
  },
  twitter: { card: "summary_large_image", title: "ADHD Focus App – AI Attention Training | FocusCoach", description: "ADHD-friendly attention training in 10 minutes a day.", images: ["/opengraph-image"] }
};

const faqs = [
  { question: "Is FocusCoach a treatment for ADHD?", answer: "No. FocusCoach is an attention training tool designed for adults, including those with ADHD. It is not a medical device and does not diagnose, treat, or cure ADHD." },
  { question: "How is an ADHD focus app different from a regular timer?", answer: "FocusCoach adapts exercise difficulty to your performance and helps you practice attention skills over time, instead of only counting down minutes." },
  { question: "How long does it take to notice a difference?", answer: "There is no guaranteed timeline. Your experience depends on your routine, environment, and needs. Use your trends to see whether consistent 10-minute sessions feel useful for you." },
  { question: "Can I use FocusCoach alongside ADHD medication or therapy?", answer: "FocusCoach is a complementary productivity tool, not healthcare. It does not replace professional care. Follow your clinician’s advice about medication, therapy, and treatment plans." },
  { question: "Do I need an account to try it?", answer: "No. The 60-second attention test runs in your browser with no signup required." }
];

export default function HomePage() {
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebApplication", name: "FocusCoach", url: "https://www.focuscoach.dev/", applicationCategory: "ProductivityApplication", operatingSystem: "Web", description: "An ADHD-friendly focus app for adults with short adaptive attention exercises and weekly productivity insights.", offers: { "@type": "Offer", price: "29.99", priceCurrency: "USD", category: "annual subscription" }, featureList: ["Free 60-second focus test", "10-minute attention training sessions", "Adaptive focus exercises", "Weekly AI productivity recap"] },
    { "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }
  ] };

  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="grid min-h-[calc(100vh-120px)] items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="max-w-2xl">
        <p className="mb-4 inline-flex items-center rounded-full border bg-background/80 px-3 py-1 text-sm text-muted-foreground"><Sparkles className="mr-2 h-4 w-4 text-secondary" aria-hidden />ADHD-friendly focus training for adults</p>
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">The ADHD Focus App That Trains Your Attention in 10 Minutes a Day</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">FocusCoach is an ADHD focus app built for adults who want practical focus training for work and daily life. Try adaptive attention exercises, track useful patterns, and build a routine small enough to repeat.</p>
        <p className="mt-3 leading-7 text-muted-foreground">Start with the free 60-second attention test—right here, with no signup required.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild><a href="#focus-check">Take the free focus test <ArrowRight className="h-4 w-4" aria-hidden /></a></Button><Button variant="outline" size="lg" asChild><Link href="/games">Explore focus exercises</Link></Button><Button variant="ghost" size="lg" asChild><Link href="/blog">Read focus guides</Link></Button></div>
      </div>
      <div id="focus-check" className="scroll-mt-24"><FocusCheck /></div>
    </section>

    <section className="grid gap-6 py-12 md:grid-cols-3"><div><h2 className="text-2xl font-semibold">Attention Training That Fits a Real Workday</h2></div><div className="space-y-4 leading-7 text-muted-foreground md:col-span-2"><p>Long programs can be hard to begin when your attention already feels stretched. FocusCoach uses short focus exercises for attention control, working memory, reaction speed, task switching, and inhibition.</p><p>Each session gives you a clear next action. That makes the app useful as an ADHD productivity companion before deep work, between meetings, or whenever you need a structured reset.</p></div></section>

    <section className="grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div className="space-y-4"><h2 className="text-2xl font-semibold">See Your ADHD Focus Tools in One Place</h2><p className="leading-7 text-muted-foreground">The dashboard combines exercises, progress trends, and plain-language AI summaries. Start quickly, understand recent attention patterns, and return to the task that matters.</p></div><figure className="overflow-hidden rounded-lg border bg-background/90 shadow-sm"><Image src="/images/focus-coach-dashboard.jpg" alt="ADHD focus app dashboard showing exercises and weekly progress" width={1536} height={1024} className="h-auto w-full" sizes="(min-width: 1024px) 58vw, 100vw" /></figure></section>

    <section className="grid gap-4 py-10 md:grid-cols-3">{[
      { icon: Clock, title: "10-Minute Focus Exercises", text: "Brief sessions make attention training easier to start and repeat." },
      { icon: Brain, title: "Adaptive Difficulty", text: "Exercises adjust to performance so practice stays appropriately challenging." },
      { icon: BarChart3, title: "Weekly AI Insights", text: "Review accuracy, response speed, consistency, and practical next steps." }
    ].map(item => <Card key={item.title} className="bg-background/88"><CardContent className="flex gap-4 p-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"><item.icon className="h-5 w-5" aria-hidden /></div><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p></div></CardContent></Card>)}</section>

    <section className="grid gap-6 py-12 md:grid-cols-3"><div><h2 className="text-2xl font-semibold">More Than a Focus Timer</h2></div><div className="space-y-4 leading-7 text-muted-foreground md:col-span-2"><p>A timer can create a boundary around a task, but it cannot show which type of attention challenge needs practice. FocusCoach pairs a lightweight routine with exercises and progress signals.</p><p>Use Number Memory for active recall, Quick Match for fast visual decisions, N-Back for working memory, Task Switch for flexible attention, and Stroop for inhibition. Results are educational productivity signals—not a clinical assessment.</p></div></section>

    <section className="rounded-lg border bg-background/90 p-6 md:p-8"><h2 className="text-2xl font-semibold">Simple Pricing, Free First Step</h2><div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="text-3xl font-semibold">$29.99 <span className="text-base font-normal text-muted-foreground">/ year</span></p><p className="mt-2 text-muted-foreground">Free focus test, no signup required. Upgrade when you want saved trends and reports.</p></div><Button asChild size="lg"><Link href="/pricing">View pricing <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button></div></section>

    <section className="py-12"><h2 className="text-2xl font-semibold">ADHD Focus App FAQ</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{faqs.map(item => <Card key={item.question} className="bg-background/88"><CardContent className="p-5"><h3 className="font-semibold leading-6">{item.question}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p></CardContent></Card>)}</div></section>

    <aside className="mb-10 rounded-lg border border-accent/30 bg-background/90 p-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Important:</strong> FocusCoach is a training and productivity tool, not a medical device. It does not diagnose, treat, or cure ADHD and is not a replacement for professional healthcare.</aside>
  </PageShell>;
}
