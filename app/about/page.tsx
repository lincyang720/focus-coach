import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { shareMetadata } from "@/lib/share-metadata";

const title = "About Focus Coach";
const description = "Meet the maintainer of Focus Coach and learn why the site offers short, ADHD-friendly attention exercises for adults.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  ...shareMetadata(title + " | Focus Coach", description, "/about")
};

export default function AboutPage() {
  return (
    <PageShell>
      <article className="max-w-2xl space-y-5 leading-7">
        <h1 className="text-3xl font-semibold">About Focus Coach</h1>
        <p>
          Focus Coach is maintained by <a className="underline" href="https://github.com/lincyang720">lincyang720</a>.
          The project gives adults, including adults with ADHD, a short, concrete way to practice
          attention when getting started or returning to work feels difficult.
        </p>
        <p>
          Each exercise starts with one decision: recall the digits you just saw, match a shape,
          or choose the color of the ink. You can try a set in your browser without signing up.
          Your score describes that attempt. The guides explain how the scoring works and what
          you can learn by comparing your own sessions.
        </p>
        <p>
          Explore the <Link className="underline" href="/games">focus exercises</Link> or
          {" "}<Link className="underline" href="/contact">contact the maintainer</Link> with feedback.
        </p>
      </article>
    </PageShell>
  );
}
