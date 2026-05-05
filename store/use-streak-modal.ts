import { create } from "zustand";

type StreakModalState = {
  isOpen: boolean;
  streak: number;
  open: (streak: number) => void;
  close: () => void;
};

export const useStreakModal = create<StreakModalState>((set) => ({
  isOpen: false,
  streak: 0,
  open: (streak) => set({ isOpen: true, streak }),
  close: () => set({ isOpen: false }),
}));
