import { Games } from "@/types/games";

export type Player = {
  id: number;
  imageUrl: string;
  username: string;
  rating: number;
  accuracy: number;
  games: Games[];
};
