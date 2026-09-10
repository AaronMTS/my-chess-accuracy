export type MainChessResults = "win" | "draw" | "lost";

export const drawResultsReason = [
  "agreed",
  "repetition",
  "stalemate",
  "insufficient",
  "timevsinsufficient",
  "50move",
] as const;

export const losingResultsReason = [
  "checkmated",
  "resigned",
  "timeout",
  "abandoned",
  "lose",
  "loss",
] as const;

export type CombinedChessResults =
  | (typeof drawResultsReason)[number]
  | (typeof losingResultsReason)[number];

export type Games = {
  id: string | number;
  url: string;
  accuracy: number;
  opponent: string;
  color: string;
  mode: "bullet" | "blitz" | "rapid" | "daily" | "unknown";
  date: string;
  moves: number | null;
  playerRating: number;
  opponentRating: number;
  result: MainChessResults | undefined;
  resultReason: CombinedChessResults | undefined;
};

export type GamesWithFinalScore = Games & {
  finalScore: number;
  ratingDiff: number;
};

export type GamesOptionalId = Omit<Games, "id"> & {
  id?: string | number;
};

export type GamesOptionalAccuracy = Omit<Games, "accuracy"> &
  Partial<Pick<Games, "accuracy">>;
