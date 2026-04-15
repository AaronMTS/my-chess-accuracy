"use client";

import { usePathname } from "next/navigation";

import { ChartLine, Swords } from "lucide-react";
import { spaceGrotesk } from "@/app/fonts";

import SidebarLink from "./SidebarLink";
import Footer from "../Footer";

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <aside
      className={`flex flex-col gap-16 justify-between py-8 w-48 ${spaceGrotesk.className}`}
    >
      <div className="space-y-8">
        <div className="flex gap-2.5 items-center px-4.5">
          <div className="bg-transparent size-7 rounded-sm outline outline-primary"></div>
          <div>
            <p className="text-sm font-bold">GM Magnus</p>
            <p className="text-xs text-primary font-semibold">2850 ELO</p>
          </div>
        </div>
        <nav className="text-onSurface pr-1">
          <SidebarLink isActive={pathName.endsWith("accuracy")} href="accuracy">
            <ChartLine size={17} strokeWidth={3} />
            Accuracy
          </SidebarLink>
          <SidebarLink isActive={pathName.endsWith("rivals")} href="rivals">
            <Swords size={17} strokeWidth={3} />
            Rivals
          </SidebarLink>
        </nav>
      </div>
      <div className="space-y-6">
        <button className="mx-4.5 w-[stretch] px-4 py-2 bg-primaryContainer text-primary text-xs font-semibold tracking-wide uppercase rounded-md cursor-pointer">
          New Analysis
        </button>
        <Footer paddingClasses="pt-8" />
      </div>
    </aside>
  );
}
