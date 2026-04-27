"use client";

import { redirect } from "next/navigation";

import { ChartLine, Plus, Swords } from "lucide-react";
import { spaceGrotesk } from "@/app/fonts";

import SidebarLink from "./SidebarLink";
import Footer from "../Footer";
import PrimaryButton from "../buttons/PrimaryButton";
import SidebarBackdrop from "./SidebarBackdrop";
import { useSidebar } from "@/store/sidebar-context";

export default function Sidebar() {
  const { isShown } = useSidebar();

  const SIDEBAR_MOBILE_CLASSES = `absolute z-40 top-0 ${isShown ? "left-0" : "-left-52 opacity-0"}`;

  return (
    <>
      <SidebarBackdrop />
      <aside
        className={`${SIDEBAR_MOBILE_CLASSES} shrink-0 w-52 flex flex-col gap-16 justify-between py-8 md:max-lg:w-16 ${spaceGrotesk.className} max-md:bg-surface max-md:h-dvh md:static md:opacity-100`}
      >
        <div className="space-y-8">
          <div className="flex justify-start gap-2.5 items-center px-4.5 md:max-lg:justify-center md:max-lg:gap-0">
            <div className="bg-transparent size-7 rounded-sm outline outline-primary"></div>
            <div className="md:max-lg:hidden">
              <p className="text-sm text-onSurface font-bold">GM Magnus</p>
              <p className="text-xs text-primary font-semibold">2850 ELO</p>
            </div>
          </div>
          <nav className="space-y-1 text-onSurface pr-1 md:max-lg:pl-1">
            <SidebarLink href="accuracy">
              <ChartLine size={17} strokeWidth={3} />
              <span className="md:max-lg:hidden">Accuracy</span>
            </SidebarLink>
            <SidebarLink href="rivals">
              <Swords size={17} strokeWidth={3} />
              <span className="md:max-lg:hidden">Rivals</span>
            </SidebarLink>
          </nav>
        </div>
        <div className="text-center lg:space-y-6">
          <PrimaryButton
            marginClasses="mx-4.5 md:max-lg:mx-0"
            widthClass="w-[stretch] md:max-lg:w-fit"
            paddingClasses="px-4 py-2 md:max-lg:px-2"
            isUpperCase={true}
            responsiveContent={{
              default: "New Analysis",
              md: <Plus size={17} />,
            }}
            onClick={() => redirect("/analyze")}
          />
          <Footer paddingClasses="pt-8" otherClasses="hidden lg:block" />
        </div>
      </aside>
    </>
  );
}
