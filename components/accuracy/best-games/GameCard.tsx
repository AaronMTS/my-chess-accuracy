import { GamesWithFinalScore } from "@/types/games";
import { formatDate } from "@/util/date";
import GameAccuracy from "../analyzed-games-table/GameAccuracy";
import GameResult from "./GameResult";
import RatingDiff from "./RatingDiff";
import GameColor from "../analyzed-games-table/GameColor";
import GameMode from "../analyzed-games-table/GameMode";
import GameMoves from "../analyzed-games-table/GameMoves";
import Link from "next/link";

const TOP_ONE_STYLING = {
  bg: "bg-radial-[at_90%_10%] from-primary/15 to-surface to-40%",
  outline: "outline-primary/40",
};

type Props = {
  index: number;
  rankPillAddedClasses: string;
  Icon: React.ReactNode;
  gameDetails: GamesWithFinalScore;
  statsTitleClasses: string;
};

export default function GameCard({
  index,
  rankPillAddedClasses,
  Icon,
  gameDetails,
  statsTitleClasses,
}: Props) {
  const {
    date,
    accuracy,
    opponent,
    result,
    resultReason,
    playerRating,
    opponentRating,
    ratingDiff,
    color,
    mode,
    moves,
    url,
  } = gameDetails;

  return (
    <article
      className={`space-y-6 relative ${index === 0 ? TOP_ONE_STYLING.bg : "bg-surface"} p-6 outline ${index === 0 ? TOP_ONE_STYLING.outline : "outline-surfaceHigh"} rounded-lg transition-[translate,box-shadow] duration-250 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-6px] hover:shadow-primary/15`}
    >
      <div className="flex gap-4 items-center justify-between">
        <span
          className={`flex gap-1 px-2.5 py-0.75 items-center ${rankPillAddedClasses} text-xs font-headline font-medium tracking-wider rounded-full`}
        >
          {Icon}#{index + 1}
        </span>
        <small className="text-sm">{formatDate(new Date(date))}</small>
      </div>
      <div className="flex items-center gap-3 max-lg:justify-between">
        <GameAccuracy accuracy={accuracy} isHighlight />
        <div className="flex flex-col-reverse items-end gap-3 overflow-hidden lg:grow lg:flex-row lg:items-center">
          <span className="grow overflow-hidden max-lg:ps-1.5 max-lg:self-start">
            <p className="font-heading text-sm font-medium text-nowrap overflow-hidden text-ellipsis lg:text-base">
              vs. {opponent}
            </p>
          </span>
          {result && resultReason && (
            <GameResult result={result} resultReason={resultReason} />
          )}
        </div>
      </div>
      <div className="bg-surfaceHigh auto-grid-3/5 p-4 rounded">
        <p className="*:text-primary!">
          <span className={statsTitleClasses}>Your ELO</span>
          <br />
          <span className="flex text-sm font-bold">{playerRating}</span>
        </p>
        <p>
          <span className={statsTitleClasses}>Opp. ELO</span>
          <br />
          <span className="flex text-sm font-bold">{opponentRating}</span>
        </p>
        <RatingDiff titleStyling={statsTitleClasses} diff={ratingDiff} />
        <p>
          <span className={statsTitleClasses}>Color</span>
          <br />
          <GameColor color={color as "white" | "black"} isHighlight />
        </p>
        <p>
          <span className={statsTitleClasses}>Mode</span>
          <br />
          <GameMode mode={mode} isHighlight />
        </p>
        <p>
          <span className={statsTitleClasses}>Length</span>
          <br />
          <GameMoves moves={moves} isHighlight />
        </p>
      </div>
      <Link
        href={url}
        target="_blank"
        className="block w-full px-4 py-2.5 bg-surfaceHighest rounded font-heading text-xs text-center font-bold uppercase tracking-wider transition-colors hover:bg-primary/20 hover:text-primary"
      >
        View Game
      </Link>
    </article>
  );
}
