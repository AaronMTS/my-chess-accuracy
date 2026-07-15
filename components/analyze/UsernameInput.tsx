"use client";

import { UserRound } from "lucide-react";
import { useAnimate } from "motion/react";
import { useEffect, useRef } from "react";

export default function UsernameInput({
  errorMessage,
  resetErrorMessage,
}: {
  errorMessage: string;
  resetErrorMessage: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (errorMessage) {
      animate(scope.current, {
        x: [1.75, -1.75, 1.75, -1.75, 0],
        outlineColor: "var(--color-errorContainer)",
      });
    }
  }, [scope, animate, errorMessage]);

  function revertStyling() {
    if (
      errorMessage ||
      scope.current.style.getPropertyValue("outline-color") !== ""
    ) {
      scope.current.style.removeProperty("outline-color");
      resetErrorMessage();
    }
  }

  return (
    <div className="w-full text-left">
      <div
        ref={scope}
        className="pl-5 bg-surfaceLowest flex gap-2.5 outline-1 outline-primary/20 rounded-md"
      >
        <span className="grid content-center">
          <UserRound size={16} strokeWidth="3" className="text-slate-500" />
        </span>
        <input
          ref={inputRef}
          name="username"
          type="text"
          id="username"
          placeholder="e.g. GothamChess"
          className="grow pr-5 py-3 font-heading font-medium outline-0 placeholder:text-slate-700"
          onFocus={revertStyling}
        />
      </div>
      {errorMessage && (
        <small className="text-[7.5px] text-red-300 font-medium tracking-[0.015em] xxs:text-[9px] xs:text-[10px] xs:font-normal">
          {errorMessage}
        </small>
      )}
    </div>
  );
}
