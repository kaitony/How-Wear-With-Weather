/**
 * location.tsx
 * 위치 관련 전역 상태 관리 (Zustand)
 *
 * 세 가지 위치 정보 스토어를 제공한다:
 * 1. useLocationStore: 기상청 격자 좌표 (nx, ny)
 * 2. useTMLocationStore: TM 좌표계 좌표 (tmX, tmY) - 대기질 측정소 검색용
 * 3. useAddressStore: 사용자가 읽을 수 있는 주소 문자열
 */

import { create } from "zustand";

/**
 * 기상청 격자 좌표 상태 인터페이스
 * @property {number} nx - 기상청 격자 X 좌표
 * @property {number} ny - 기상청 격자 Y 좌표
 * @property {function} setLocation - 좌표 설정 함수
 */
interface LocationState {
  nx: number;
  ny: number;
  setLocation: (nx: number, ny: number) => void;
}

/**
 * TM 좌표계 좌표 상태 인터페이스
 * 대기질 측정소 검색에 사용되는 TM 좌표 정보를 관리
 * @property {number} tmX - TM 좌표 X
 * @property {number} tmY - TM 좌표 Y
 * @property {function} setTMLocation - TM 좌표 설정 함수
 */
interface TMLocationState {
  tmX: number;
  tmY: number;
  setTMLocation: (tmX: number, tmY: number) => void;
}

/**
 * 주소 문자열 상태 인터페이스
 * 사용자에게 표시되는 읽기 쉬운 주소 정보를 관리
 * @property {string} address - 주소 문자열 (예: "서울특별시 강남구 역삼동")
 * @property {function} setAddress - 주소 설정 함수
 */
interface AddressState {
  address: string;
  setAddress: (address: string) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  nx: 0,
  ny: 0,
  setLocation: (nx, ny) => set({ nx, ny }),
}));

export const useTMLocationStore = create<TMLocationState>((set) => ({
  tmX: 0,
  tmY: 0,
  setTMLocation: (tmX, tmY) => set({ tmX, tmY }),
}));

export const useAddressStore = create<AddressState>((set) => ({
  address: "",
  setAddress: (address) => set({ address }),
}));
