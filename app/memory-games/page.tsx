import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { gameConfigs, gameSlugByType } from "@/lib/games";

const title = "Memory Games for Adults | Focus Coach";
const description = "Play memory games for adults in your phone or desktop browser. No signup or download. Finished scores are saved in your browser so you can see your progress.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/memory-games" },
  ...shareMetadata(title, description, "/memory-games")
};

const practice = {
  number_memory: {
    skill: "Short-term recall: hold a string of digits in mind and type it back in order.",
    round: "One sequence; time varies with sequence length and typing speed."
  },
  quick_match: {
    skill: "Visual attention: spot the option with the same color and shape.",
    round: "20 prompts; time varies with response speed."
  },
  n_back: {
    skill: "Working memory: keep recent positions in mind as each new square appears.",
    round: "30 prompts; time varies with response speed."
  },
  task_switch: {
    skill: "Switching attention: follow the current rule as it changes from odd/even to small/large.",
    round: "30 prompts; time varies with response speed."
  },
  stroop: {
    skill: "Selective attention: choose the ink color while ignoring the word.",
    round: "30 prompts; time varies with response speed."
  }
};

export default function MemoryGamesPage() {
  return (
    <PageShell>
      <div className="space-y-8">
        <section>
          <h1 className="text-4xl font-semibold">Memory Games for Adults</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Pick a game and play a round in your phone or desktop browser.
            No signup or download is needed.
            Each finished round adds a score to your history in this browser.
          </p>
          <Button className="mt-4" asChild>
            <Link href={`/exercises/${gameSlugByType.number_memory}`}>Play Number Memory</Link>
          </Button>
        </section>

        <section aria-labelledby="practice-games">
          <h2 id="practice-games" className="text-2xl font-semibold">Choose a game</h2>
          <p className="mt-2 text-muted-foreground">
            Suggested practice times are planning guides. A round ends when you finish its prompts.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th scope="col" className="p-3">Game</th>
                  <th scope="col" className="p-3">What you practice</th>
                  <th scope="col" className="p-3">One round</th>
                  <th scope="col" className="p-3">Suggested practice</th>
                </tr>
              </thead>
              <tbody>
                {gameConfigs.map((game) => (
                  <tr key={game.type} className="border-t align-top">
                    <th scope="row" className="p-3">
                      <Link className="text-primary underline" href={`/exercises/${gameSlugByType[game.type]}`}>
                        {game.name}
                      </Link>
                    </th>
                    <td className="p-3">{practice[game.type].skill}</td>
                    <td className="p-3">{practice[game.type].round}</td>
                    <td className="p-3">{game.durationMinutes} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">See your scores across rounds</h2>
          <p className="max-w-2xl leading-7 text-muted-foreground">
            Each completed round saves its score, accuracy, difficulty, and completion time in this
            browser’s local storage. Open Progress in the same browser to see recent sessions and
            average scores by game. Clearing this site’s browser data clears that local history.
          </p>
          <nav aria-label="More from Focus Coach" className="flex flex-wrap gap-4">
            <Link className="text-primary underline" href="/">Focus Coach home</Link>
            <Link className="text-primary underline" href="/progress">View progress</Link>
          </nav>
        </section>
      </div>
    </PageShell>
  );
}
