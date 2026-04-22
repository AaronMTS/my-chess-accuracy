import { spaceGrotesk } from "@/app/fonts";
import HeaderDesc from "../HeaderDesc";

export default function OverallAccuracy({
  overallAccuracy,
}: {
  overallAccuracy: number;
}) {
  return (
    <section className="flex gap-12 justify-between items-center p-6 bg-surface rounded-lg">
      <header>
        <HeaderDesc colorClass="text-onSurfaceLow">
          Technical Proficiency
        </HeaderDesc>
        <h2 className={spaceGrotesk.className}>Overall Accuracy</h2>
        <HeaderDesc colorClass="text-primary">
          Based on 1,248 games analyzed
        </HeaderDesc>
      </header>
      <div className="relative size-56">
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 480 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="240"
            cy="240"
            r="222"
            className="stroke-surfaceHighest"
            strokeWidth="28"
          />
          <circle
            cx="240"
            cy="240"
            r="222"
            className="stroke-primary"
            strokeWidth="28"
            strokeDasharray={2 * Math.PI * 222}
            strokeDashoffset={2 * Math.PI * 222 * (1 - 0.845)}
            strokeLinecap="round"
          />
        </svg>
        <h1
          className={`absolute top-1/2 left-1/2 -translate-1/2 ${spaceGrotesk.className} tracking-normal`}
        >
          {overallAccuracy.toFixed(1)}%
        </h1>
      </div>
    </section>
  );
}
