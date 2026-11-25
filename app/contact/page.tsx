import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { shareMetadata } from "@/lib/share-metadata";

const title = "Contact Focus Coach";
const description = "Contact the Focus Coach maintainer about an exercise, a correction, or a question about your data.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  ...shareMetadata(title + " | Focus Coach", description, "/contact")
};

export default function ContactPage() {
  return (
    <PageShell>
      <article className="max-w-2xl space-y-5 leading-7">
        <h1 className="text-3xl font-semibold">Contact Focus Coach</h1>
        <p>For feedback on an exercise, a correction to a guide, or a privacy question, email <a className="underline" href="mailto:lincyang85@gmail.com">lincyang85@gmail.com</a>.</p>
        <p>If you are reporting a problem, include the page address and what happened so the maintainer can try the same steps.</p>
      </article>
    </PageShell>
  );
}
