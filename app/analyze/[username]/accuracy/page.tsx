import OverallAccuracySection from "@/components/accuracy/overall-accuracy/OverallAccuracySection";
import GamesTable from "@/components/accuracy/analyzed-games-table/GamesTable";
import { getCleanUsername } from "@/util/validation";

export default async function AccuracyPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username: rawUsername } = await params;
  const decodedUsername =
    typeof rawUsername === "string" ? decodeURIComponent(rawUsername) : "";
  const cleanUsername = getCleanUsername(decodedUsername);

  return (
    <>
      <OverallAccuracySection username={cleanUsername!} />
      <section className="bg-surface flex flex-col rounded-lg overflow-hidden">
        <GamesTable username={cleanUsername!} />
      </section>
    </>
  );
}
