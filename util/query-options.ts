import { fetchArchive } from "@/lib/api";
import { PlayerArchive } from "@/types/player";

export function getArchiveQueryOptions(username: string) {
  return {
    queryKey: ["archive", username.toLowerCase()],
    queryFn: ({ signal }: { signal: AbortSignal | undefined }) =>
      fetchArchive(username, signal),
    staleTime: 1000 * 60 * 5,
  };
}

export function getArchiveRivalsQueryOptions(username: string) {
  return {
    queryKey: ["archive", username.toLowerCase(), "rivals"],
    queryFn: ({ signal }: { signal: AbortSignal | undefined }) =>
      fetchArchive(username, signal),
    select: (data: PlayerArchive) => data.rivals,
    staleTime: 1000 * 60 * 5,
  };
}
