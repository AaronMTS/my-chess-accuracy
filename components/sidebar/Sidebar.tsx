"use client";

import { usePathname } from "next/navigation";

import { ChartLine, Plus, Swords } from "lucide-react";
import { spaceGrotesk } from "@/app/fonts";

import SidebarLink from "./SidebarLink";
import Footer from "../Footer";
import PrimaryButton from "../buttons/PrimaryButton";

export default function Sidebar() {
  const pathName = usePathname();

  return (
    <aside
      className={`shrink-0 w-16 flex flex-col gap-16 justify-between py-8 lg:w-52 ${spaceGrotesk.className}`}
    >
      <div className="space-y-8">
        <div className="flex justify-center items-center px-4.5 lg:justify-start lg:gap-2.5">
          <div className="bg-transparent size-7 rounded-sm outline outline-primary"></div>
          <div className="hidden lg:block">
            <p className="text-sm font-bold">GM Magnus</p>
            <p className="text-xs text-primary font-semibold">2850 ELO</p>
          </div>
        </div>
        <nav className="text-onSurface px-1 lg:pl-0">
          <SidebarLink isActive={pathName.endsWith("accuracy")} href="accuracy">
            <ChartLine size={17} strokeWidth={3} />
            <span className="hidden lg:inline-block">Accuracy</span>
          </SidebarLink>
          <SidebarLink isActive={pathName.endsWith("rivals")} href="rivals">
            <Swords size={17} strokeWidth={3} />
            <span className="hidden lg:inline-block">Rivals</span>
          </SidebarLink>
        </nav>
      </div>
      <div className="text-center lg:space-y-6">
        <PrimaryButton
          marginClasses="lg:mx-4.5"
          widthClass="w-fit lg:w-[stretch]"
          paddingClasses="p-2 lg:px-4"
          isUpperCase={true}
          responsiveContent={{
            default: <Plus size={17} />,
            lg: "New Analysis",
          }}
        />
        <Footer paddingClasses="pt-8" otherClasses="hidden lg:block" />
      </div>
    </aside>
  );
}
