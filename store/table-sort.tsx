import { SortingState } from "@tanstack/react-table";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SortingStore = {
  sortBy: SortingState;
  updateSorting: (id: string, desc: boolean) => void;
  removeSorting: () => void;
};

export const DEFAULT_SORTING = [{ id: "date", desc: true }];

export const useSortingStore = create<SortingStore>()(
  persist(
    (set) => ({
      sortBy: DEFAULT_SORTING,
      updateSorting: (id, desc) => set({ sortBy: [{ id, desc }] }),
      removeSorting: () => set({ sortBy: DEFAULT_SORTING }),
    }),
    {
      name: "active-sort-options",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
