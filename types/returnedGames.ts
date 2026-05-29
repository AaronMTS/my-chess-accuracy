export interface Root {
  games: Game[];
}

export interface Game {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  accuracies?: Accuracies;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: White;
  black: Black;
  eco: string;
  start_time?: number;
}

export interface Accuracies {
  white: number;
  black: number;
}

export interface White {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
}

export interface Black {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
}
