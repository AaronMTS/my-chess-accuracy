import { getProfileQueryOptions } from "@/util/query-options";
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
    profileQuery: useSuspenseQuery(getProfileQueryOptions(urlUsername)),
  };
}
