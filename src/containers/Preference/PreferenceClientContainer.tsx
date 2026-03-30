"use client";

import { ReactNode, createContext, useState } from "react";
import { useRouter } from "next/navigation";

import { usePreferenceStore } from "@/states/preference";

interface PreferenceContextType {
  selectedPreference: string;
  selectPreferenceFunc: (preferenceId: string) => void;
  nextButtonClickFunc: () => void;
}

export const PreferenceContext = createContext({} as PreferenceContextType);

export default function PreferenceClientContainer({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [selectedPreference, setSelectedPreference] = useState<string>("");
  const { setTemporature } = usePreferenceStore();

  const selectPreferenceFunc = (preferenceId: string) => {
    setSelectedPreference(preferenceId);
  };

  const nextButtonClickFunc = () => {
    if (!selectedPreference) return;

    const preferenceValue = selectedPreference === "hot" ? 1 : selectedPreference === "cold" ? -1 : 0;

    setTemporature(preferenceValue);
    localStorage.setItem("preference", JSON.stringify(preferenceValue));
    router.push("/location");
  };

  const preferenceContextValue: PreferenceContextType = {
    selectedPreference,
    selectPreferenceFunc,
    nextButtonClickFunc,
  };

  return <PreferenceContext value={preferenceContextValue}>{children}</PreferenceContext>;
}
