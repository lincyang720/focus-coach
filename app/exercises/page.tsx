import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { gameConfigs, gameSlugByType } from "@/lib/games";

export default function ExercisesPage() {
  return (
    <PageShell>
      <h1 className="text-3xl font-semibold">Exercises</h1>
      <ul className="my-4 space-y-3">
        {gameConfigs.map((game) => (
          <li key={game.type}>
            <Link className="text-primary underline" href={`/exercises/${gameSlugByType[game.type]}`}>
              {game.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="text-primary underline" href="/memory-games">Memory games for adults</Link>
    </PageShell>
  );
}
