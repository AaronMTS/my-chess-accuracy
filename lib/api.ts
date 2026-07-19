import { Games, GamesOptionalAccuracy } from "@/types/games";
import { Player, PlayerArchive } from "@/types/player";
import type { ReturnedGameRoot as GamesArchiveRoot } from "@/types/returnedGames";
import { RivalDetails } from "@/types/rivals";
import mapChessGameToGame, { isDraw, isLoss } from "@/util/chess";
import { normalizeUsername } from "@/util/strings";
import { getCleanUsername } from "@/util/validation";
import { redirect } from "next/navigation";
import { UserFacingError } from "@/util/errors";
import { generateSafeIntegerID } from "@/util/numbers";

type ArchivesResponse = {
  archives: string[];
};

export const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_OVKPJhu7LHezNYuuEa6Gsef_Vo7fgV8qz4p6KUXYUB_3A45Znbsvs76Nqv8ejTUp0s27OSmz_mXVIP7PF3Nfo1hu5pEJxmtIT8alGz0QVI0g_SIoMVW_XvfGisGpZHFdyxHddoOnNbbHigbEsoy8nr_AOXhIfau3H92tYzAGFaRAsqv-cczcnTgKHmBT6STOCXcKsG6NUs9HTI3hEE-ALVbPPi-A1UhDzyr3WoH9YRjuLqVR40u-6l83EaT-iecOdIATiCzajyc";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.chess.com/pub/player/";

export async function fetchPlayer(
  username: string,
  signal?: AbortSignal,
): Promise<Player> {
  const cleanUsername = getCleanUsername(username);

  if (!cleanUsername) {
    throw new UserFacingError(
      "Please enter a valid Chess.com username to analyze your games.",
      { code: "invalid_username" },
    );
  }

  const profileUrl = `${BASE_URL}${encodeURIComponent(cleanUsername)}`;
  const statsUrl = `${BASE_URL}${encodeURIComponent(cleanUsername)}/stats`;

  const [profileRes, statsRes] = await Promise.all([
    fetch(profileUrl, { signal }),
    fetch(statsUrl, { signal }),
  ]);

  if (!profileRes.ok) {
    if (profileRes.status === 404) {
      throw new UserFacingError(
        "We couldn't find a Chess.com account with that username.",
        { status: 404, code: "player_not_found" },
      );
    }

    throw new UserFacingError(
      "We couldn't load that Chess.com profile right now. Please try again in a moment.",
      { status: profileRes.status, code: "profile_fetch_failed" },
    );
  }

  if (!statsRes.ok) {
    throw new UserFacingError(
      "We couldn't load the player statistics right now. Please try again in a moment.",
      { status: statsRes.status, code: "stats_fetch_failed" },
    );
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
    username:
      profileData.url.match(/[\w-]+$/)[0] ||
      profileData.username ||
      cleanUsername,
    rating: maxRating,
  };
}

