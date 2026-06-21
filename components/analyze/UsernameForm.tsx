"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";

import { getCleanUsername } from "@/util/validation";
import CtaButton from "../buttons/CtaButton";
import { UserRound, Zap } from "lucide-react";
import { useAnimate } from "motion/react";

export default function UsernameForm() {
  const router = useRouter();
  const [scope, animate] = useAnimate();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "");
    const cleanUsername = getCleanUsername(username);

    if (!cleanUsername) {
      animate("div", {
        x: [1.75, -1.75, 1.75, -1.75, 0],
        outlineColor: "var(--color-errorContainer)",
      });

      return;
    }

    router.push(`analyze/${cleanUsername}/accuracy`);
  }

  return (
    <form
      ref={scope}
      className="bg-surfaceLow p-6 flex flex-col items-start gap-3 rounded-xl"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="username"
        className="text-[8px] text-primary tracking-[0.2em] font-bold uppercase"
      >
        Chess Username
      </label>
      <div className="w-full pl-5 bg-surfaceLowest flex gap-2.5 outline-1 outline-primary/20 rounded-md">
        <span className="grid content-center">
          <UserRound size={16} strokeWidth="3" className="text-slate-500" />
        </span>
        <input
          name="username"
          type="text"
          id="username"
          placeholder="e.g. GothamChess"
          className="grow pr-5 py-3 font-heading font-medium outline-0 placeholder:text-slate-700"
        />
      </div>
      <CtaButton
        type="submit"
        widthClass="w-full"
        paddingClasses="px-5 py-2.5"
        fontStyleClass="font-heading"
        withIcon={true}
      >
        <span className="grid content-center">
          <Zap size={18} className="fill-onPrimary" />
        </span>
        Start Analysis
      </CtaButton>
    </form>
  );
}
