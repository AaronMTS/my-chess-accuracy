import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";

import { spaceGrotesk } from "@/app/fonts";
import { DummyGames } from "@/types/games";

import OverallAccuracy from "@/components/accuracy/OverallAccuracySection";
import HeaderDesc from "@/components/HeaderDesc";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import GamesTableBody from "@/components/accuracy/GamesTableBody";
import { getCellPadding } from "@/util/table";
import TableNavButton from "@/components/buttons/TableNavButton";

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
  {
    id: 167026850533,
    accuracy: 76.1,
    opponent: "Juditasd",
    color: "black",
    mode: "bullet",
    date: "Oct. 21, 2023",
    moves: 39,
    rating: 2700,
  },
  {
    id: 167026850534,
    accuracy: 99,
    opponent: "Mangus",
    color: "black",
    mode: "blitz",
    date: "Oct. 28, 2023",
    moves: 26,
    rating: 2812,
  },
];

const DUMMY_COLUMNS = Object.keys(DUMMY_GAMES[0]);
DUMMY_COLUMNS.shift();
const DUMMY_COLUMNS_LENGTH = DUMMY_COLUMNS.length;

export default function AccuracyPage() {
  return (
    <>
      <OverallAccuracy overallAccuracy={87.56} />
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
        <nav className="flex justify-between items-center bg-surfaceHigh/50 p-6">
          <span className="text-xs">Showing 5 of 1,248 games</span>
          <span className="space-x-2">
            <TableNavButton disabled>
              <ChevronLeft size={20} />
            </TableNavButton>
            <TableNavButton>
              <ChevronRight size={20} />
            </TableNavButton>
          </span>
        </nav>
      </section>
    </>
  );
}