export async function fetchArchive(
  username: string,
  signal?: AbortSignal,
): Promise<PlayerArchive> {
  const cleanUsername = getCleanUsername(username);

  if (!cleanUsername) {
    throw new UserFacingError(
      "Please enter a valid Chess.com username to analyze your games.",
      { code: "invalid_username" },
    );
  }

  const archivesUrl = `${BASE_URL}${encodeURIComponent(cleanUsername)}/games/archives`;
  const archivesRes = await fetch(archivesUrl, { signal });

  if (!archivesRes.ok) {
    throw new UserFacingError(
      "We couldn't load the game archive for that account. Please try again in a moment.",
      { status: archivesRes.status, code: "archives_fetch_failed" },
    );
  }

  const archivesData = (await archivesRes.json()) as ArchivesResponse;

  const archiveUrls = Array.isArray(archivesData.archives)
    ? archivesData.archives
    : [];

  const archiveResponses = await Promise.all(
    archiveUrls.map((url) => fetch(url, { signal })),
  );

  const archiveJson = await Promise.allSettled(
    archiveResponses.map(async (response, index) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch archive ${archiveUrls[index]}: ${response.statusText}`,
        );
      }
      return response.json() as Promise<GamesArchiveRoot>;
    }),
  );

  const allGames = archiveJson
    .flatMap((archive) => {
      if (archive.status === "fulfilled") {
        return archive.value.games;
      }
      console.error(archive.reason);
      return [];
    })
    .map((game) => mapChessGameToGame(game, cleanUsername));
  const gamesWithNoAccuracy: GamesOptionalAccuracy[] = [];
  const gamesWithAccuracy: Games[] = [];

  allGames.forEach((game) =>
    game.accuracy
      ? gamesWithAccuracy.push(game as Games)
      : gamesWithNoAccuracy.push(game),
  );

  const overallAccuracy =
    gamesWithAccuracy.length > 0
      ? gamesWithAccuracy.reduce((sum, current) => sum + current.accuracy!, 0) /
        gamesWithAccuracy.length
      : 0;

  return {
    accuracy: overallAccuracy,
    gamesWithAccuracy,
    gamesLength: gamesWithAccuracy.length,
    gamesWithNoAccuracy,
  };
}

export async function fetchPlayerOpponents({
  games,
  signal,
}: {
  games: GamesOptionalAccuracy[];
  signal?: AbortSignal;
}): Promise<{
  totalRivals: number;
  mostDefeatedArr: RivalDetails[];
  biggestNemesesArr: RivalDetails[];
}> {
  if (!games) {
    return redirect(`/analyze`);
  }

  const opponents = new Map<string, RivalDetails>();

  for (const game of games) {
    const opponentKey = normalizeUsername(game.opponent);
    const existing = opponents.get(opponentKey);
    const rivalPayload: RivalDetails = {
      id: existing?.id ?? generateSafeIntegerID(),
      imageUrl: DEFAULT_AVATAR,
      username: game.opponent,
      rating: existing?.rating ?? 0,
      wins: (existing?.wins ?? 0) + (game.result === "win" ? 1 : 0),
      draw: (existing?.draw ?? 0) + (isDraw(game.result) ? 1 : 0),
      loss: (existing?.loss ?? 0) + (isLoss(game.result) ? 1 : 0),
      winRate: existing?.winRate ?? 0,
    };

    opponents.set(opponentKey, rivalPayload);
  }

  const rivals = Array.from(opponents.values());
  const filteredRivals = rivals
    .filter((rival) => rival.wins + rival.draw + rival.loss >= 15)
    .map((rival) => ({
      ...rival,
      winRate: (rival.wins / (rival.wins + rival.draw + rival.loss)) * 100,
    }))
    .sort((a, b) => {
      const sortBasis = b.winRate - a.winRate;

      if (sortBasis === 0) {
        return b.wins - a.wins;
      }

      return sortBasis;
    });
  const topRivals = [
    ...filteredRivals.slice(0, 3),
    ...filteredRivals.slice(-3),
  ];

  const mostDefeated: Record<string, RivalDetails> = {};
  const biggestNemeses: Record<string, RivalDetails> = {};

  topRivals.forEach((rival) => {
    const rivalUsername = rival.username;

    if (rival.winRate >= 50) {
      mostDefeated[rivalUsername] = rival;
      return;
    }

    biggestNemeses[rivalUsername] = rival;
  });

  const results = await Promise.allSettled([
    ...Object.values(mostDefeated).map((rival) =>
      fetchPlayer(rival.username, signal),
    ),
    ...Object.values(biggestNemeses).map((rival) =>
      fetchPlayer(rival.username, signal),
    ),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.log("Failed:", result.reason);
      return;
    }

    const currentUsername = result.value.username;
    const rivalId = result.value.id;
    const profileImgUrl = result.value.imageUrl;
    const rivalRating = result.value.rating;

    if (Object.hasOwn(mostDefeated, currentUsername)) {
      mostDefeated[currentUsername] = {
        ...mostDefeated[currentUsername],
        id: rivalId,
        rating: rivalRating,
        imageUrl: profileImgUrl,
      };
      return;
    }

    biggestNemeses[currentUsername] = {
      ...biggestNemeses[currentUsername],
      id: rivalId,
      rating: rivalRating,
      imageUrl: profileImgUrl,
    };
  });

  return {
    totalRivals: opponents.size,
    mostDefeatedArr: Object.values(mostDefeated),
    biggestNemesesArr: Object.values(biggestNemeses).toReversed(),
  };
}
