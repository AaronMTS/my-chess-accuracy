"use client";

import CtaButton from "@/components/buttons/CtaButton";
import { errorTypesUI, UserFacingError } from "@/util/errors";
import { ArrowLeft, RadioOff, RefreshCw } from "lucide-react";
import { unstable_catchError as catchError, type ErrorInfo } from "next/error";
import { useRouter } from "next/navigation";

function CornerSVG(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <rect x="0" y="0" width="100" height="20" fill="currentColor" />
      <rect x="0" y="0" width="20" height="100" fill="currentColor" />
    </svg>
  );
}

function ErrorFallback(
  _: unknown,
  {
    error,
    unstable_retry,
  }: { error: UserFacingError } & Partial<Omit<ErrorInfo, "error">>,
) {
  const router = useRouter();

  const errorUI = error.code && errorTypesUI[error.code];
  const ButtonIcon = errorUI?.button.Icon;

  let ctaButtonHandler = unstable_retry;

  if (error.code === "invalid_username" || error.code === "player_not_found") {
    ctaButtonHandler = () => router.push("/analyze");
  }

  function backToHomeHandler() {
    router.push("/");
  }

  return (
    <section className="space-y-12 w-full text-center mx-auto py-14 px-6 overflow-hidden md:py-18 lg:py-22 *:mx-auto">
      <div className="relative size-32 grid place-content-center bg-center bg-size-[32px_32px] bg-error-grid-gradient border-2 border-error/30 overflow-visible">
        <RadioOff size={48} className="text-error animate-pulse" />{" "}
        <CornerSVG className="absolute size-3 -top-1 -left-1 text-error" />
        <CornerSVG className="absolute size-3 -top-1 -right-1 text-error scale-x-[-1]" />
        <CornerSVG className="absolute size-3 -bottom-1 -left-1 text-error scale-y-[-1]" />
        <CornerSVG className="absolute size-3 -bottom-1 -right-1 text-error scale-[-1]" />
      </div>
      <div className="relative space-y-3 max-w-lg">
        <h1 className="absolute top-1/2 left-1/2 -translate-1/2 -z-10 text-[35vw] text-error/5 font-black select-none tracking-tighter">
          {errorUI?.bgText || "LOST"}
        </h1>
        <h2 className="font-heading">
          {errorUI?.Title || (
            <>
              PROFILE AND ARCHIVE RETRIEVAL{" "}
              <span className="text-error text-nowrap">FAILED</span>
            </>
          )}
        </h2>
        <p className="text-onSurfaceLow">
          {error.message ||
            `We encountered an interruption while syncing with Chess.com. Please try again later.`}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <CtaButton
          onClick={ctaButtonHandler}
          withIcon={true}
          paddingClasses="pl-7.5 pr-8 py-4"
        >
          {ButtonIcon && <ButtonIcon size={20} />}
          {!ButtonIcon && <RefreshCw size={20} />}
          <span className="font-heading text-lg font-bold tracking-wider">
            {errorUI?.button.text || "RETRY CONNECTION"}
          </span>
        </CtaButton>
        <button
          onClick={backToHomeHandler}
          className="flex gap-2.5 pl-7 pr-8 py-4 justify-center items-center text-primary text-lg font-heading font-bold tracking-wider text-nowrap outline outline-primary/50 rounded-md cursor-pointer"
        >
          <ArrowLeft size={20} />
          BACK TO HOME
        </button>
      </div>
    </section>
  );
}

export default catchError(ErrorFallback);
