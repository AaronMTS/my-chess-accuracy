"use client";

import { useRouter } from "next/navigation";

import CtaButton from "@/components/buttons/CtaButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function RootPageNotFound() {
  const router = useRouter();

  return (
    <>
      <Navbar hasSidebarBtn={false} />
      <div className="grow px-8 py-12">
        <section className="space-y-10 relative max-w-xl mx-auto px-8 pt-12 pb-8 bg-surfaceLow rounded-lg">
          <p
            className={`absolute top-8 right-8 text-8xl font-heading text-primary font-semibold tracking-tight opacity-20`}
          >
            404
          </p>
          <div className="space-y-4 relative z-10">
            <h1>
              Position <em className="text-primary">Lost</em>
            </h1>
            <p>
              The request page cannot be found. This coordinate is{" "}
              <span className="text-primary">outside the field of play.</span> A
              blunder in the navigation has occurred.
            </p>
          </div>
          <div className="space-y-4 w-62 flex flex-col mx-auto">
            <CtaButton
              paddingClasses="px-6 py-3"
              withIcon={true}
              onClick={() => router.back()}
            >
              <ArrowLeft size={20} />
              Back to Previous Page
            </CtaButton>
            <SecondaryButton
              customColor="text-primary"
              paddingClasses="px-6 py-3"
              icon={{ Element: <ArrowRight size={20} />, position: "right" }}
              onClick={() => router.push("/analyze")}
            >
              Analyze New Game
            </SecondaryButton>
          </div>
        </section>
      </div>
      <Footer paddingClasses="px-8 py-4" />
    </>
  );
}
