import { create } from "zustand";

interface PreferenceState {
  temporature: number;
  setTemporature: (temporature: number) => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  temporature: 0,
  setTemporature: (temporature) => set({ temporature }),
}));
