import { ArrowDown, ArrowUp } from "lucide-react";
import { spaceGrotesk } from "@/app/fonts";

// const RATING_CHANGE_ICONS = {
//     win: <ArrowBigUp />,
//     loss: <ArrowBigDown />
// }

const RATING_CHANGE_ICONS = [
  <ArrowUp key="ratingUp" size={16} className="shrink-0 text-primary" />,
  <ArrowDown key="ratingDown" size={16} className="shrink-0 text-error" />,
];

export default function GameRating({ rating }: { rating: number }) {
  return (
    <div className="w-full flex gap-2 items-center">
      <span
        className={`${spaceGrotesk.className} text-sm font-bold tabular-nums`}
      >
        {rating}
      </span>
      {RATING_CHANGE_ICONS[rating % 2]}
    </div>
  );
}
