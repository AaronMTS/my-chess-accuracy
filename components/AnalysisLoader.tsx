"use client";

import Image from "next/image";
import Backdrop from "./Backdrop";
import logo from "@/assets/logo.svg";
import LineLoader from "./loaders/LineLoader";

export default function AnalysisLoader() {
  return (
    <div>
      <Backdrop zIndexClass="z-30" />
      <div className="space-y-7 absolute top-1/2 left-1/2 -translate-1/2 z-40 p-10 bg-surfaceHigh text-center rounded-4xl shadow-2xl outline outline-onSurface/20">
        <Image
          className="mx-auto"
          src={logo}
          width={40}
          height={40}
          alt="A crosshair aimed at a chess board"
        />
        <div>
          <h4 className="mb-3 font-heading whitespace-nowrap">
            Analysis in Progress...
          </h4>
          <p className="mb-5 text-sm text-slate-400">
            We are deep-diving into your tactical history.
            <br />
            This may take a moment.
          </p>
          <LineLoader />
        </div>
        {/* <button
          className="px-4 py-2 text-sm text-onSurfaceLow font-heading font-medium outline outline-onSurfaceLow/40 rounded-md cursor-pointer"
        >
          Cancel
        </button> */}
      </div>
    </div>
  );
}
