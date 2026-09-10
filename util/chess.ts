import {
  CombinedChessResults,
  drawResultsReason,
  Games,
  GamesOptionalAccuracy,
  losingResultsReason,
} from "@/types/games";
import type { ReturnedGame as ChessGame } from "@/types/returnedGames";
import { normalizeUsername } from "./strings";

export const isDraw = (result: string) =>
  ([...drawResultsReason, "draw"] as readonly string[]).includes(result);
export const isLoss = (result: string) =>
  ([...losingResultsReason, "lost"] as readonly string[]).includes(result);

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
  if (typeof game.end_time === "number") {
    return new Date(game.end_time * 1000).toISOString().split("T")[0];
  }

  const tags = parsePgnTags(pgn);
  if (tags.Date) {
    return tags.Date.replace(/\./g, "-");
  }

  return "";
}

export function parseMoveCount(pgn: string) {
  if (!pgn) {
    return undefined;
  }

  let lastMoveRegex =
    /\d+\.{1,3}\s[\w\d+#=-]+\s{\[%clk\s[\d:\.]+\]}\s(?:1|0|1\/2)-(?:1|0|1\/2)/;

  if (!/%clk/.test(pgn)) {
    lastMoveRegex =
      /\d+\.\s[A-Za-z0-9=-]+[+#]?\s?[A-Za-z0-9=-]+?[+#]?\s(?:1|0|1\/2)-(?:1|0|1\/2)/;
  }

  const lastMove = pgn.match(lastMoveRegex);

  if (lastMove) {
    return +lastMove[0].split(".")[0];
  }
}

function parseWinner(pgn: string): "white" | "black" | null | undefined {
  // if (/\[Black "KomodoChess"]\\n\[Result "1\/2\-1\/2"]/.test(pgn)) {
  //   console.log(pgn);
  // }

  if (!pgn) return undefined;

  const resultString = pgn.match(/Result\s"(?:1|0|1\/2)-(?:1|0|1\/2)"/);
  const whiteWonRegex = /1-0/;
  const blackWonRegex = /0-1/;
  const drawRegex = /1\/2-1\/2/;

  if (!resultString) return undefined;

  if (whiteWonRegex.test(resultString![0])) return "white";

  if (blackWonRegex.test(resultString![0])) return "black";

  if (drawRegex.test(resultString![0])) return null;
}

export default function mapChessGameToGame<
  T extends Games | GamesOptionalAccuracy = GamesOptionalAccuracy,
>(game: ChessGame, username: string): T {
  const gameUrl = game.url;

  const normalizedUsername = normalizeUsername(username);
  const whiteName = normalizeUsername(game.white.username);
  const playerColor = whiteName === normalizedUsername ? "white" : "black";

  if (game.end_time === 1452102080) {
    console.log(game.pgn);
  }

  const winner = parseWinner(game.pgn);

  let opponent;
  let playerRating;
  let opponentRating;
  let result: Games["result"] = undefined;
  let resultReason: Games["resultReason"] = undefined;

  if (winner === null) {
    result = "draw";
    resultReason = game.white.result as CombinedChessResults;
  }

  if (playerColor === "white") {
    opponent = game.black.username;
    playerRating = game.white.rating;
    opponentRating = game.black.rating;
    if (winner !== null) {
      result = winner === "white" ? "win" : "lost";
      resultReason =
        winner === "white"
          ? (game.black.result as CombinedChessResults)
          : (game.white.result as CombinedChessResults);
    }
  } else {
    opponent = game.white.username;
    playerRating = game.black.rating;
    opponentRating = game.white.rating;
    if (winner !== null) {
      result = winner === "black" ? "win" : "lost";
      resultReason =
        winner === "black"
          ? (game.white.result as CombinedChessResults)
          : (game.black.result as CombinedChessResults);
    }
  }

  const tags = parsePgnTags(game.pgn);
  const rawMode = game.time_class || tags.Event || "unknown";
  const mode: Games["mode"] = ["bullet", "blitz", "rapid", "daily"].includes(
    rawMode,
  )
    ? (rawMode as Games["mode"])
    : "unknown";

  const gameObj: GamesOptionalAccuracy = {
    id: game.uuid,
    url: gameUrl,
    opponent,
    color: playerColor,
    mode,
    date: parseDateFromPgn(game.pgn, game),
    moves: parseMoveCount(game.pgn) || null,
    playerRating,
    opponentRating,
    result,
    resultReason,
  };

  if (game.accuracies) {
    const accuracy =
      playerColor === "white" ? game.accuracies.white : game.accuracies.black;

    gameObj.accuracy = accuracy;
  }

  return gameObj as T;
}
