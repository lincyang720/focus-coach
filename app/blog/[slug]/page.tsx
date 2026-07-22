import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { articles, getArticle } from "@/lib/articles";

type Props = { params: { slug: string } };

export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, url: `/blog/${article.slug}`, publishedTime: article.published, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: article.title }] }
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const url = `https://www.focuscoach.dev/blog/${article.slug}`;
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", headline: article.title, description: article.description, datePublished: article.published, dateModified: article.published, mainEntityOfPage: url, author: { "@type": "Organization", name: "FocusCoach" }, publisher: { "@type": "Organization", name: "FocusCoach", url: "https://www.focuscoach.dev" }, keywords: article.keyword },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.focuscoach.dev/" }, { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.focuscoach.dev/blog" }, { "@type": "ListItem", position: 3, name: article.title, item: url }] }
  ] };
  return <PageShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <article className="mx-auto max-w-3xl py-10">
      <nav className="text-sm text-muted-foreground"><Link className="hover:text-foreground" href="/blog">Focus guides</Link> / {article.keyword}</nav>
      <header className="py-8"><p className="font-medium text-primary">{article.keyword}</p><h1 className="mt-3 text-4xl font-semibold leading-tight">{article.title}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{article.description}</p><p className="mt-4 text-sm text-muted-foreground">Updated {new Date(`${article.published}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })} · Educational productivity content</p></header>
      <div className="space-y-5 text-[1.05rem] leading-8">{article.intro.map(p => <p key={p}>{p}</p>)}</div>
      <div className="mt-10 space-y-12">{article.sections.map(section => <section key={section.heading}><h2 className="text-2xl font-semibold">{section.heading}</h2><div className="mt-4 space-y-4 leading-8 text-muted-foreground">{section.paragraphs.map(p => <p key={p}>{p}</p>)}{section.tips && <ul className="list-disc space-y-2 pl-6">{section.tips.map(tip => <li key={tip}>{tip}</li>)}</ul>}</div></section>)}</div>
      {article.sources && <section className="mt-12 border-t pt-8"><h2 className="text-xl font-semibold">Sources and further reading</h2><ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-6 text-muted-foreground">{article.sources.map(source => <li key={source.url}><a className="text-primary underline underline-offset-4" href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul></section>}
      <aside className="mt-12 rounded-lg border bg-background/90 p-6"><h2 className="text-xl font-semibold">Try a 60-second focus reset</h2><p className="mt-3 leading-7 text-muted-foreground">Use the free attention check as a transition into your next task, or explore all five training activities. No account is required for the homepage test.</p><div className="mt-5 flex flex-wrap gap-3"><Button asChild><Link href="/#focus-check">Take the free focus test <ArrowRight className="h-4 w-4" aria-hidden /></Link></Button><Button variant="outline" asChild><Link href="/games">Explore focus exercises</Link></Button></div></aside>
      <p className="mt-8 border-t pt-6 text-sm leading-6 text-muted-foreground">FocusCoach is a productivity and attention-training tool, not a medical device. It does not diagnose, treat, or cure ADHD. If attention difficulties affect daily life, consult a qualified healthcare professional.</p>
    </article>
  </PageShell>;
}
