import { spaceGrotesk } from "@/app/fonts";

export default function GameAccuracy({ accuracy }: { accuracy: number }) {
  let additionalClasses: string;

  if (accuracy >= 90) {
    additionalClasses =
      "bg-primaryContainer text-primary border border-primary/20";
  } else if (accuracy >= 75) {
    additionalClasses =
      "bg-secondaryContainer/20 text-secondary border border-secondary/20";
  } else {
    additionalClasses =
      "bg-errorContainer/20 text-error border border-error/20";
  }

  return (
    <div
      className={`w-fit p-1 ${spaceGrotesk.className} ${additionalClasses} text-sm font-semibold rounded-lg tabular-nums tracking-tighter`}
    >
      {accuracy.toFixed(1)}%
    </div>
  );
}
