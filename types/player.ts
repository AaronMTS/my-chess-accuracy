import { Games } from "@/types/games";

export type Player = {
  id: number;
  imageUrl: string;
  username: string;
  rating: number;
};

export type PlayerArchive = {
  accuracy: number;
  games: Games[];
  gamesLength: number;
};
