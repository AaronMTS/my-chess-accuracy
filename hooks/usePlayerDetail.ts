import { fetchPlayer } from "@/lib/api";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function usePlayerDetails() {
  const params = useParams();
  const urlUsername =
    typeof params?.username === "string"
      ? decodeURIComponent(params.username)
      : "";

  return useQuery<Player>({
    queryKey: ["player", urlUsername.toLowerCase()],
    queryFn: ({ signal }) => fetchPlayer(urlUsername, signal),
    enabled: !!urlUsername,
  });
}
