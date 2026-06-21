"use client";

import { useSortingStore } from "@/store/table-sort";
import { useToggleSortContainerStore } from "@/store/toggle-sort-container";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  Icon: LucideIcon;
  sortBy: string;
};

const SORT_BUTTON_CLASSES =
  "px-2 py-1 text-[10px] font-medium rounded cursor-pointer";

const ON_BUTTON_HOVER = {
  color: "var(--color-primary)",
  backgroundColor: "color-mix(in oklab, var(--color-primary) 10%, transparent)",
  transition: { duration: 0.1 },
};

export default function SortGamesBtn({ Icon, sortBy }: Props) {
  const sorting = useSortingStore((state) => state.sortBy);
  const currentSortOption = sorting.find((option) => option.id === sortBy);
  let isDesc;

  const setSorting = useSortingStore((state) => state.updateSorting);

  const toggleContainer = useToggleSortContainerStore(
    (state) => state.toggleContainer,
  );

  if (currentSortOption) {
    isDesc = currentSortOption.desc;
  }

  function hideSortGames() {
    toggleContainer(false);
  }

  return (
    <div className="space-y-2">
      <p
        className={`flex gap-1 items-center text-[10px] ${currentSortOption ? "text-primary" : "text-onSurfaceLow"} font-bold tracking-wider`}
      >
        <Icon size={11} />
        {sortBy.toUpperCase()}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          whileHover={ON_BUTTON_HOVER}
          className={`${!isDesc && isDesc !== undefined ? "bg-primary/10 text-primary" : "bg-surfaceLow text-onSurfaceLow"} ${SORT_BUTTON_CLASSES}`}
          onClick={
            !currentSortOption || isDesc
              ? () => {
                  hideSortGames();
                  setSorting(sortBy, false);
                }
              : undefined
          }
        >
          Asc
        </motion.button>
        <motion.button
          whileHover={ON_BUTTON_HOVER}
          className={`${isDesc ? "bg-primary/10 text-primary" : "bg-surfaceLow text-onSurfaceLow"} ${SORT_BUTTON_CLASSES}`}
          onClick={
            !currentSortOption || (!isDesc && isDesc !== undefined)
              ? () => {
                  hideSortGames();
                  setSorting(sortBy, true);
                }
              : undefined
          }
        >
          Desc
        </motion.button>
      </div>
    </div>
  );
}
