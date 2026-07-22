import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Clock, Sparkles } from "lucide-react";
import { FocusCheck } from "@/components/home/focus-check";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: { absolute: "ADHD Focus Exercises for Adults – 10 Min/Day | FocusCoach" },
  description: "Try ADHD focus exercises for adults with five adaptive attention games and a free 60-second focus test. Train attention in 10 minutes a day.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: "FocusCoach", url: "/",
    title: "ADHD Focus Exercises for Adults – 10 Min/Day | FocusCoach",
    description: "ADHD focus exercises for adults with adaptive games and a free 60-second focus test.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ADHD focus app dashboard" }]
  },
  twitter: { card: "summary_large_image", title: "ADHD Focus Exercises for Adults – 10 Min/Day | FocusCoach", description: "ADHD-friendly attention training in 10 minutes a day.", images: ["/opengraph-image"] }
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
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">ADHD Focus Exercises for Adults: Train Your Attention in 10 Minutes a Day</h1>
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

    <section className="py-12">
      <div className="max-w-3xl"><h2 className="text-2xl font-semibold">Five Focus Exercises, Five Different Skills</h2><p className="mt-4 leading-7 text-muted-foreground">A single focus timer gives every day the same intervention. FocusCoach offers five short exercises so you can choose a practice that matches the kind of mental transition you want to make before work.</p></div>
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{[
        { title: "Number Memory", text: "A sequence appears briefly, then disappears. Recalling it gives working memory a compact challenge before a task that requires you to hold details in mind. Difficulty adapts gradually, so the exercise stays approachable instead of jumping from easy to overwhelming." },
        { title: "Quick Match", text: "Compare simple visual targets and respond accurately under light time pressure. Quick Match works well as a transition out of passive scrolling because it asks for deliberate visual selection without requiring a long setup or complicated rules." },
        { title: "N-Back", text: "Decide whether the current item matches one shown a set number of steps earlier. N-Back practices continuous updating, but research suggests that much of its benefit may remain task-specific—so FocusCoach never presents it as a cure or guaranteed intelligence boost." },
        { title: "Task Switch", text: "Alternate between two sorting rules and notice when the active rule changes. It is a short way to practice reorienting after a meeting or interruption, while remembering that a game score cannot predict real-world job performance." },
        { title: "Stroop Test", text: "Respond to the color of the text while ignoring the color word itself. The conflict creates a familiar inhibition exercise: slow down after errors, prioritize accuracy, and use the round as a cue to begin your chosen work block." }
      ].map(game => <Card key={game.title} className="bg-background/88"><CardContent className="p-5"><h3 className="font-semibold">{game.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{game.text}</p></CardContent></Card>)}</div>
      <Button variant="outline" className="mt-6" asChild><Link href="/games">See all focus exercises <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button>
    </section>

    <section className="grid gap-6 py-12 md:grid-cols-3"><div><h2 className="text-2xl font-semibold">Use FocusCoach Where Focus Usually Breaks Down</h2></div><div className="space-y-4 leading-7 text-muted-foreground md:col-span-2"><p><strong className="text-foreground">Before deep work:</strong> use a brief exercise as a clear transition from email or browsing into one defined task. Write the first physical action before you start, then move directly from the result screen into that action.</p><p><strong className="text-foreground">Between meetings:</strong> take a structured reset instead of opening another feed. One short round can mark the end of the previous context; a one-line note can identify what deserves attention next.</p><p><strong className="text-foreground">When starting feels difficult:</strong> pair the free focus check with a ten-minute work commitment. The goal is not a perfect score or an hour of concentration—it is to reduce the distance between intention and the first useful action.</p><p><strong className="text-foreground">During a low-energy afternoon:</strong> choose a lighter exercise, review the trend without judgment, and select a task that fits your available energy. FocusCoach is meant to support a realistic workday rather than turn productivity into another test.</p></div></section>

    <section className="rounded-lg border bg-background/90 p-6 md:p-8"><h2 className="text-2xl font-semibold">How FocusCoach Differs From General Brain-Training Apps</h2><div className="mt-5 grid gap-6 md:grid-cols-3"><div><h3 className="font-semibold">FocusCoach</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Designed around brief, ADHD-friendly workday transitions, a no-signup focus check, adaptive exercises, and plain-language productivity summaries. The experience connects each practice session to a next action.</p></div><div><h3 className="font-semibold">Lumosity</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Offers a broad library of cognitive games and personalized daily workouts for a general audience. It may suit people who want variety across many game categories rather than an ADHD-specific work routine.</p></div><div><h3 className="font-semibold">CogniFit</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Provides a wider cognitive assessment and training platform across multiple audiences and use cases. FocusCoach is intentionally narrower: quick attention practice for adults who want to return to productive work.</p></div></div><p className="mt-5 text-sm leading-6 text-muted-foreground">This comparison describes positioning, not clinical effectiveness. Competitor features can change; review each provider’s current product information before choosing a tool.</p></section>

    <section className="grid gap-6 py-12 md:grid-cols-3"><div><h2 className="text-2xl font-semibold">Early Feedback Should Be Real</h2></div><div className="space-y-4 leading-7 text-muted-foreground md:col-span-2"><p>We do not publish invented testimonials. FocusCoach is collecting structured feedback from early users about ease of starting, clarity of results, and whether the ten-minute routine fits a real workday.</p><p>If you have tried the focus check or game library, send the specific context in which you used it, what felt helpful or confusing, and whether we may quote you. Approved testimonials will be labeled with the reviewer’s chosen name and context.</p></div></section>

    <section className="rounded-lg border bg-background/90 p-6 md:p-8"><h2 className="text-2xl font-semibold">Simple Pricing, Free First Step</h2><div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="text-3xl font-semibold">$29.99 <span className="text-base font-normal text-muted-foreground">/ year</span></p><p className="mt-2 text-muted-foreground">Free focus test, no signup required. Upgrade when you want saved trends and reports.</p></div><Button asChild size="lg"><Link href="/pricing">View pricing <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button></div></section>

    <section className="py-12"><h2 className="text-2xl font-semibold">ADHD Focus App FAQ</h2><div className="mt-5 grid gap-6 md:grid-cols-2">{faqs.map(item => <Card key={item.question} className="bg-background/88"><CardContent className="p-5"><h3 className="font-semibold leading-6">{item.question}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p></CardContent></Card>)}</div></section>

    <aside className="mb-10 rounded-lg border border-accent/30 bg-background/90 p-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Important:</strong> FocusCoach is a training and productivity tool, not a medical device. It does not diagnose, treat, or cure ADHD and is not a replacement for professional healthcare.</aside>
  </PageShell>;
}
