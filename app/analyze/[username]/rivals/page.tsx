"use client";

import { Swords } from "lucide-react";
import HeaderEyebrow from "@/components/HeaderEyebrow";
import RivalSection from "@/components/rivals/RivalSection";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getArchiveRivalsQueryOptions } from "@/util/query-options";

export default function RivalsPage() {
  const params = useParams();
  const username =
    typeof params?.username === "string"
      ? decodeURIComponent(params.username)
      : "";

  const { data: rivals } = useSuspenseQuery(
    getArchiveRivalsQueryOptions(username),
  );

  const mostDefeated = rivals.slice(0, 3);
  const biggestNemeses = rivals.slice(-3).toReversed();

  return (
    <>
      <section className="relative p-8 flex gap-12 justify-between bg-surfaceLow rounded-2xl">
        <header className="relative z-10 space-y-4 lg:w-3/4">
          <HeaderEyebrow>Competitive Landscape</HeaderEyebrow>
          <h1 className="font-heading">
            Your Strategic <em className="text-primary">Nemesis</em> Map
          </h1>
          <p>
            Analyzing {rivals.length} rival relationships from your analyzed
            games. Your dominance is clearest in mid-game transitions, while
            defensive structures remain your primary hurdle against high-ELO
            rivals.
          </p>
        </header>
        <div className="absolute top-0 right-0 p-8 size-fit flex justify-center items-center">
          <Swords className="size-42 fill-surfaceBright stroke-surfaceBright opacity-70" />
        </div>
      </section>
      <RivalSection
        title="Most Defeated"
        titleColor="text-primary"
        description="Opponents who struggle against your tactical patterns"
        rivals={mostDefeated}
        type="MOST_DEFEATED"
      />
      <RivalSection
        title="Biggest Nemeses"
        titleColor="text-tertiary"
        description="Rivals whose style currently counters yours"
        rivals={biggestNemeses}
        type="BIGGEST_NEMESES"
      />
    </>
  );
}
