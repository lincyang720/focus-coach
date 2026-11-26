import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { shareMetadata } from "@/lib/share-metadata";

const title = "About Focus Coach";
const description = "Meet the maintainer of Focus Coach and learn why the site offers short, ADHD-friendly attention exercises for adults.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  ...shareMetadata(title, description, "/about")
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
        <h2 className="text-xl font-semibold">What the five exercises practice</h2>
        <p>
          In Number Memory, digits disappear and you type them back in order. N-Back asks a
          different question: does the highlighted square match the position you saw a few turns
          ago? Quick Match asks you to find the shape that matches both the outline and the color
          of a target. In Stroop, you choose the ink color even when the printed word names a
          different color. Task Switch changes the rule for sorting numbers, so you have to check
          which rule applies before answering.
        </p>
        <h2 className="text-xl font-semibold">How to check an explanation</h2>
        <p>
          The guides describe what the game actually counts. For example, Number Memory scores
          each digit in its original position. If you recall four of five positions correctly,
          you can check the arithmetic yourself: four divided by five gives 80 percent. If a
          guide and a result disagree, send the page address and the example through the contact
          page so the maintainer can check it against the scoring code.
        </p>
        <h2 className="text-xl font-semibold">Who the exercises are for</h2>
        <p>
          Students returning to a reading assignment and adults switching tasks between meetings
          can use a single round as a cue to begin. Pick the work you want to return to before
          you play.
        </p>
        <p>
          Explore the <Link className="underline" href="/games">focus exercises</Link> or
          {" "}<Link className="underline" href="/contact">contact the maintainer</Link> with feedback.
        </p>
      </article>
    </PageShell>
  );
}
