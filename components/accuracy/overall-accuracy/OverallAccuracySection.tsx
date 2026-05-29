import HeaderDesc from "../../HeaderDesc";
import HeaderEyebrow from "../../HeaderEyebrow";
import OverallAccuracyIndicator from "./OverallAccuracyIndicator";
import OverallAccuracy from "./OverallAccuracy";

export default function OverallAccuracySection({
  overallAccuracy,
}: {
  overallAccuracy: number;
}) {
  return (
    <section className="flex gap-12 flex-col justify-between items-center p-6 bg-surfaceLow rounded-lg md:flex-row">
      <header className="space-y-2 text-center md:text-left">
        <HeaderEyebrow>Technical Proficiency</HeaderEyebrow>
        <h2 className={`font-heading`}>Overall Accuracy</h2>
        <HeaderDesc colorClass="text-onSurfaceLow">
          Based on 1,248 games analyzed
        </HeaderDesc>
      </header>
      <div className="relative size-56">
        <OverallAccuracyIndicator accuracy={overallAccuracy} />
        <OverallAccuracy accuracyPercentage={overallAccuracy} />
      </div>
    </section>
  );
}
