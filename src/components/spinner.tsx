/**
 * spinner.tsx
 * 회전하는 로딩 스피너 컴포넌트
 *
 * lucide-react의 Loader2Icon을 사용하여 로딩 상태를 표시한다.
 * animate-spin 클래스로 회전 애니메이션이 적용된다.
 */

import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Spinner 컴포넌트
 * @param className - 추가 CSS 클래스 (크기 및 색상 조정 가능)
 * @returns 회전하는 로더 아이콘
 */
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />;
}

export { Spinner };
