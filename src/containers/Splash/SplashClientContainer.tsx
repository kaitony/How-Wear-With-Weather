/**
 * SplashClientContainer.tsx
 * 스플래시 페이지의 클라이언트 컨테이너
 *
 * 앱 최초 진입 시 localStorage에서 기존 설정값(위치, 선호도)을 확인하여
 * 적절한 페이지로 리다이렉트한다.
 * - 위치 + 선호도 모두 있음 -> 메인 페이지(/main)
 * - 선호도만 있음 -> 위치 설정 페이지(/location)
 * - 아무것도 없음 -> 선호도 설정 페이지(/preference)
 */

"use client";

import { createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

import { usePreferenceStore } from "@/states/preference";
import { useAddressStore, useLocationStore, useTMLocationStore } from "@/states/location";

interface SplashContextType {
  redirectFunc: () => void;
}

export const SplashContext = createContext({} as SplashContextType);

export default function SplashClientContainer({ children }: { children: ReactNode }) {
  const router = useRouter();

  // SSR 환경에서는 localStorage가 존재하지 않으므로, 이를 안전하게 처리하기 위해 조건부로 접근
  // 기존 설정값 확인
  const preference = typeof window !== "undefined" ? localStorage.getItem("hwww_preference") : null;
  const location = typeof window !== "undefined" ? localStorage.getItem("hwww_location") : null;

  const { setTemporature } = usePreferenceStore();
  const { setLocation } = useLocationStore();
  const { setTMLocation } = useTMLocationStore();
  const { setAddress } = useAddressStore();

  const redirectFunc = () => {
    if (preference && location) {
      const preferenceValue = JSON.parse(preference);
      const { address, nx, ny, tmX, tmY } = JSON.parse(location);

      setTemporature(preferenceValue);
      setLocation(nx, ny);
      setTMLocation(tmX, tmY);
      setAddress(address);

      router.replace(`/main?preference=${preferenceValue}&nx=${nx}&ny=${ny}&tmX=${tmX}&tmY=${tmY}`);
    } else if (!preference && location) {
      const { address, nx, ny, tmX, tmY } = JSON.parse(location);

      setLocation(nx, ny);
      setTMLocation(tmX, tmY);
      setAddress(address);

      router.replace("/preference");
    } else {
      router.replace("/location");
    }
  };

  const splashContextValue: SplashContextType = {
    redirectFunc,
  };

  return <SplashContext value={splashContextValue}>{children}</SplashContext>;
}
