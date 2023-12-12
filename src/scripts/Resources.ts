import { create } from "zustand";

interface ResourceStore {
  visible: boolean;
  toggleVisible: () => void;

  barks: number;
  dogs: number;
  barkRate: () => number;
  addToDogs: (n: number) => void;
  addToBark: (n: number) => void;
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  visible: false,
  toggleVisible: () => set((state: any) => ({ visible: !state.visible })),

  barks: 0,
  dogs: 0,
  barkRate: () => get().dogs * 1.05,
  addToDogs: (n) => set((state: any) => ({ barks: state.dogs + n })),
  addToBark: (n) => set((state: any) => ({ barks: state.barks + n })),
}));
