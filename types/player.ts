import { Games } from "@/types/games";
import { RivalDetails } from "./rivals";

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
  rivals: { totalRivals: number; filteredRivals: RivalDetails[] };
};
