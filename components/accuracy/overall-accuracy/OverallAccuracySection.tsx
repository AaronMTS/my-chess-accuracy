"use client";

import HeaderDesc from "../../HeaderDesc";
import HeaderEyebrow from "../../HeaderEyebrow";
import OverallAccuracyIndicator from "./OverallAccuracyIndicator";
import OverallAccuracy from "./OverallAccuracy";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getArchiveQueryOptions } from "@/util/query-options";
import { getUserFacingErrorMessage } from "@/util/errors";

export default function OverallAccuracySection({
  username,
}: {
  username: string;
}) {
  const { data, isError, error } = useSuspenseQuery(
    getArchiveQueryOptions(username),
  );

  if (isError) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center text-red-200">
        <p className="font-semibold">We couldn’t load the accuracy summary.</p>
        <p className="mt-2 text-sm">{getUserFacingErrorMessage(error)}</p>
      </div>
    );
  }

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
