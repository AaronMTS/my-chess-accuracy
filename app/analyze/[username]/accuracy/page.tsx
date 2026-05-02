import { DUMMY_GAMES } from "@/util/dummy-games";

import OverallAccuracySection from "@/components/accuracy/overall-accuracy/OverallAccuracySection";
import GamesTable from "@/components/accuracy/analyzed-games-table/GamesTable";

const averageAccuracy =
  DUMMY_GAMES.reduce(
    (accumulator, current) => accumulator + current.accuracy,
    0,
  ) / DUMMY_GAMES.length;

export default function AccuracyPage() {
  return (
    <>
      <OverallAccuracySection overallAccuracy={averageAccuracy} />
      <section className="bg-surface flex flex-col rounded-lg overflow-hidden">
        <GamesTable />
      </section>
    </>
  );
}
