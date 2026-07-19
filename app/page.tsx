import Image from "next/image";

import CtaButton from "@/components/buttons/CtaButton";
import Navbar from "@/components/navbar/Navbar";
import { Swords, TrendingUp, Zap } from "lucide-react";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import dummyPfp1 from "@/assets/dummy-pfp1.jpg";
import dummyPfp2 from "@/assets/dummy-pfp2.jpg";
import dummyPfp3 from "@/assets/dummy-pfp3.jpg";
import Footer from "@/components/Footer";

const DUMMY_PFPS = [dummyPfp1, dummyPfp2, dummyPfp3];

export default function Home() {
  return (
    <>
      <main className="space-y-14 mb-14 overflow-hidden">
        <Navbar hasSidebarBtn={false} />
        <section className="space-y-7 relative mx-auto px-8 pt-7 pb-14 max-w-5xl">
          <div className="space-y-3 relative z-10 md:w-3/4">
            <h1 className="font-heading leading-[1.15]">
              Analyze your <em className="text-primary">Tactical Depth</em> with
              Precision
            </h1>
            <p className="max-w-160">
              The ultimate tool for serious strategists. Elevate your game with
              high-fidelity performance metrics.
            </p>
          </div>
          <div className="absolute top-8 right-1/2 translate-x-1/2 rotate-15 h-9/10 aspect-square opacity-15 xxs:right-13 xxs:translate-x-0 md:opacity-50 lg:h-full">
            <svg
              className="size-full"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="500" height="500" fill="#283646" />
              <rect width="125" height="125" fill="#88D982" />
              <rect x="125" y="125" width="125" height="125" fill="#88D982" />
              <rect x="250" width="125" height="125" fill="#88D982" />
              <rect x="375" y="125" width="125" height="125" fill="#88D982" />
              <rect x="250" y="250" width="125" height="125" fill="#88D982" />
              <rect x="375" y="375" width="125" height="125" fill="#88D982" />
              <rect x="125" y="375" width="125" height="125" fill="#88D982" />
              <rect y="250" width="125" height="125" fill="#88D982" />
            </svg>
          </div>
          <div className="relative z-10 flex gap-3 flex-wrap *:basis-0 md:w-3/4">
            <CtaButton
              widthClass="w-full"
              paddingClasses="px-8 py-3"
              fontStyleClass="font-heading"
              hoverClasses="transition-transform hover:scale-104"
              withIcon={true}
              isLink={true}
              href="analyze"
            >
              Start Analysis
              <span className="grid content-center">
                <Zap size={18} className="fill-onPrimary" />
              </span>
            </CtaButton>
            <SecondaryButton
              paddingClasses="px-8 py-3"
              textSizeClass="text-sm"
              isLink={true}
              href="analyze/gothamchess/accuracy"
            >
              View Demo
            </SecondaryButton>
          </div>
        </section>
        <section className="space-y-8 px-8 mx-auto max-w-5xl">
          <header className="relative">
            <h2 className="font-heading">Deep Insights</h2>
            <svg
              className="absolute left-0 -bottom-2.5 w-20 h-0.75"
              viewBox="0 0 100 3"
            >
              <line
                className="stroke-primary"
                x1="0"
                y1="2"
                x2="100"
                y2="2"
                strokeWidth="14"
              />
            </svg>
          </header>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-6">
            <div className="space-y-3 relative bg-surfaceLow p-8 overflow-hidden rounded-lg">
              <TrendingUp size={28} className="text-primary" />
              <div className="space-y-2">
                <h3 className="font-heading">Overall Games Accuracy</h3>
                <p className="w-3/4 text-onSurfaceLow sm:w-4/5">
                  Track your precision across all your matches. Visualize your
                  improvement curve.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-22 lg:-right-27">
                <svg
                  className="w-60 h-40 sm:w-67.5 sm:h-45 lg:w-75 lg:h-50"
                  viewBox="0 0 300 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="299"
                    height="199"
                    rx="47.5"
                    className="fill-primary/5"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="299"
                    height="199"
                    rx="47.5"
                    className="stroke-primary/50"
                  />
                  <path
                    d="M24 89C24 86.7909 25.7909 85 28 85H44C46.2091 85 48 86.7909 48 89V135H24V89Z"
                    className="fill-primary/15"
                  />
                  <path
                    d="M54 64C54 61.7909 55.7909 60 58 60H74C76.2091 60 78 61.7909 78 64V135H54V64Z"
                    className="fill-primary/30"
                  />
                  <path
                    d="M84 77C84 74.7909 85.7909 73 88 73H104C106.209 73 108 74.7909 108 77V135H84V77Z"
                    className="fill-primary/50"
                  />
                  <path
                    d="M114 46C114 43.7909 115.791 42 118 42H134C136.209 42 138 43.7909 138 46V135H114V46Z"
                    className="fill-primary"
                  />
                  <path
                    d="M144 30C 144 27.7909 145.791 26 148 26H 164C 166.209 26 168 27.7909 168 30V 135H 144V 30Z"
                    className="fill-primary"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-8 bg-surfaceHigher p-8 text-center rounded-lg">
              <div className="space-y-3">
                <div className="size-fit mx-auto p-4 bg-tertiaryContainer/30 outline outline-tertiaryContainer rounded">
                  <Swords size={30} className="stroke-tertiary fill-tertiary" />
                </div>
                <h3 className="font-heading">Rivals & Nemeses</h3>
                <p>
                  Identify who you beat most and who is your toughest challenge.
                  Detailed win/loss ratios per opponent.
                </p>
              </div>
              <div className="flex justify-center">
                {DUMMY_PFPS.map((pfp, index) => (
                  <Image
                    key={index}
                    src={pfp}
                    width={36}
                    height={36}
                    alt={`Chess dummy profile ${index + 1}`}
                    className="-ml-0.5 outline-[4.5px] outline-surfaceHigher rounded-md"
                  />
                ))}
                <div className="-ml-0.5 flex items-center justify-center size-9 bg-gray-600 text-sm font-bold outline-[4.5px] outline-surfaceHigher rounded-md">
                  <p>+3</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer paddingClasses="px-8 py-4" otherClasses="mt-auto" />
    </>
  );
}
