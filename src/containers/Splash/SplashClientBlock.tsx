/**
 * SplashClientBlock.tsx
 * 스플래시 페이지의 클라이언트 UI 컴포넌트 모음
 *
 * 현재 구현 예정 상태이며, 스플래시 애니메이션 등의 UI가 추가될 예정.
 */

"use client";

import { ReactNode, use } from "react";

import AnimatedContent from "@/components/AnimatedContent";

import { SplashContext } from "./SplashClientContainer";

export function RedirectButton({ children }: { children: ReactNode }) {
  const { redirectFunc } = use(SplashContext);

  return (
    <button onClick={redirectFunc} className="w-full h-full">
      {children}
    </button>
  );
}

export function SubTitle() {
  return (
    <AnimatedContent delay={1} distance={30}>
      <p className="text-md font-semibold text-gray-500 tracking-wide">날씨에 맞게, 스마트하게</p>
    </AnimatedContent>
  );
}
