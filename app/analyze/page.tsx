"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import UsernameForm from "@/components/analyze/UsernameForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyChessAccuracy | Analyze",
  description: "Enter your account name to start the analysis.",
};

export default function AnalyzePage() {
  return (
    <main className="flex flex-col gap-3 h-dvh">
      <Navbar hasSidebarBtn={false} />
      <section className="space-y-6 grow p-8 mx-auto w-full max-w-md text-center md:mt-6">
        <div className="space-y-3">
          <h2 className="font-heading">Initialize Analysis</h2>
          <p className="text-slate-400 text-sm">
            Enter a chess.com handle for a deep-dive <br />
            tactical breakdown of recent performance.
          </p>
        </div>
        <UsernameForm />
      </section>
      <Footer paddingClasses="px-8 py-4" />
    </main>
  );
}
