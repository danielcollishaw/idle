import { create } from "zustand";

interface ResourceStore {
  barks: number;
  addToBark: (n: number) => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  barks: 0,
  addToBark: (n: number) => set((state: any) => ({ barks: state.barks + n })),
}));
