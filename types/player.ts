import { Games, GamesOptionalAccuracy } from "@/types/games";

export type Player = {
  id: number;
  imageUrl: string;
  username: string;
  rating: number;
};

export type PlayerArchive = {
  accuracy: number;
  gamesWithAccuracy: Games[];
  gamesLength: number;
  gamesWithNoAccuracy: GamesOptionalAccuracy[];
};
