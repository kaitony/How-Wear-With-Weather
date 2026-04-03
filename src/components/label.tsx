/**
 * label.tsx
 * Radix UI Label을 기반으로 한 폼 레이블 컴포넌트
 *
 * 폼 필드의 레이블을 표시하며, 비활성화 상태 스타일링 등을 지원한다.
 * peer-disabled 및 group-data-[disabled=true] 선택자로 비활성화 상태를 반영한다.
 */

"use client";

import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Label 컴포넌트
 * @param className - 추가 CSS 클래스
 * @returns 스타일링된 Label 요소
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className)} {...props} />;
}

export { Label };
