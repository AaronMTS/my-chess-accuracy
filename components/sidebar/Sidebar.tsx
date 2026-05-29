"use client";

import { useParams, redirect } from "next/navigation";
import Image from "next/image";

import { ChartLine, Plus, Swords } from "lucide-react";

import SidebarLink from "./SidebarLink";
import Footer from "../Footer";
import PrimaryButton from "../buttons/PrimaryButton";
import SidebarBackdrop from "./SidebarBackdrop";
import { useSidebar } from "@/store/sidebar-context";
import { Player } from "@/types/player";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayer, DEFAULT_AVATAR } from "@/lib/api";

export default function Sidebar() {
  const { isShown } = useSidebar();
  const params = useParams();
  const urlUsername =
    typeof params?.username === "string"
      ? decodeURIComponent(params.username)
      : "";

  const { data: player } = useQuery<Player>({
    queryKey: ["player", urlUsername.toLowerCase()],
    queryFn: ({ signal }) => fetchPlayer(urlUsername, signal),
    enabled: !!urlUsername,
  });

  const displayUsername = player?.username || urlUsername || "User";
  const displayAvatar = player?.imageUrl || DEFAULT_AVATAR;
  const displayRating = player ? `${player.rating} ELO` : "Loading ELO...";

  const SIDEBAR_MOBILE_CLASSES = `absolute z-40 top-0 left-0 ${isShown ? "max-md:translate-x-0" : "max-md:-translate-x-71"} transition-transform duration-300`;

  return (
    <>
      <SidebarBackdrop />
      <aside
        className={`${SIDEBAR_MOBILE_CLASSES} shrink-0 w-71 flex flex-col gap-16 justify-between py-8 md:w-16 lg:w-52 font-heading max-md:bg-surface max-md:h-dvh md:static md:opacity-100`}
      >
        <div className="space-y-8">
          <div className="flex justify-start gap-2.5 items-center px-4.5 md:max-lg:justify-center md:max-lg:gap-0">
            <div className="shrink-0 bg-transparent size-fit rounded-sm outline outline-primary overflow-hidden">
              <Image
                src={displayAvatar}
                height={28}
                width={28}
                alt={`Profile picture of ${displayUsername}`}
                className="object-cover"
              />
            </div>
            <div className="md:max-lg:hidden overflow-hidden">
              <p className="text-sm text-onSurface font-bold overflow-hidden text-ellipsis">
                {displayUsername}
              </p>
              <p className="text-xs text-primary font-semibold">
                {displayRating}
              </p>
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
          <Footer paddingClasses="pt-8" otherClasses="md:max-lg:hidden" />
        </div>
      </aside>
    </>
  );
}
