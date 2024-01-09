import { create } from "zustand";

interface ResourceStore {
  visible: boolean;
  toggleVisible: () => void;

  barks: number;
  dogs: number;
  dogCost: number;
  dogRate: number;
  barkRate: () => number;
  addToDogs: (n: number) => void;
  addToBark: (n: number) => void;
  buyDogs: (n: number) => void;
  getCompoundDogCost: (n: number) => number;
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  visible: false,
  toggleVisible: () => set((state: any) => ({ visible: !state.visible })),

  barks: 0,
  dogs: 0,
  dogCost: 5,
  barkRate: () => get().dogs * 1.05,
  dogRate: 1.2,
  addToDogs: (n) => set((state: ResourceStore) => ({ barks: state.dogs + n })),
  addToBark: (n) => set((state: ResourceStore) => ({ barks: state.barks + n })),
  buyDogs: (n) => set((state: ResourceStore) => ({ dogs: state.dogs + n, dogCost: state.dogCost * state.getCompoundDogCost(n), barks: state.barks - state.dogCost - state.dogCost * state.getCompoundDogCost(n - 1) })),
  getCompoundDogCost: (n) => (n > 0) ? Math.pow(get().dogRate, n) : 0,
}));
