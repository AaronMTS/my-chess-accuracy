import Link from "next/link";

import { spaceGrotesk } from "@/app/fonts";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import ToggleSidebarBtn from "./ToggleSidebarBtn";

export default function Navbar({ hasSidebarBtn }: { hasSidebarBtn: boolean }) {
  return (
    <nav className="sticky top-0 z-20 shrink-0 bg-slate-950 py-3 px-8">
      <div className="relative">
        {hasSidebarBtn && <ToggleSidebarBtn />}
        <Link
          href="/"
          className={`w-fit mx-auto flex gap-2 items-center ${spaceGrotesk.className} text-lg *:leading-6 font-semibold text-primary md:ms-0`}
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
