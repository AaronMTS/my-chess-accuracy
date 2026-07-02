"use client";

import { Swords } from "lucide-react";
import HeaderEyebrow from "@/components/HeaderEyebrow";
import RivalSection from "@/components/rivals/RivalSection";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  getArchiveQueryOptions,
  getRivalQueryOptions,
} from "@/util/query-options";
import NoRivalsFallback from "@/components/rivals/NoRivalsFallback";
import { RivalDetails } from "@/types/rivals";

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

export default function RivalsPage() {
  const params = useParams();
  const username =
    typeof params?.username === "string"
      ? decodeURIComponent(params.username)
      : "";

  const { data: games } = useSuspenseQuery({
    ...getArchiveQueryOptions(username),
    select: (archive) => [
      ...archive.gamesWithAccuracy,
      ...archive.gamesWithNoAccuracy,
    ],
  });
  const { data } = useSuspenseQuery(getRivalQueryOptions(username, games));

  const mostDefeated = data.mostDefeatedArr;
  const biggestNemeses = data.biggestNemesesArr;

  return (
    <>
      <section className="relative p-8 flex gap-12 justify-between bg-surfaceLow rounded-2xl">
        <header className="relative z-10 space-y-4 lg:w-3/4">
          <HeaderEyebrow>Competitive Landscape</HeaderEyebrow>
          <h1 className="font-heading">
            Your Strategic <em className="text-primary">Nemesis</em> Map
          </h1>
          <p>
            Analyzing {data.totalRivals} unique opponents from all of your
            games. View a tactical breakdown of performance against your top
            competitors.
          </p>
        </header>
        <div className="absolute top-0 right-0 p-8 size-fit flex justify-center items-center">
          <Swords className="size-42 fill-surfaceBright stroke-surfaceBright opacity-70" />
        </div>
      </section>
      <Sections mostDefeated={mostDefeated} biggestNemeses={biggestNemeses} />
    </>
  );
}
