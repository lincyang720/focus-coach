"use client";

import { FocusCheck } from "@/components/home/focus-check";

/** Playable demo on /games so visitors can try a focus game without leaving the landing page. */
export function GamesInlineDemo() {
  return (
    <section id="try-a-game" className="scroll-mt-24">
      <h2 className="text-2xl font-semibold tracking-normal">Try a free focus game now</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Start with this 60-second attention check in your browser—no download and no account. When
        you want a longer round, pick any full game from the directory below.
      </p>
      <div className="mt-6 max-w-xl">
        <FocusCheck />
      </div>
    </section>
  );
}
