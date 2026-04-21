import Link from "next/link";
import { spaceGrotesk } from "@/app/fonts";
import logo from "@/assets/logo.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-slate-950 py-3 px-6">
      <Link
        href="/"
        className={`flex gap-2 items-center ${spaceGrotesk.className} text-lg *:leading-6 font-semibold text-primary`}
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
    </nav>
  );
}
