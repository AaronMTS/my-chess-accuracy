"use server";

import { redirect } from "next/navigation";
import { fetchPlayer } from "./api";
import { QueryClient } from "@tanstack/react-query";
import { isRedirectError } from "next/dist/client/components/redirect-error";

type State = {
  errorMessage: string | null;
};

export async function handleAnalyzeGames(
  requestId: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const username = formData.get("username") as string;
  const cleanUsername = username.trim();
  if (!cleanUsername) return { errorMessage: "Invalid username" };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  try {
    const player = await fetchPlayer(cleanUsername);

    if (player) {
      queryClient.setQueryData(["player", cleanUsername.toLowerCase()], player);
      redirect(`/analyze/${cleanUsername}/accuracy`);
    }

    return { errorMessage: null };
  } catch (err: unknown) {
    const errorState: State = { errorMessage: null };

    if (isRedirectError(err)) throw err;

    const isAborted =
      err instanceof Error &&
      (err.name === "AbortError" || err.message.includes("abort"));

    if (isAborted) {
      errorState.errorMessage = "Fetch aborted";
      return errorState;
    }

    errorState.errorMessage =
      err instanceof Error ? err.message : "An error occurred";
    return errorState;
  }
}
