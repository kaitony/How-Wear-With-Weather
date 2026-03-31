import { create } from "zustand";

interface LocationState {
  latitude: number;
  longitude: number;
  setLocation: (latitude: number, longitude: number) => void;
}

interface AddressState {
  address: string;
  setAddress: (address: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  latitude: 0,
  longitude: 0,
  setLocation: (latitude, longitude) => set({ latitude, longitude }),
}));

export const useAddressStore = create<AddressState>((set) => ({
  address: "",
  setAddress: (address) => set({ address }),
}));
