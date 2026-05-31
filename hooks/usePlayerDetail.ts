import { fetchPlayer } from "@/lib/api";
import { Player } from "@/types/player";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function usePlayerDetails() {
  const params = useParams();
  const urlUsername =
    typeof params?.username === "string"
      ? decodeURIComponent(params.username)
      : "";

  return {
    urlUsername,
    profileQuery: useSuspenseQuery<Player>({
      queryKey: ["profile", urlUsername.toLowerCase()],
      queryFn: ({ signal }) => fetchPlayer(urlUsername, signal),
    }),
  };
}
