"use client";

import OverallAccuracySection from "@/components/accuracy/overall-accuracy/OverallAccuracySection";
import GamesTable from "@/components/accuracy/analyzed-games-table/GamesTable";
import { usePlayerDetails } from "@/hooks/usePlayerDetail";
import { motion } from "motion/react";
import { useMemo } from "react";

export default function AccuracyPage() {
  const { data: player } = usePlayerDetails();
  const gamesLength = useMemo(() => player?.games.length, [player]);

  if (!player) {
    return (
      <motion.div
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
        className="size-full flex flex-col gap-8"
      >
        <div className="shrink-0 h-[35%] bg-surfaceLow rounded-lg"></div>
        <div className="grow bg-surfaceLow rounded-lg"></div>
      </motion.div>
    );
  }

  return (
    <>
      <OverallAccuracySection
        overallAccuracy={player.accuracy}
        totalGames={gamesLength!}
      />
      <section className="bg-surface flex flex-col rounded-lg overflow-hidden">
        <GamesTable games={player.games} />
      </section>
    </>
  );
}
