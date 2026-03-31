/**
 * PreferenceClientBlock.tsx
 * 선호도 설정 페이지의 클라이언트 UI 컴포넌트 모음
 *
 * - PreferenceCard: 선호도 선택 카드 (더위/추위/보통) - 선택 시 스타일 변경
 * - NextButton: 선호도가 선택된 경우에만 활성화되는 다음 단계 이동 버튼
 */

"use client";

import { ReactNode, use } from "react";

import { Button } from "@/components/button";

import { PreferenceContext } from "./PreferenceClientContainer";

interface PreferenceCardProps {
  id: string;
  selectedBg: string;
  selectedBorder: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  children: ReactNode;
}

/** 선호도 선택 카드 컴포넌트 - 선택 상태에 따라 스타일이 변경됨 */
export function PreferenceCard({ id, selectedBg, selectedBorder, bgColor, borderColor, title, description, children }: PreferenceCardProps) {
  const { selectedPreference, selectPreferenceFunc } = use(PreferenceContext);

  const isSelected = selectedPreference === id;

  return (
    <button
      onClick={() => selectPreferenceFunc(id)}
      className={`
                  flex flex-1 items-center p-6 gap-x-6 rounded-3xl border-2 transition-all
                  ${isSelected ? `${selectedBg} ${selectedBorder} shadow-lg scale-[1.02]` : `${bgColor} ${borderColor}`}
                  hover:scale-[1.01] active:scale-[0.99]
                   cursor-pointer
                `}>
      {children}
      <div className="flex flex-1 flex-col gap-y-2 text-left">
        <h3 className="text-lg text-gray-800 font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
}

/** 다음 단계(메인 페이지)로 이동하는 버튼 - 선호도가 선택되지 않으면 비활성화 */
export function NextButton() {
  const { selectedPreference, nextButtonClickFunc } = use(PreferenceContext);

  const disabled = selectedPreference === "";

  return (
    <Button onClick={nextButtonClickFunc} disabled={disabled} className="w-full py-6 rounded-2xl text-lg bg-linear-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg">
      다음
    </Button>
  );
}
