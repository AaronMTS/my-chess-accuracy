"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  Icon: LucideIcon;
  sortBy: string;
};

const SORT_BUTTON_CLASSES =
  "bg-surfaceLow px-2 py-1 text-[10px] text-onSurfaceLow rounded cursor-pointer";

const ON_BUTTON_HOVER = {
  color: "var(--color-primary)",
  backgroundColor: "color-mix(in oklab, var(--color-primary) 10%, transparent)",
  transition: { duration: 0.1 },
};

export default function SortGamesBtn({ Icon, sortBy }: Props) {
  return (
    <div className="space-y-1.5">
      <p className="flex gap-1 items-center text-[10px] text-onSurfaceLow font-bold tracking-wider">
        <Icon size={11} />
        {sortBy}
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        <motion.button
          whileHover={ON_BUTTON_HOVER}
          className={SORT_BUTTON_CLASSES}
        >
          Asc
        </motion.button>
        <motion.button
          whileHover={ON_BUTTON_HOVER}
          className={SORT_BUTTON_CLASSES}
        >
          Desc
        </motion.button>
      </div>
    </div>
  );
}
