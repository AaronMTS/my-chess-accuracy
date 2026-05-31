"use client";

import { useRef } from "react";
import { Zap, UserRound } from "lucide-react";

import Navbar from "@/components/navbar/Navbar";
import CtaButton from "@/components/buttons/CtaButton";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { getCleanUsername } from "@/util/validation";

export default function AnalyzePage() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function handleSubmitUsername(username: string) {
    const cleanUsername = getCleanUsername(username);

    if (cleanUsername) {
      router.push(`analyze/${cleanUsername}/accuracy`);
    }
  }

  return (
    <main className="flex flex-col gap-3 h-dvh">
      <Navbar hasSidebarBtn={false} />
      <section className="space-y-6 grow p-8 mx-auto max-w-lg text-center md:mt-6">
        <div className="space-y-3">
          <h2 className="font-heading">Initialize Analysis</h2>
          <p className="text-slate-400 text-sm">
            Enter a chess.com handle for a deep-dive <br />
            tactical breakdown of recent performance.
          </p>
        </div>
        <div className="bg-surfaceLow p-6 flex flex-col items-start gap-3 rounded-xl">
          <label
            htmlFor="username"
            className="text-[8px] text-primary tracking-[0.2em] font-bold uppercase"
          >
            Chess Username
          </label>
          <div className="w-full pl-5 bg-surfaceLowest flex gap-2.5 rounded-md">
            <span className="grid content-center">
              <UserRound size={16} strokeWidth="3" className="text-slate-500" />
            </span>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              placeholder="e.g. hikaru"
              className="grow pr-5 py-3 font-heading font-medium outline-0 placeholder:text-slate-700"
              required
            />
          </div>
          <CtaButton
            widthClass="w-full"
            paddingClasses="px-5 py-2.5"
            fontStyleClass="font-heading"
            withIcon={true}
            onClick={() => handleSubmitUsername(usernameRef.current!.value)}
          >
            <span className="grid content-center">
              <Zap size={18} className="fill-onPrimary" />
            </span>
            Start Analysis
          </CtaButton>
        </div>
      </section>
      <Footer paddingClasses="px-8 py-4" />
    </main>
  );
}
