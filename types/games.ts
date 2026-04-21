export type DummyGames = {
  id: number;
  accuracy: number;
  opponent: string;
  color: string;
  mode: string;
  date: string;
  moves: number;
  rating: number;
};

export type DummyGamesOptionalId = Omit<DummyGames, "id"> & {
  id?: number;
};
