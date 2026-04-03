/**
 * layout.tsx
 * 전체 페이지를 감싸는 기본 레이아웃 컴포넌트
 *
 * 그라데이션 배경색을 적용하여 전체적인 페이지 분위기를 조성한다.
 * 모든 페이지에서 공통적으로 사용되는 래퍼 컴포넌트.
 */

import { ReactNode } from "react";

/**
 * Layout 컴포넌트
 * @param children - 레이아웃 내부에 렌더링할 컨텐츠
 * @returns 그라데이션 배경을 가진 래퍼 div
 */
export default function Layout({ children }: { children: ReactNode }) {
  return <div className="bg-linear-to-br from-blue-100 via-purple-50 to-yellow-100">{children}</div>;
}
