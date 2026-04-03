/**
 * AnimatedContent.tsx
 * GSAP ScrollTrigger를 사용한 스크롤 기반 애니메이션 컴포넌트
 *
 * 스크롤 위치에 따라 요소를 페이드인하거나 슬라이드하는 애니메이션을 제공한다.
 * 방향(수직/수평), 거리, 지속시간, 이징 등 다양한 옵션을 지원하며,
 * 일정 시간 후 사라지는 효과도 설정 가능하다.
 */

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedContent 컴포넌트의 Props 인터페이스
 * @property {React.ReactNode} children - 애니메이션을 적용할 자식 요소
 * @property {Element | string | null} container - 스크롤 컨테이너 (기본값: #snap-main-container)
 * @property {number} distance - 시작 위치 오프셋 (px, 기본값: 100)
 * @property {'vertical' | 'horizontal'} direction - 애니메이션 방향 (기본값: vertical)
 * @property {boolean} reverse - 방향 반전 여부 (기본값: false)
 * @property {number} duration - 애니메이션 지속시간 (초, 기본값: 0.8)
 * @property {string} ease - 이징 함수 (기본값: power3.out)
 * @property {number} initialOpacity - 시작 투명도 (기본값: 0)
 * @property {boolean} animateOpacity - 투명도 애니메이션 여부 (기본값: true)
 * @property {number} scale - 시작 스케일 (기본값: 1)
 * @property {number} threshold - 스크롤 트리거 임계값 (기본값: 0.1)
 * @property {number} delay - 애니메이션 지연 시간 (초, 기본값: 0)
 * @property {number} disappearAfter - 사라지기 시작 시간 (초, 기본값: 0)
 * @property {number} disappearDuration - 사라지는 애니메이션 지속시간 (초, 기본값: 0.5)
 * @property {string} disappearEase - 사라지는 이징 함수 (기본값: power3.in)
 * @property {() => void} onComplete - 나타나는 애니메이션 완료 시 콜백
 * @property {() => void} onDisappearanceComplete - 사라지는 애니메이션 완료 시 콜백
 */
interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({ children, container, distance = 100, direction = "vertical", reverse = false, duration = 0.8, ease = "power3.out", initialOpacity = 0, animateOpacity = true, scale = 1, threshold = 0.1, delay = 0, disappearAfter = 0, disappearDuration = 0.5, disappearEase = "power3.in", onComplete, onDisappearanceComplete, className = "", ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget: Element | string | null = container || document.getElementById("snap-main-container") || null;

    if (typeof scrollerTarget === "string") {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: "visible",
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.(),
          });
        }
      },
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [container, distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay, disappearAfter, disappearDuration, disappearEase, onComplete, onDisappearanceComplete]);

  return (
    <div ref={ref} className={`invisible ${className}`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
