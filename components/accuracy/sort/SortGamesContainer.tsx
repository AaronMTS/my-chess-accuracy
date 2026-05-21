"use client";
import { useState } from "react";

import { ListFilter } from "lucide-react";
import SecondaryButton from "../../buttons/SecondaryButton";
import SortGames from "./SortGames";
import { AnimatePresence } from "motion/react";

export default function SortGamesContainer() {
  const [isSortGamesShown, setIsSortGamesShown] = useState<boolean>(false);

  function handleToggleSortGames(newValue: boolean | undefined = undefined) {
    setIsSortGamesShown((prevValue) =>
      newValue !== undefined ? newValue : !prevValue,
    );
  }

  return (
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
  );
}
