import { drawResults, losingResults } from "@/util/chess";

export type ChessResult =
  | (typeof drawResults)[number]
  | (typeof losingResults)[number]
  | "win";

export type Games = {
  id: string | number;
  accuracy: number;
  opponent: string;
  color: string;
  mode: string;
  date: string;
  moves: number;
  rating: number;
  result: ChessResult;
};

export type GamesOptionalId = Omit<Games, "id"> & {
  id?: string | number;
};

export type GamesOptionalAccuracy = Omit<Games, "accuracy"> &
  Partial<Pick<Games, "accuracy">>;
