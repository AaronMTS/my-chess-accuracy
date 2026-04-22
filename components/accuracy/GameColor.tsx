const COLOR_CLASSES: { white: string; black: string } = {
  white: "bg-onSurface border-surface",
  black: "bg-black border-surfaceHighest",
};

export default function GameColor({ color }: { color: "white" | "black" }) {
  return (
    <div className="flex gap-1 items-center">
      <span
        className={`shrink-0 inline-block size-2.5 border ${COLOR_CLASSES[color]} rounded-full`}
      ></span>
      <span className="text-onSurfaceLow text-[10px] font-bold uppercase tracking-wide">
        {color}
      </span>
    </div>
  );
}
