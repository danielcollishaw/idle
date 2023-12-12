import { create } from "zustand";

interface ResourceStore {
  visible: boolean;
  toggleVisible: () => void;

  barks: number;
  addToBark: (n: number) => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  visible: false,
  toggleVisible: () => set((state: any) => ({ visible: !state.visible })),

  barks: 0,
  addToBark: (n: number) => set((state: any) => ({ barks: state.barks + n })),
}));
