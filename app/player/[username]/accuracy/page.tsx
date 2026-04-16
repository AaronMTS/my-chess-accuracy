import { ListFilter } from "lucide-react";

import { spaceGrotesk } from "@/app/fonts";
import Navbar from "@/components/Navbar";
import OverallAccuracy from "@/components/accuracy/OverallAccuracy";
import HeaderDesc from "@/components/HeaderDesc";
import SecondaryButton from "@/components/SecondaryButton";

type DummyGames = {
  id: number;
  accuracy: number;
  opponent: string;
  color: string;
  mode: string;
  date: string;
  moves: number;
  rating: number;
};

type DummyGamesOptionalId = Omit<DummyGames, "id"> & {
  id?: number;
};

const DUMMY_GAMES: DummyGames[] = [
  {
    id: 167026850530,
    accuracy: 92.4,
    opponent: "Hikarudddddddddddddddddddddddddd",
    color: "white",
    mode: "Rapid",
    date: "Oct. 24, 2023",
    moves: 42,
    rating: 2842,
  },
  {
    id: 167026850531,
    accuracy: 80,
    opponent: "Magnus",
    color: "black",
    mode: "Blitz",
    date: "Oct. 28, 2023",
    moves: 26,
    rating: 2812,
  },
  {
    id: 167026850532,
    accuracy: 74.1,
    opponent: "Judit",
    color: "white",
    mode: "Bullet",
    date: "Oct. 31, 2023",
    moves: 29,
    rating: 2830,
  },
];

const DUMMY_COLUMNS = Object.keys(DUMMY_GAMES[0]);
DUMMY_COLUMNS.shift();

export default function AccuracyPage() {
  return (
    <div className="space-y-4 grow max-h-dvh bg-slate-950 overflow-auto">
      <Navbar />
      <main className="space-y-6 px-6">
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
          <table className="w-full table-fixed">
            <thead>
              <tr>
                {DUMMY_COLUMNS.map((column) => (
                  <th key={column} className="capitalize">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DUMMY_GAMES.map((game) => {
                const updatedGame: DummyGamesOptionalId = { ...game };
                const gameId = updatedGame.id;
                delete updatedGame.id;

                return (
                  <tr key={gameId}>
                    {Object.values(updatedGame).map((value) => (
                      <td key={value}>{value}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
