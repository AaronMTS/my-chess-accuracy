"use client";

import HeaderDesc from "../../HeaderDesc";
import HeaderEyebrow from "../../HeaderEyebrow";
import OverallAccuracyIndicator from "./OverallAccuracyIndicator";
import OverallAccuracy from "./OverallAccuracy";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchArchive } from "@/lib/api";

export default function OverallAccuracySection({
  username,
}: {
  username: string;
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["archive", username.toLowerCase()],
    queryFn: ({ signal }: { signal: AbortSignal | undefined }) =>
      fetchArchive(username, signal),
  });

  return (
    <section className="flex gap-12 flex-col justify-between items-center p-6 bg-surfaceLow rounded-lg md:flex-row">
      <header className="space-y-2 text-center md:text-left">
        <HeaderEyebrow>Technical Proficiency</HeaderEyebrow>
        <h2 className={`font-heading`}>Overall Accuracy</h2>
        <HeaderDesc colorClass="text-onSurfaceLow">
          Based on {data.gamesLength} games analyzed
        </HeaderDesc>
      </header>
      <div className="relative size-56">
        <OverallAccuracyIndicator accuracy={data.accuracy} />
        <OverallAccuracy accuracyPercentage={data.accuracy} />
      </div>
    </section>
  );
}
