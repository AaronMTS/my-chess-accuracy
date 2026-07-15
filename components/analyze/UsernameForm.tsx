"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";

import { getCleanUsername } from "@/util/validation";
import CtaButton from "../buttons/CtaButton";
import { Zap } from "lucide-react";
import { useState } from "react";
import UsernameInput from "./UsernameInput";

export default function UsernameForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  function resetErrorMessage() {
    setErrorMessage("");
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const rawUsername = String(formData.get("username") ?? "");
    const cleanUsername = getCleanUsername(rawUsername);

    if (!cleanUsername) {
      setErrorMessage(
        "Please enter a valid Chess.com username with 3 to 25 characters.",
      );
      return;
    }

    setErrorMessage("");
    router.push(`analyze/${encodeURIComponent(cleanUsername)}/accuracy`);
  }

  return (
    <form
      className="bg-surfaceLow p-6 flex flex-col items-start gap-3 rounded-xl"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="username"
        className="text-[8px] text-primary tracking-[0.2em] font-bold uppercase"
      >
        Chess Username
      </label>
      <UsernameInput
        errorMessage={errorMessage}
        resetErrorMessage={resetErrorMessage}
      />
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
