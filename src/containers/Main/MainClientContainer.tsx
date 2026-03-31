/**
 * MainClientContainer.tsx
 * 메인 페이지의 클라이언트 상태 관리 컨테이너
 *
 * 하위 컴포넌트에 클라이언트 상태와 로직을 제공하기 위한 래퍼 컴포넌트.
 * 현재는 children을 그대로 렌더링하며, 추후 날씨/옷차림 관련 상태 관리가 추가될 예정.
 */

"use client";

import { ReactNode } from "react";

export default function MainClientContainer({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
