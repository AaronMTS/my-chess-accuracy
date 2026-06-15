import { ChessResult, Games, GamesOptionalAccuracy } from "@/types/games";
import type { ReturnedGame as ChessGame } from "@/types/returnedGames";
import { normalizeUsername } from "./strings";

export const drawResults = [
  "agreed",
  "repetition",
  "stalemate",
  "insufficient",
  "timevsinsufficient",
  "50move",
] as const;

export const losingResults = [
  "checkmated",
  "resigned",
  "timeout",
  "abandoned",
  "lose",
  "loss",
] as const;

export const isDraw = (result: string) =>
  (drawResults as readonly string[]).includes(result);
export const isLoss = (result: string) =>
  (losingResults as readonly string[]).includes(result);

export function parsePgnTags(pgn: string) {
  const tags: Record<string, string> = {};
  const tagRE = /^\[([^\s]+) "([^"]+)"\]$/gm;
  let match: RegExpExecArray | null;

  while ((match = tagRE.exec(pgn))) {
    tags[match[1]] = match[2];
  }

  return tags;
}

export function parseDateFromPgn(pgn: string, game: ChessGame) {
  const tags = parsePgnTags(pgn);
  if (tags.Date) {
    return tags.Date.replace(/\./g, "-");
  }

  if (typeof game.end_time === "number") {
    return new Date(game.end_time * 1000).toISOString().split("T")[0];
  }

  return "";
}

export function parseMoveCount(pgn: string) {
  if (!pgn) {
    return undefined;
  }

  const lastMoveRegex =
    /\d+\.{1,3}\s[\w\d+#=-]+\s{\[%clk\s[\d:\.]+\]}\s(?:1|0|1\/2)-(?:1|0|1\/2)/;
  const lastMove = pgn.match(lastMoveRegex);

  if (lastMove) {
    return +lastMove[0].split(".")[0];
  }
}

export default function mapChessGameToGame<
  T extends Games | GamesOptionalAccuracy = GamesOptionalAccuracy,
>(game: ChessGame, username: string): T {
  const normalizedUsername = normalizeUsername(username);
  const whiteName = normalizeUsername(game.white.username);
  const playerColor = whiteName === normalizedUsername ? "white" : "black";
  const opponent =
    playerColor === "white" ? game.black.username : game.white.username;
  const rating =
    playerColor === "white" ? game.white.rating : game.black.rating;
  const result = (
    playerColor === "white" ? game.white.result : game.black.result
  ) as ChessResult;
  const tags = parsePgnTags(game.pgn);

  const gameObj: GamesOptionalAccuracy = {
    id: game.uuid,
    opponent,
    color: playerColor,
    mode: game.time_class || tags.Event || "unknown",
    date: parseDateFromPgn(game.pgn, game),
    moves: parseMoveCount(game.pgn) || "N/A",
    rating,
    result,
  };

  if (game.accuracies) {
    const accuracy =
      playerColor === "white" ? game.accuracies.white : game.accuracies.black;

    gameObj.accuracy = accuracy;
  }

  return gameObj as T;
}
