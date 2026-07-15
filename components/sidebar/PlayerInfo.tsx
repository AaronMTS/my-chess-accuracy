import { usePlayerDetails } from "@/hooks/usePlayerDetail";
import { DEFAULT_AVATAR } from "@/lib/api";
import Image from "next/image";

export default function PlayerInfo() {
  const { cleanUsername, profileQuery } = usePlayerDetails();
  const { data: player } = profileQuery;

  const displayUsername = player?.username || cleanUsername || "User";
  const displayAvatar = player?.imageUrl || DEFAULT_AVATAR;
  const displayRating = player ? `${player.rating} ELO` : "Loading ELO...";

  return (
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
        <p className="text-xs text-primary font-semibold">{displayRating}</p>
      </div>
    </div>
  );
}
