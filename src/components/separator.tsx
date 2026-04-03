/**
 * separator.tsx
 * Radix UI Separator를 기반으로 한 구분선 컴포넌트
 *
 * 수평 또는 수직 구분선을 표시하며, 컨텐츠 영역을 시각적으로 구분하는 데 사용된다.
 * orientation prop으로 방향을 지정할 수 있다.
 */

"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Separator 컴포넌트
 * @param className - 추가 CSS 클래스
 * @param orientation - 구분선 방향 (horizontal 또는 vertical)
 * @param decorative - 장식용인지 여부 (절접성 트리에서 제외)
 * @returns 스타일링된 구분선
 */
function Separator({ className, orientation = "horizontal", decorative = true, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return <SeparatorPrimitive.Root data-slot="separator" decorative={decorative} orientation={orientation} className={cn("shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)} {...props} />;
}

export { Separator };
