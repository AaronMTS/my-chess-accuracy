export type Games = {
  id: number;
  accuracy: number;
  opponent: string;
  color: string;
  mode: string;
  date: string;
  moves: number;
  rating: number;
  result: "win" | "loss";
};

export type GamesOptionalId = Omit<Games, "id"> & {
  id?: number;
};
