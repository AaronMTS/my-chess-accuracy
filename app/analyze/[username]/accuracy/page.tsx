import OverallAccuracySection from "@/components/accuracy/overall-accuracy/OverallAccuracySection";
import GamesTable from "@/components/accuracy/analyzed-games-table/GamesTable";
import { getCleanUsername } from "@/util/validation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyChessAccuracy | Accuracy",
  description: "Track your overall accuracy across all analyzed games.",
};

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
