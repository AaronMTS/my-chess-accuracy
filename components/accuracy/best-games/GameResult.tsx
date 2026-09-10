import { CombinedChessResults, MainChessResults } from "@/types/games";

const WIN_STYLING = "bg-primary/20 text-primary";
const LOSS_STYLING = "bg-error/20 text-error";

export default function GameResult({
  result,
  resultReason,
}: {
  result: MainChessResults;
  resultReason: CombinedChessResults;
}) {
  let classes = "bg-surfaceHighest text-onSurfaceLow";

  if (result === "win") {
    classes = WIN_STYLING;
  }

  if (result === "lost") {
    classes = LOSS_STYLING;
  }

  return (
    <span
      className={`${classes} p-1.5 text-xs font-heading font-bold tracking-wide uppercase text-nowrap rounded-sm`}
    >
      {result} &bull; {resultReason}
    </span>
  );
}
