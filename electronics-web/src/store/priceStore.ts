import {create} from "zustand";

interface PriceStore {
  selectedPrice: number;
  setSelectedPrice: (price: number) => void;
}

export const usePriceStore = create<PriceStore>((set) => ({
  selectedPrice: 0,
  setSelectedPrice: (price) => set({ selectedPrice: price }),
}));