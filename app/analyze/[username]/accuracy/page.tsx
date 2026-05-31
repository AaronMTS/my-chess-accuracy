import OverallAccuracySection from "@/components/accuracy/overall-accuracy/OverallAccuracySection";
import GamesTable from "@/components/accuracy/analyzed-games-table/GamesTable";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getCleanUsername } from "@/util/validation";
import { notFound, redirect } from "next/navigation";
import { getQueryClient } from "@/providers/get-query-client";
import { getArchiveQueryOptions } from "@/util/query-options";

export default async function AccuracyPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const queryClient = getQueryClient();
  const { username } = await params;
  const cleanUsername = getCleanUsername(username);

  if (!cleanUsername) {
    redirect(`analyze`);
  }

  try {
    await queryClient.fetchQuery(getArchiveQueryOptions(cleanUsername));
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OverallAccuracySection username={cleanUsername} />
      <section className="bg-surface flex flex-col rounded-lg overflow-hidden">
        <GamesTable username={cleanUsername} />
      </section>
    </HydrationBoundary>
  );
}
