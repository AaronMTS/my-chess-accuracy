import OverallAccuracySection from "@/components/accuracy/overall-accuracy/OverallAccuracySection";
import GamesTable from "@/components/accuracy/analyzed-games-table/GamesTable";
import { getCleanUsername } from "@/util/validation";
import { redirect } from "next/navigation";

export default async function AccuracyPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const cleanUsername = getCleanUsername(username);

  if (!cleanUsername) {
    redirect(`analyze`);
  }

  return (
    <>
      <OverallAccuracySection username={cleanUsername} />
      <section className="bg-surface flex flex-col rounded-lg overflow-hidden">
        <GamesTable username={cleanUsername} />
      </section>
    </>
  );
}
