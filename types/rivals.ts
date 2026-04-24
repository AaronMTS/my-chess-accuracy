export type RivalDetails = {
  id: number;
  imageUrl: string;
  username: string;
  rating: number;
  wins: number;
  draw: number;
  loss: number;
};

export type RivalType = "MOST_DEFEATED" | "BIGGEST_NEMESES";
