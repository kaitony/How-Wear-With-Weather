import { create } from "zustand";

interface LocationState {
  nx: number;
  ny: number;
  setLocation: (nx: number, ny: number) => void;
}

interface TMLocationState {
  tmX: number;
  tmY: number;
  setTMLocation: (tmX: number, tmY: number) => void;
}

interface AddressState {
  address: string;
  setAddress: (address: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  nx: 0,
  ny: 0,
  setLocation: (nx, ny) => set({ nx, ny }),
}));

export const useTMLocationStore = create<TMLocationState>((set) => ({
  tmX: 0,
  tmY: 0,
  setTMLocation: (tmX, tmY) => set({ tmX, tmY }),
}));

export const useAddressStore = create<AddressState>((set) => ({
  address: "",
  setAddress: (address) => set({ address }),
}));
