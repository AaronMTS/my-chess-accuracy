"use client";

import { ListFilter } from "lucide-react";
import SecondaryButton from "../../buttons/SecondaryButton";
import SortGames from "./SortGames";
import { AnimatePresence } from "motion/react";
import { DEFAULT_SORTING, useSortingStore } from "@/store/table-sort";
import ActiveSortIndicator from "./ActiveSortIndicator";
import { useToggleSortContainerStore } from "@/store/toggle-sort-container";

export default function SortGamesContainer() {
  const isSortGamesShown = useToggleSortContainerStore(
    (state) => state.isContainerShown,
  );
  const handleToggleSortGames = useToggleSortContainerStore(
    (state) => state.toggleContainer,
  );
  const sorting = useSortingStore((state) => state.sortBy);

  return (
    <>
      {sorting[0].id !== DEFAULT_SORTING[0].id && (
        <ActiveSortIndicator
          sortId={sorting[0].id}
          sortOrder={sorting[0].desc ? "DESCENDING" : "ASCENDING"}
        />
      )}
      <span className="relative">
        <SecondaryButton
          onClick={() => handleToggleSortGames()}
          sizeClass="size-8"
          paddingClasses="p-2"
          textSizeClass="text-xs"
        >
          <ListFilter size={16} />
        </SecondaryButton>
        <AnimatePresence>
          {isSortGamesShown && (
            <SortGames hideSortGames={() => handleToggleSortGames(false)} />
          )}
        </AnimatePresence>
      </span>
    </>
  );
}
