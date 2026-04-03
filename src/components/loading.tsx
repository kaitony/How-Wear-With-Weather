/**
 * loading.tsx
 * 로딩 화면 컴포넌트
 *
 * 페이지 로딩 시 표시되는 전체 화면 로딩 스크린.
 * Spinner 컴포넌트를 사용하여 회전하는 로딩 아이콘을 표시한다.
 */

"use client";

import { Spinner } from "@/components/spinner";

/**
 * LoadingScreen 컴포넌트
 * @returns 전체 화면 크기의 로딩 화면과 Spinner
 */
export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <Spinner className="size-20 text-gray-700" />
    </div>
  );
}
