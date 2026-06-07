import { ChessResult } from "@/types/games";
import { isDraw, isLoss } from "@/util/chess";
import { ArrowDown, ArrowUp, Equal } from "lucide-react";

const RATING_CHANGE_ICONS = {
  win: <ArrowUp key="ratingUp" size={16} className="shrink-0 text-primary" />,
  draw: <Equal key="draw" size={16} className="shrink-0 text-onSurfaceLow" />,
  loss: (
    <ArrowDown key="ratingDown" size={16} className="shrink-0 text-error" />
  ),
};

export default function GameRating({
  rating,
  result,
}: {
  rating: number;
  result: ChessResult;
}) {
  let mappedResult: keyof typeof RATING_CHANGE_ICONS = "win";
  if (isDraw(result)) {
    mappedResult = "draw";
  } else if (isLoss(result)) {
    mappedResult = "loss";
  }

  return (
    <div className="w-full flex gap-2 items-center">
      <span className={`font-heading text-sm font-bold tabular-nums`}>
        {rating}
      </span>
      {RATING_CHANGE_ICONS[mappedResult]}
    </div>
  );
}
