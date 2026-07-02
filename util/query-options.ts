import { fetchArchive, fetchPlayer, fetchPlayerOpponents } from "@/lib/api";
import { GamesOptionalAccuracy } from "@/types/games";
import { queryOptions } from "@tanstack/react-query";

export function getArchiveQueryOptions(username: string) {
  return queryOptions({
    queryKey: ["archive", username.toLowerCase()],
    queryFn: ({ signal }: { signal: AbortSignal | undefined }) =>
      fetchArchive(username, signal),
    staleTime: 1000 * 60 * 5,
  });
}

export function getProfileQueryOptions(username: string) {
  return queryOptions({
    queryKey: ["profile", username.toLowerCase()],
    queryFn: ({ signal }: { signal: AbortSignal | undefined }) =>
      fetchPlayer(username, signal),
    staleTime: 1000 * 60 * 5,
  });
}

export function getRivalQueryOptions(
  username: string,
  games: GamesOptionalAccuracy[],
) {
  return queryOptions({
    queryKey: ["rival", username.toLowerCase()],
    queryFn: ({ signal }: { signal: AbortSignal | undefined }) =>
      fetchPlayerOpponents({ games, signal }),
    staleTime: 1000 * 60 * 5,
  });
}
