import { Games } from "@/types/games";

export default function GameMoves({
  moves,
  isHighlight = false,
}: {
  moves: Games["moves"];
  isHighlight?: boolean;
}) {
  let spanClasses =
    "px-2.5 py-1 bg-surfaceHighest text-onSurfaceLow text-xs rounded-full";

  if (isHighlight) {
    spanClasses = "flex text-onSurface text-sm";
  }

  let content = "N/A moves";
  if (moves) {
    content = `${moves} move${moves === 1 ? "" : "s"}`;
  }

  return (
    <span className={`${spanClasses} text-nowrap font-bold`}>{content}</span>
  );
}
