import { ListFilter } from "lucide-react";

import { spaceGrotesk } from "@/app/fonts";
import { DummyGames } from "@/types/games";

import Navbar from "@/components/Navbar";
import OverallAccuracy from "@/components/accuracy/OverallAccuracy";
import HeaderDesc from "@/components/HeaderDesc";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import GamesTableBody from "@/components/accuracy/GamesTableBody";
import { getCellPadding } from "@/util/table";

const DUMMY_GAMES: DummyGames[] = [
  {
    id: 167026850530,
    accuracy: 92.4,
    opponent: "Hikaruddddddddddddddddddd",
    color: "white",
    mode: "rapid",
    date: "Oct. 24, 2023",
    moves: 42,
    rating: 2842,
  },
  {
    id: 167026850531,
    accuracy: 80,
    opponent: "Magnus",
    color: "black",
    mode: "blitz",
    date: "Oct. 28, 2023",
    moves: 26,
    rating: 2812,
  },
  {
    id: 167026850532,
    accuracy: 74.1,
    opponent: "Judit",
    color: "white",
    mode: "bullet",
    date: "Oct. 31, 2023",
    moves: 29,
    rating: 2830,
  },
];

const DUMMY_COLUMNS = Object.keys(DUMMY_GAMES[0]);
DUMMY_COLUMNS.shift();
const DUMMY_COLUMNS_LENGTH = DUMMY_COLUMNS.length;

export default function AccuracyPage() {
  return (
    <div className="space-y-4 grow max-h-dvh bg-slate-950 overflow-auto">
      <Navbar />
      <main className="space-y-6 max-w-5xl mx-auto px-6">
        <OverallAccuracy />
        <section className="bg-surface rounded-lg overflow-hidden">
          <header className="flex justify-between items-center p-6 bg-surfaceHigh/50">
            <div>
              <h4 className={spaceGrotesk.className}>Analyzed Games</h4>
              <HeaderDesc colorClass="text-onSurfaceLow">
                Full Session History
              </HeaderDesc>
            </div>
            <SecondaryButton sizeClass="size-8" paddingClasses="p-2">
              <ListFilter size={16} />
            </SecondaryButton>
          </header>
          <table className="w-full table-fixed border-collapse text-left">
            <thead>
              <tr
                className={`${spaceGrotesk.className} text-[10px] text-onSurfaceLow tracking-widest`}
              >
                {DUMMY_COLUMNS.map((column, index) => {
                  const pxClasses = getCellPadding(index, DUMMY_COLUMNS_LENGTH);

                  return (
                    <th
                      key={column}
                      className={`${column === "opponent" ? "w-1/5" : column === "date" ? "w-1/7" : "w-auto"} ${pxClasses} pt-5 pb-2.5 uppercase`}
                    >
                      {column}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <GamesTableBody games={DUMMY_GAMES} />
          </table>
        </section>
      </main>
    </div>
  );
}
