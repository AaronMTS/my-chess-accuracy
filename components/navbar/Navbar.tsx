import Link from "next/link";

import logo from "@/assets/logo.svg";
import Image from "next/image";
import ToggleSidebarBtn from "./ToggleSidebarBtn";

export default function Navbar({ hasSidebarBtn }: { hasSidebarBtn: boolean }) {
  return (
    <nav className="sticky top-0 z-20 shrink-0 bg-slate-950">
      <div className="relative max-w-5xl py-3 px-8 lg:mx-auto">
        {hasSidebarBtn && <ToggleSidebarBtn />}
        <Link
          href="/"
          className={`w-fit ${hasSidebarBtn ? "mx-auto md:ms-0" : ""} flex gap-2 items-center font-heading text-lg *:leading-6 font-semibold text-primary`}
        >
          <span className="relative -top-0.5 size-6">
            <Image
              src={logo}
              fill
              alt="A crosshair aimed at a chess board"
              loading="eager"
            />
          </span>
          MyChessAccuracy
        </Link>
      </div>
    </nav>
  );
}
