/**
 * location.test.ts
 * 위치 관련 상태 관리 테스트
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocationStore, useTMLocationStore, useAddressStore } from "../location";

describe("Location Stores", () => {
  describe("useLocationStore", () => {
    beforeEach(() => {
      // 각 테스트 전에 스토어 초기화
      const { result } = renderHook(() => useLocationStore());
      act(() => {
        result.current.setLocation(0, 0);
      });
    });

    it("초기 상태가 올바르게 설정된다", () => {
      const { result } = renderHook(() => useLocationStore());

      expect(result.current.nx).toBe(0);
      expect(result.current.ny).toBe(0);
    });

    it("setLocation으로 좌표를 설정할 수 있다", () => {
      const { result } = renderHook(() => useLocationStore());

      act(() => {
        result.current.setLocation(60, 127);
      });

      expect(result.current.nx).toBe(60);
      expect(result.current.ny).toBe(127);
    });

    it("좌표 값을 여러 번 업데이트할 수 있다", () => {
      const { result } = renderHook(() => useLocationStore());

      act(() => {
        result.current.setLocation(60, 127);
      });
      expect(result.current.nx).toBe(60);

      act(() => {
        result.current.setLocation(55, 125);
      });
      expect(result.current.nx).toBe(55);
      expect(result.current.ny).toBe(125);
    });

    it("다른 컴포넌트에서 같은 상태를 공유한다", () => {
      const { result: result1 } = renderHook(() => useLocationStore());
      const { result: result2 } = renderHook(() => useLocationStore());

      act(() => {
        result1.current.setLocation(60, 127);
      });

      // 두 hook이 같은 상태를 참조
      expect(result2.current.nx).toBe(60);
      expect(result2.current.ny).toBe(127);
    });
  });

  describe("useTMLocationStore", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useTMLocationStore());
      act(() => {
        result.current.setTMLocation(0, 0);
      });
    });

    it("초기 상태가 올바르게 설정된다", () => {
      const { result } = renderHook(() => useTMLocationStore());

      expect(result.current.tmX).toBe(0);
      expect(result.current.tmY).toBe(0);
    });

    it("setTMLocation으로 TM 좌표를 설정할 수 있다", () => {
      const { result } = renderHook(() => useTMLocationStore());

      act(() => {
        result.current.setTMLocation(198381.44, 443285.22);
      });

      expect(result.current.tmX).toBe(198381.44);
      expect(result.current.tmY).toBe(443285.22);
    });

    it("TM 좌표를 여러 번 업데이트할 수 있다", () => {
      const { result } = renderHook(() => useTMLocationStore());

      act(() => {
        result.current.setTMLocation(198381.44, 443285.22);
      });

      act(() => {
        result.current.setTMLocation(200000, 450000);
      });

      expect(result.current.tmX).toBe(200000);
      expect(result.current.tmY).toBe(450000);
    });
  });

  describe("useAddressStore", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useAddressStore());
      act(() => {
        result.current.setAddress("");
      });
    });

    it("초기 상태가 빈 문자열이다", () => {
      const { result } = renderHook(() => useAddressStore());

      expect(result.current.address).toBe("");
    });

    it("setAddress로 주소를 설정할 수 있다", () => {
      const { result } = renderHook(() => useAddressStore());

      act(() => {
        result.current.setAddress("서울특별시 강남구 역삼동");
      });

      expect(result.current.address).toBe("서울특별시 강남구 역삼동");
    });

    it("주소를 여러 번 변경할 수 있다", () => {
      const { result } = renderHook(() => useAddressStore());

      act(() => {
        result.current.setAddress("서울특별시 강남구 역삼동");
      });
      expect(result.current.address).toBe("서울특별시 강남구 역삼동");

      act(() => {
        result.current.setAddress("서울특별시 종로구 세종로");
      });
      expect(result.current.address).toBe("서울특별시 종로구 세종로");
    });

    it("빈 문자열로 다시 설정할 수 있다", () => {
      const { result } = renderHook(() => useAddressStore());

      act(() => {
        result.current.setAddress("서울특별시 강남구 역삼동");
      });

      act(() => {
        result.current.setAddress("");
      });

      expect(result.current.address).toBe("");
    });
  });

  describe("통합 테스트", () => {
    it("모든 위치 상태를 동시에 설정할 수 있다", () => {
      const { result: locationResult } = renderHook(() => useLocationStore());
      const { result: tmResult } = renderHook(() => useTMLocationStore());
      const { result: addressResult } = renderHook(() => useAddressStore());

      act(() => {
        locationResult.current.setLocation(60, 127);
        tmResult.current.setTMLocation(198381.44, 443285.22);
        addressResult.current.setAddress("서울특별시 강남구 역삼동");
      });

      expect(locationResult.current.nx).toBe(60);
      expect(locationResult.current.ny).toBe(127);
      expect(tmResult.current.tmX).toBe(198381.44);
      expect(tmResult.current.tmY).toBe(443285.22);
      expect(addressResult.current.address).toBe("서울특별시 강남구 역삼동");
    });
  });
});
