/**
 * input.tsx
 * 재사용 가능한 Input 컴포넌트
 *
 * 폼 입력 필드에서 사용하는 기본 input 요소의 스타일링된 버전.
 * focus, 유효성 검사(aria-invalid), 비활성화 상태 등을 포함한 스타일을 제공한다.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Input 컴포넌트
 * @param className - 추가 CSS 클래스
 * @param type - input 타입 (text, password, email 등)
 * @returns 스타일링된 input 요소
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", className)} {...props} />;
}

export { Input };
