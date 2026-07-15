import { UserFacingError } from "@/util/errors";
import { getProfileQueryOptions } from "@/util/query-options";
import { getCleanUsername } from "@/util/validation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function usePlayerDetails() {
  const params = useParams();
  const urlUsername =
    typeof params?.username === "string"
      ? decodeURIComponent(params.username)
      : "";

  const cleanUsername = getCleanUsername(urlUsername);

  if (!cleanUsername) {
    throw new UserFacingError(
      "Please enter a valid Chess.com username to analyze your games.",
      { code: "invalid_username" },
    );
  }

  return {
    cleanUsername,
    profileQuery: useSuspenseQuery(getProfileQueryOptions(cleanUsername)),
  };
}
