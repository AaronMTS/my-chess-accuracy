import { Player, PlayerArchive } from "@/types/player";
import type { Root as GamesArchiveRoot } from "@/types/returnedGames";
import mapChessGameToGame from "@/util/chess";
import { normalizeUsername } from "@/util/strings";
import { getCleanUsername } from "@/util/validation";

export const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.chess.com/pub/player/";

type ArchivesResponse = {
  archives: string[];
};

export async function fetchPlayer(
  username: string,
  signal?: AbortSignal,
): Promise<Player> {
  const cleanUsername = getCleanUsername(username);

  if (!cleanUsername) {
    throw new Error("Username cannot be empty");
  }

  const profileUrl = `${BASE_URL}${cleanUsername}`;
  const statsUrl = `${BASE_URL}${cleanUsername}/stats`;

  const [profileRes, statsRes] = await Promise.all([
    fetch(profileUrl, { signal }),
    fetch(statsUrl, { signal }),
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

  const profileData = await profileRes.json();
  const statsData = await statsRes.json();

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

  return {
    id: profileData.player_id,
    imageUrl: profileData.avatar || DEFAULT_AVATAR,
    username: profileData.username || cleanUsername,
    rating: maxRating,
  };
}

export async function fetchArchive(
  username: string,
  signal?: AbortSignal,
): Promise<PlayerArchive> {
  const cleanUsername = getCleanUsername(username);

  if (!cleanUsername) {
    throw new Error("Username cannot be empty");
  }

  const archivesUrl = `${BASE_URL}${cleanUsername}/games/archives`;
  const archivesRes = await fetch(archivesUrl, { signal });

  if (!archivesRes.ok) {
    throw new Error(
      `Failed to fetch player game archives: ${archivesRes.statusText}`,
    );
  }

  const archivesData = (await archivesRes.json()) as ArchivesResponse;

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
    accuracy: overallAccuracy,
    games,
    gamesLength: analyzedGames.length,
  };
}
