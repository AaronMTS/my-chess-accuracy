import { Games } from "@/types/games";
import type { Game as ChessGame } from "@/types/returnedGames";
import { normalizeUsername } from "./strings";

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
  const moveSection = pgn
    .split(/\r?\n\r?\n/)
    .slice(1)
    .join(" ");
  const moveNumbers = [...moveSection.matchAll(/\b(\d+)\./g)].map((match) =>
    Number(match[1]),
  );

  if (moveNumbers.length > 0) {
    return moveNumbers[moveNumbers.length - 1];
  }

  return 0;
}

export default function mapChessGameToGame(
  game: ChessGame,
  username: string,
  id: number,
): Games {
  const normalizedUsername = normalizeUsername(username);
  const whiteName = normalizeUsername(game.white.username);
  const playerColor = whiteName === normalizedUsername ? "white" : "black";
  const opponent =
    playerColor === "white" ? game.black.username : game.white.username;
  const rating =
    playerColor === "white" ? game.white.rating : game.black.rating;
  const accuracy =
    playerColor === "white" ? game.accuracies!.white : game.accuracies!.black;
  const resultRaw =
    playerColor === "white" ? game.white.result : game.black.result;
  const result = resultRaw === "win" ? "win" : "loss";
  const tags = parsePgnTags(game.pgn);

  return {
    id,
    accuracy,
    opponent,
    color: playerColor,
    mode: game.time_class || tags.Event || "unknown",
    date: parseDateFromPgn(game.pgn, game),
    moves: parseMoveCount(game.pgn),
    rating,
    result,
  };
}
