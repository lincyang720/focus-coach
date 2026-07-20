import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "ADHD Focus & Productivity Guides",
  description: "Practical, non-clinical guides to ADHD-friendly focus routines, attention exercises, deep work, body doubling, and remote productivity.",
  alternates: { canonical: "/blog" }
};

export default function BlogPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: "ADHD Focus & Productivity Guides", url: "https://www.focuscoach.dev/blog", hasPart: articles.map(article => ({ "@type": "BlogPosting", headline: article.title, url: `https://www.focuscoach.dev/blog/${article.slug}` })) };
  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="mx-auto max-w-3xl py-12 text-center"><BookOpen className="mx-auto h-10 w-10 text-primary" aria-hidden /><h1 className="mt-5 text-4xl font-semibold">ADHD Focus & Productivity Guides</h1><p className="mt-4 text-lg leading-8 text-muted-foreground">Practical ways to start, structure, and return to focused work. Educational content only—never diagnosis or treatment advice.</p></header>
    <div className="grid gap-6 pb-12 md:grid-cols-2">{articles.map(article => <Card key={article.slug} className="bg-background/90"><CardContent className="flex h-full flex-col p-6"><p className="text-sm font-medium text-primary">{article.keyword}</p><h2 className="mt-2 text-xl font-semibold"><Link className="hover:text-primary" href={`/blog/${article.slug}`}>{article.title}</Link></h2><p className="mt-3 flex-1 leading-7 text-muted-foreground">{article.description}</p><Link className="mt-5 inline-flex items-center gap-2 font-medium text-primary" href={`/blog/${article.slug}`}>Read guide <ArrowRight className="h-4 w-4" aria-hidden /></Link></CardContent></Card>)}</div>
  </PageShell>;
}
