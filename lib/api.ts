import { Games } from "@/types/games";
import { Player } from "@/types/player";
import type {
  Game as ChessGame,
  Root as GamesArchiveRoot,
} from "@/types/returnedGames";

export const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.chess.com/pub/player/";

type ArchivesResponse = {
  archives: string[];
};

function parsePgnTags(pgn: string) {
  const tags: Record<string, string> = {};
  const tagRE = /^\[([^\s]+) "([^"]+)"\]$/gm;
  let match: RegExpExecArray | null;

  while ((match = tagRE.exec(pgn))) {
    tags[match[1]] = match[2];
  }

  return tags;
}

function parseDateFromPgn(pgn: string, game: ChessGame) {
  const tags = parsePgnTags(pgn);
  if (tags.Date) {
    return tags.Date.replace(/\./g, "-");
  }

  if (typeof game.end_time === "number") {
    return new Date(game.end_time * 1000).toISOString().split("T")[0];
  }

  return "";
}

function parseMoveCount(pgn: string) {
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

function normalizeUsername(name: string) {
  return name.trim().toLowerCase();
}

function mapChessGameToGame(
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

export async function fetchPlayer(
  username: string,
  signal?: AbortSignal,
): Promise<Player> {
  const cleanUsername = username.trim();
  if (!cleanUsername) {
    throw new Error("Username cannot be empty");
  }

  const profileUrl = `${BASE_URL}${cleanUsername}`;
  const statsUrl = `${BASE_URL}${cleanUsername}/stats`;
  const archivesUrl = `${BASE_URL}${cleanUsername}/games/archives`;

  const [profileRes, statsRes, archivesRes] = await Promise.all([
    fetch(profileUrl, { signal }),
    fetch(statsUrl, { signal }),
    fetch(archivesUrl, { signal }),
  ]);

  if (!profileRes.ok) {
    if (profileRes.status === 404) {
      throw new Error("Player not found");
    }
    throw new Error(`Failed to fetch player profile: ${profileRes.statusText}`);
  }

  if (!statsRes.ok) {
    throw new Error(`Failed to fetch player stats: ${statsRes.statusText}`);
  }

  if (!archivesRes.ok) {
    throw new Error(
      `Failed to fetch player game archives: ${archivesRes.statusText}`,
    );
  }

  const profileData = await profileRes.json();
  const statsData = await statsRes.json();
  const archivesData = (await archivesRes.json()) as ArchivesResponse;

  const ratingKeys = [
    "chess_daily",
    "chess_960daily",
    "chess960_daily",
    "chess_rapid",
    "chess_bullet",
    "chess_blitz",
  ] as const;

  let maxRating = 0;

  for (const key of ratingKeys) {
    const statsObj = statsData[key];
    if (statsObj && statsObj.last && typeof statsObj.last.rating === "number") {
      if (statsObj.last.rating > maxRating) {
        maxRating = statsObj.last.rating;
      }
    }
  }

  const archiveUrls = Array.isArray(archivesData.archives)
    ? archivesData.archives
    : [];

  const archiveResponses = await Promise.all(
    archiveUrls.map((url) => fetch(url, { signal })),
  );

  const archiveJson = await Promise.all(
    archiveResponses.map(async (response, index) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch archive ${archiveUrls[index]}: ${response.statusText}`,
        );
      }
      return response.json() as Promise<GamesArchiveRoot>;
    }),
  );

  const allGames = archiveJson.flatMap((archive) => archive.games ?? []);
  const analyzedGames = allGames.filter(
    (game) =>
      game.accuracies &&
      [
        normalizeUsername(game.white.username),
        normalizeUsername(game.black.username),
      ].includes(normalizeUsername(cleanUsername)),
  );

  const games = analyzedGames.map((game, index) =>
    mapChessGameToGame(game, cleanUsername, index + 1),
  );

  const overallAccuracy =
    games.length > 0
      ? games.reduce((sum, current) => sum + current.accuracy, 0) / games.length
      : 0;

  return {
    id: profileData.player_id,
    imageUrl: profileData.avatar || DEFAULT_AVATAR,
    username: profileData.username || cleanUsername,
    rating: maxRating,
    accuracy: overallAccuracy,
    games,
  };
}
