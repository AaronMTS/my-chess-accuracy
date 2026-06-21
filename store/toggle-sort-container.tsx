import { create } from "zustand";

type ToggleSortStore = {
  isContainerShown: boolean;
  toggleContainer: (newValue?: boolean) => void;
};

export const useToggleSortContainerStore = create<ToggleSortStore>((set) => ({
  isContainerShown: false,
  toggleContainer: (newValue: boolean | undefined = undefined) =>
    set((state) => ({
      isContainerShown:
        newValue !== undefined ? newValue : !state.isContainerShown,
    })),
}));
