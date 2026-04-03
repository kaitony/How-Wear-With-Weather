/**
 * preference.tsx
 * 사용자 선호도(더위/추위 민감도) 전역 상태 관리 (Zustand)
 *
 * 사용자가 설정한 온도 민감도를 저장하고 관리한다.
 * 체감 온도 계산 시 이 값을 반영하여 개인화된 옷차림을 추천한다.
 * - 더위를 많이 타는 경우: +1 (체감 온도를 높게 보정)
 * - 추위를 많이 타는 경우: -1 (체감 온도를 낮게 보정)
 * - 보통: 0 (보정 없음)
 */

import { create } from "zustand";

/**
 * 사용자 선호도 상태 인터페이스
 * @property {number} temporature - 온도 민감도 값 (1: 더위를 탐, -1: 추위를 탐, 0: 보통)
 * @property {function} setTemporature - 온도 민감도 설정 함수
 */
interface PreferenceState {
  temporature: number;
  setTemporature: (temporature: number) => void;
}

export const usePreferenceStore = create<PreferenceState>((set) => ({
  temporature: 0,
  setTemporature: (temporature) => set({ temporature }),
}));
