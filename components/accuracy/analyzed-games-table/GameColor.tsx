const COLOR_CLASSES: { white: string; black: string } = {
  white: "bg-onSurface border-surface",
  black: "bg-black border-onSurface/40",
};

export default function GameColor({
  color,
  isHighlight = false,
}: {
  color: "white" | "black";
  isHighlight?: boolean;
}) {
  let indicatorSizeClass = "size-2.5";
  let labelClasses = "text-[10px] text-onSurfaceLow uppercase";

  if (isHighlight) {
    indicatorSizeClass = "size-3";
    labelClasses = "text-sm text-onSurface capitalize";
  }

  return (
    <span className="flex gap-1 items-center">
      <span
        className={`shrink-0 inline-block ${indicatorSizeClass} border ${COLOR_CLASSES[color]} rounded-full`}
      ></span>
      <span className={`${labelClasses} font-bold tracking-wide`}>{color}</span>
    </span>
  );
}
