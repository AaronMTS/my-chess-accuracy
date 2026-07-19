import Image from "next/image";

import { RivalDetails, RivalType } from "@/types/rivals";
import { Medal, Skull, Star, Trophy } from "lucide-react";
import WinOrLossCard from "./WinOrLossCard";

const MOST_DEFEATED_ICONS = [
  <Trophy
    key="mostDefeated"
    size={26}
    className="fill-primary/30 stroke-primary"
  />,
  <Medal
    key="2ndMostDefeated"
    size={24}
    className="fill-primary/30 stroke-primary opacity-90"
  />,
  <Star
    key="3rdMostDefeated"
    size={22}
    className="fill-primary/30 stroke-primary opacity-75"
  />,
];

const BIGGEST_NEMESES_ICONS = [
  <Skull
    key="biggestNemesis"
    size={26}
    className="fill-error/30 stroke-error"
  />,
  <Skull
    key="2ndBiggestNemesis"
    size={24}
    className="fill-error/30 stroke-error opacity-90"
  />,
  <Skull
    key="3rdBiggestNemesis"
    size={22}
    className="fill-error/30 stroke-error opacity-75"
  />,
];

export default function RivalCard({
  type,
  rival,
  index,
}: {
  type: RivalType;
  rival: RivalDetails;
  index: number;
}) {
  const roundedWinRate = Math.round(rival.winRate);
  const clampedWinRate = Math.max(0, Math.min(100, roundedWinRate));

  return (
    <div className="space-y-4.5 bg-surfaceHigher p-6 rounded-2xl">
      <div className="flex gap-3">
        <span className="shrink-0 inline-block ring-2 ring-primary/20 rounded-xl overflow-hidden">
          <Image
            src={rival.imageUrl}
            height={64}
            width={64}
            alt={`Profile picture of ${rival.username}`}
          />
        </span>
        <span className="grow self-center-safe overflow-hidden">
          <h5
            className={`font-heading overflow-hidden text-ellipsis`}
            title={rival.username}
          >
            {rival.username}
          </h5>
          <small
            className={`bg-surfaceLowest px-2 py-1 ${
              type === "BIGGEST_NEMESES" ? "text-error" : ""
            } text-xs font-mono tracking-wide rounded-sm`}
          >
            {rival.rating || "UNKNOWN"} ELO
          </small>
        </span>
        <span>
          {type === "MOST_DEFEATED"
            ? MOST_DEFEATED_ICONS[index]
            : BIGGEST_NEMESES_ICONS[index]}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <small className="text-xs text-onSurfaceLow font-bold tracking-wider">
            WIN RATE
          </small>
          <small
            className={`${
              type === "MOST_DEFEATED" ? "text-primary" : "text-error"
            } font-bold tracking-wider`}
          >
            {roundedWinRate}%
          </small>
        </div>
        <div className="rounded-full overflow-hidden h-fit w-full">
          <svg
            className="h-2 w-full"
            viewBox="0 0 100 3"
            preserveAspectRatio="none"
          >
            <rect
              x="0"
              y="0"
              width="100"
              height="3"
              rx="1.5"
              className="fill-surfaceLowest"
            />
            <rect
              x="0"
              y="0"
              width={clampedWinRate}
              height="3"
              rx="1.5"
              className={
                type === "MOST_DEFEATED" ? "fill-primary" : "fill-error"
              }
            />
          </svg>
        </div>
      </div>
      <div className="grid gap-4.5 grid-cols-2">
        <WinOrLossCard
          result="win"
          amount={rival.wins}
          withTextColor={type === "MOST_DEFEATED"}
        />
        <WinOrLossCard
          result="loss"
          amount={rival.loss}
          withTextColor={type === "BIGGEST_NEMESES"}
        />
      </div>
      <p className="text-xs text-slate-400 text-center">
        <span className="font-medium">Draws:</span>{" "}
        <span className="font-bold">{rival.draw}</span>
      </p>
    </div>
  );
}
