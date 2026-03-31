"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { usePreferenceStore } from "@/states/preference";
import { useLocationStore } from "@/states/location";

export default function SplashClientContainer({ children }: { children: ReactNode }) {
  const router = useRouter();

  // SSR 환경에서는 localStorage가 존재하지 않으므로, 이를 안전하게 처리하기 위해 조건부로 접근
  // 기존 설정값 확인
  const preference = typeof window !== "undefined" ? localStorage.getItem("preference") : null;
  const location = typeof window !== "undefined" ? localStorage.getItem("location") : null;

  const { setTemporature } = usePreferenceStore();
  const { setLocation } = useLocationStore();

  useEffect(() => {
    setTimeout(() => {
      if (preference && location) {
        setTemporature(JSON.parse(preference));
        setLocation(JSON.parse(location).latitude, JSON.parse(location).longitude);
        router.replace("/main");
      } else if (preference && !location) {
        setTemporature(JSON.parse(preference));
        router.replace("/location");
      } else {
        router.replace("/preference");
      }
    }, 2000); // 2초 후에 리다이렉트
  }, [preference, location]);

  return <>{children}</>;
}
