"use client";

import { Games, GamesWithFinalScore } from "@/types/games";
import { getArchiveQueryOptions } from "@/util/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import HeaderDesc from "../../HeaderDesc";
import { Medal, Star, Trophy, type LucideIcon } from "lucide-react";
import GameCard from "./GameCard";

const REFERENCE_MAX_MOVES = 65;
const ACCURACY_WEIGHT = 0.7;
const LENGTH_WEIGHT = 0.3;

const TOP_THREE_ICONS: LucideIcon[] = [Trophy, Medal, Star];
const TOP_THREE_PILLS_STYLING = [
  { container: "bg-primary text-surface", icon: "fill-primaryContainer" },
  {
    container: "bg-surfaceHighest text-secondary",
    icon: "fill-secondaryContainer",
  },
  {
    container: "bg-surfaceHighest text-onSurface",
    icon: "fill-onSurfaceLower",
  },
];

const STATS_TITLE_CLASSES =
  "text-xs font-headline text-onSurfaceLower font-medium uppercase tracking-wider";

function calculateFinalScore(
  returnedAccuracy: number,
  moveCount: number,
  opponentRating: number,
  playerRating: number,
): { finalScore: number; ratingDiff: number } {
  const lengthScore =
    ((Math.tanh((moveCount / REFERENCE_MAX_MOVES) * 8 - 2.75) + 1) / 2) *
    LENGTH_WEIGHT;

  const accuracyScore = (returnedAccuracy / 100) * ACCURACY_WEIGHT;

  const ratingDiff = opponentRating - playerRating;
  const difficultyFactor = 0.9 + 0.2 * (1 - 1 / (1 + 10 ** (ratingDiff / 400)));

  const finalScore = (
    (lengthScore + accuracyScore) *
    100 *
    difficultyFactor
  ).toFixed(1);

  return { finalScore: +finalScore, ratingDiff };
}

export default function BestGamesMainWrapper({
  username,
}: {
  username: string;
}) {
  const { data } = useSuspenseQuery(getArchiveQueryOptions(username));

  const { gamesWithAccuracy } = data;
  const sortedGamesWithFinalScore = gamesWithAccuracy
    .map((game: Games) => {
      const { finalScore, ratingDiff } = calculateFinalScore(
        game.accuracy,
        game.moves || 0,
        game.opponentRating,
        game.playerRating,
      );

      return {
        ...game,
        finalScore,
        ratingDiff,
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);

  return (
    <section className="space-y-4">
      <header className="space-y-0.5">
        <h3 className="font-heading text-nowrap">Your Best Games</h3>
        <HeaderDesc colorClass="text-onSurfaceLower">
          Based on Game Accuracy, Move Count, and Rating Difference
        </HeaderDesc>
      </header>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(325px,1fr))] gap-6">
        {sortedGamesWithFinalScore
          .slice(0, 3)
          .map((game: GamesWithFinalScore, index) => {
            const Icon = TOP_THREE_ICONS[index];

            return (
              <GameCard
                key={game.id}
                index={index}
                rankPillAddedClasses={TOP_THREE_PILLS_STYLING[index].container}
                Icon={
                  <Icon
                    className={TOP_THREE_PILLS_STYLING[index].icon}
                    size={12}
                  />
                }
                gameDetails={game}
                statsTitleClasses={STATS_TITLE_CLASSES}
              />
            );
          })}
      </div>
    </section>
  );
}
