import { fetchArchive } from "@/lib/api";

export function getArchiveQueryOptions(username: string) {
  return {
    queryKey: ["archive", username.toLowerCase()],
    queryFn: ({ signal }: { signal: AbortSignal | undefined }) =>
      fetchArchive(username, signal),
  };
}
