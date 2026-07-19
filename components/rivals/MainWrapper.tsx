"use client";

import { Swords } from "lucide-react";
import RivalSection from "@/components/rivals/RivalSection";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  getArchiveQueryOptions,
  getRivalQueryOptions,
} from "@/util/query-options";
import NoRivalsFallback from "@/components/rivals/NoRivalsFallback";
import { RivalDetails } from "@/types/rivals";
import { getUserFacingErrorMessage } from "@/util/errors";

function Sections({
  mostDefeated,
  biggestNemeses,
}: {
  mostDefeated: RivalDetails[];
  biggestNemeses: RivalDetails[];
}) {
  if (mostDefeated.length === 0 && biggestNemeses.length === 0) {
    return <NoRivalsFallback />;
  }

  return (
    <>
      {mostDefeated.length > 0 && (
        <RivalSection
          title="Most Defeated"
          titleColor="text-primary"
          description="Opponents you currently dominate"
          rivals={mostDefeated}
          type="MOST_DEFEATED"
        />
      )}
      {biggestNemeses.length > 0 && (
        <RivalSection
          title="Biggest Nemeses"
          titleColor="text-tertiary"
          description="Opponents you currently struggle to defeat"
          rivals={biggestNemeses}
          type="BIGGEST_NEMESES"
        />
      )}
    </>
  );
}

export default function RivalsMainWrapper() {
  const params = useParams();
  const username =
    typeof params?.username === "string"
      ? decodeURIComponent(params.username)
      : "";

  const { data: games, error: archiveError } = useSuspenseQuery({
    ...getArchiveQueryOptions(username),
    select: (archive) => [
      ...archive.gamesWithAccuracy,
      ...archive.gamesWithNoAccuracy,
    ],
  });
  const { data, error: rivalError } = useSuspenseQuery(
    getRivalQueryOptions(username, games),
  );

  const mostDefeated = data.mostDefeatedArr;
  const biggestNemeses = data.biggestNemesesArr;

  if (archiveError || rivalError) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center text-red-200">
        <p className="font-semibold">We couldn’t load the rival analysis.</p>
        <p className="mt-2 text-sm">
          {getUserFacingErrorMessage(archiveError ?? rivalError)}
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="relative p-8 flex gap-12 justify-between bg-surfaceLow rounded-2xl">
        <header className="relative z-10 space-y-4 lg:w-9/10">
          <h1 className="font-heading">
            Your Strategic{" "}
            <span className="text-nowrap">
              <em className="text-primary">Nemesis</em> Map
            </span>
          </h1>
          <p className="max-w-187.5">
            Analyzing{" "}
            <span className="text-primary">
              {data.totalRivals.toLocaleString()}
            </span>{" "}
            opponents from all of your games. View a tactical breakdown of
            performance against your top competitors.
          </p>
        </header>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 h-full min-h-42 w-auto aspect-square p-4">
          <Swords className="size-full fill-surfaceBright stroke-surfaceBright opacity-70" />
        </div>
      </section>
      <Sections mostDefeated={mostDefeated} biggestNemeses={biggestNemeses} />
    </>
  );
}
