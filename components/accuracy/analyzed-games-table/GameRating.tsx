import { ArrowDown, ArrowUp } from "lucide-react";

const RATING_CHANGE_ICONS = {
  win: <ArrowUp key="ratingUp" size={16} className="shrink-0 text-primary" />,
  loss: (
    <ArrowDown key="ratingDown" size={16} className="shrink-0 text-error" />
  ),
};

export default function GameRating({
  rating,
  result,
}: {
  rating: number;
  result: "win" | "loss";
}) {
  return (
    <div className="w-full flex gap-2 items-center">
      <span className={`font-heading text-sm font-bold tabular-nums`}>
        {rating}
      </span>
      {RATING_CHANGE_ICONS[result]}
    </div>
  );
}
