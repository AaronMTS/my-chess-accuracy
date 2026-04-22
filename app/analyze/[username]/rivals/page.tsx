import Image from "next/image";

import { spaceGrotesk } from "@/app/fonts";
import { Medal, Star, Swords, Trophy } from "lucide-react";
import WinOrLossCard from "@/components/rivals/WinOrLossCard";
import HeaderEyebrow from "@/components/HeaderEyebrow";

const DUMMY_TOP_DEFEATED = [
  {
    id: 3894387564,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "Alexei_88",
    rating: 2304,
    wins: 35,
    draw: 2,
    loss: 6,
  },
  {
    id: 3894387534,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "GM_V",
    rating: 2504,
    wins: 19,
    draw: 1,
    loss: 4,
  },
  {
    id: 3894387064,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc",
    username: "TheFishermannnnnnnn",
    rating: 2091,
    wins: 15,
    draw: 0,
    loss: 7,
  },
];

const MOST_DEFEATED_ICONS = [
  <Trophy key="topDefeated" className="fill-primary/30 stroke-primary" />,
  <Medal key="2ndMostDefeated" className="fill-primary/30 stroke-primary" />,
  <Star key="3rdMostDefeated" className="fill-primary/30 stroke-primary" />,
];

export default function RivalsPage() {
  return (
    <>
      <section className="relative p-8 flex gap-12 justify-between bg-surfaceLow rounded-2xl">
        <header className="relative z-10 space-y-4 lg:w-3/4">
          <HeaderEyebrow>Competitive Landscape</HeaderEyebrow>
          <h1 className={spaceGrotesk.className}>
            Your Strategic <em className="text-primary">Nemesis</em> Map
          </h1>
          <p>
            Analyzing 1,248 matches across 89 unique opponents. Your dominance
            is clearest in mid-game transitions, while defensive structures
            remain your primary hurdle against high-ELO rivals.
          </p>
        </header>
        <div className="absolute top-0 right-0 p-8 size-fit flex justify-center items-center">
          <Swords className="size-42 fill-surfaceBright stroke-surfaceBright opacity-70" />
        </div>
      </section>
      <section className="space-y-4">
        <header>
          <h4 className={`${spaceGrotesk.className} text-primary`}>
            Most Defeated
          </h4>
          <p className="text-sm">
            Opponents who struggle against your tactical patterns
          </p>
        </header>
        <hr className="border-surfaceHigh" />
        <div className="grid gap-4 grid-cols-3">
          {DUMMY_TOP_DEFEATED.map((rival, index) => {
            const winPercentage = Math.round(
              (rival.wins / (rival.wins + rival.draw + rival.loss)) * 100,
            );

            return (
              <div
                key={rival.id}
                className="space-y-4.5 bg-surfaceHigh p-6 rounded-2xl"
              >
                <div className="flex gap-3">
                  <span className="shrink-0 inline-block ring-2 ring-primary/20 rounded-xl overflow-hidden">
                    <Image
                      src={rival.image}
                      height={64}
                      width={64}
                      alt={`Profile picture of ${rival.username}`}
                    />
                  </span>
                  <span className="grow self-center-safe overflow-hidden">
                    <h5
                      className={`${spaceGrotesk.className} overflow-hidden text-ellipsis`}
                    >
                      {rival.username}
                    </h5>
                    <small className="bg-surfaceLowest px-2 py-1 text-xs font-mono tracking-wide rounded-sm">
                      {rival.rating} ELO
                    </small>
                  </span>
                  <span className="ps-4">{MOST_DEFEATED_ICONS[index]}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <small className="text-xs text-onSurfaceLow font-semibold tracking-wide">
                      WIN RATE
                    </small>
                    <small>{winPercentage}%</small>
                  </div>
                  <div className="rounded-full overflow-hidden">
                    <svg viewBox="0 0 100 3">
                      <line
                        x1="0"
                        y1="1.5"
                        x2="100"
                        y2="1.5"
                        className="stroke-surfaceLowest"
                        strokeWidth={3}
                        strokeLinecap="round"
                      />
                      <line
                        x1="0"
                        y1="1.5"
                        x2="100"
                        y2="1.5"
                        className="stroke-primary"
                        strokeWidth={3}
                        strokeDasharray={100}
                        strokeDashoffset={100 - winPercentage}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid gap-4.5 grid-cols-2">
                  <WinOrLossCard result="win" amount={rival.wins} />
                  <WinOrLossCard result="loss" amount={rival.loss} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
