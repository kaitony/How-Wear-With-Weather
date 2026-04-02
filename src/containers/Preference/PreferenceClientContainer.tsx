/**
 * PreferenceClientContainer.tsx
 * 선호도 설정 페이지의 클라이언트 상태 관리 컨테이너
 *
 * PreferenceContext를 통해 하위 컴포넌트에 상태와 함수를 전달한다.
 * - selectedPreference: 현재 선택된 선호도 (hot / cold / normal)
 * - selectPreferenceFunc: 선호도 선택 함수
 * - nextButtonClickFunc: 선호도 값을 숫자로 변환(1 / -1 / 0)하여 localStorage에 저장 후 메인 페이지로 이동
 */

"use client";

import { ReactNode, createContext, useState } from "react";
import { useRouter } from "next/navigation";

import { usePreferenceStore } from "@/states/preference";
import { useLocationStore } from "@/states/location";

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
  const { latitude, longitude } = useLocationStore();

  /** 선호도 카드 선택 함수 */
  const selectPreferenceFunc = (preferenceId: string) => {
    setSelectedPreference(preferenceId);
  };

  /** 선호도 값을 숫자로 변환(hot=1, cold=-1, normal=0)하여 저장 후 메인 페이지로 이동 */
  const nextButtonClickFunc = () => {
    if (!selectedPreference) return;

    const preferenceValue = selectedPreference === "hot" ? 1 : selectedPreference === "cold" ? -1 : 0;

    setTemporature(preferenceValue);
    localStorage.setItem("hwww_preference", JSON.stringify(preferenceValue));
    router.push(`/main?preference=${preferenceValue}&latitude=${latitude}&longitude=${longitude}`);
  };

  const preferenceContextValue: PreferenceContextType = {
    selectedPreference,
    selectPreferenceFunc,
    nextButtonClickFunc,
  };

  return <PreferenceContext value={preferenceContextValue}>{children}</PreferenceContext>;
}
