import { ErrorCodes } from "@/types/errorCodes";
import { LucideIcon, Pencil, RefreshCw, Search } from "lucide-react";

export class UserFacingError extends Error {
  readonly status?: number;
  readonly code?: ErrorCodes;

  constructor(
    message: string,
    options?: { status?: number; code?: ErrorCodes },
  ) {
    super(message);
    this.name = "UserFacingError";
    this.status = options?.status;
    this.code = options?.code;
  }
}

export function getUserFacingErrorMessage(error: unknown): string {
  if (error instanceof UserFacingError) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again later.";
}

export const errorTypesUI: Record<
  ErrorCodes,
  {
    Title: React.JSX.Element;
    bgText: string;
    button: {
      text: string;
      Icon: LucideIcon;
    };
  }
> = {
  invalid_username: {
    Title: (
      <>
        USERNAME: <span className="text-error text-nowrap">ILLEGAL MOVE</span>
      </>
    ),
    bgText: "INVALID",
    button: { text: "RE-ENTER USERNAME", Icon: Pencil },
  },
  player_not_found: {
    Title: (
      <>
        THE PLAYER{" "}
        <span className="text-error text-nowrap">DOES NOT EXIST</span>
      </>
    ),
    bgText: "MISSING",
    button: { text: "TRY ANOTHER USERNAME", Icon: Search },
  },
  profile_fetch_failed: {
    Title: (
      <>
        PROFILE SYNC <span className="text-error text-nowrap">FAILED</span>
      </>
    ),
    bgText: "SEVERED",
    button: { text: "RETRY CONNECTION", Icon: RefreshCw },
  },
  stats_fetch_failed: {
    Title: (
      <>
        STATS STREAM <span className="text-error text-nowrap">CORRUPTED</span>
      </>
    ),
    bgText: "VOID",
    button: { text: "RETRY CONNECTION", Icon: RefreshCw },
  },
  archives_fetch_failed: {
    Title: (
      <>
        ARCHIVE ACCESS <span className="text-error text-nowrap">DENIED</span>
      </>
    ),
    bgText: "BURIED",
    button: { text: "RETRY CONNECTION", Icon: RefreshCw },
  },
};
