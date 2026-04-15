import { spaceGrotesk } from "../fonts";
import { Zap, UserRound } from "lucide-react";

import Navbar from "@/components/Navbar";
import CtaButton from "@/components/CtaButton";

export default function AnalyzePage() {
  return (
    <>
      <Navbar />
      <section className="space-y-6 p-8 mx-auto max-w-lg text-center">
        <div className="space-y-3">
          <h2 className={spaceGrotesk.className}>Initialize Analysis</h2>
          <p className="text-slate-400 text-sm">
            Enter a chess.com handle for a deep-dive <br />
            tactical breakdown of recent performance.
          </p>
        </div>
        <form
          action=""
          className="bg-surfaceLow p-6 flex flex-col items-start gap-3 rounded-xl"
        >
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
              type="text"
              name="username"
              id="username"
              placeholder="e.g. hikaru"
              className={`grow pr-5 py-3 ${spaceGrotesk.className} font-medium outline-0 placeholder:text-slate-700`}
            />
          </div>
          <CtaButton
            widthClass="w-full"
            paddingClasses="px-5 py-2.5"
            fontStyleClass={spaceGrotesk.className}
            withIcon={true}
          >
            <span className="grid content-center">
              <Zap size={18} className="fill-onPrimary" />
            </span>
            Start Analysis
          </CtaButton>
        </form>
      </section>
    </>
  );
}
