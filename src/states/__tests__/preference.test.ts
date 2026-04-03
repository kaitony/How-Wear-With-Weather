/**
 * preference.test.ts
 * 사용자 선호도 상태 관리 테스트
 */

import { renderHook, act } from "@testing-library/react";
import { usePreferenceStore } from "../preference";

describe("usePreferenceStore", () => {
  beforeEach(() => {
    // 각 테스트 전에 스토어 초기화
    const { result } = renderHook(() => usePreferenceStore());
    act(() => {
      result.current.setTemporature(0);
    });
  });

  it("초기 상태가 0이다", () => {
    const { result } = renderHook(() => usePreferenceStore());

    expect(result.current.temporature).toBe(0);
  });

  it("더위를 많이 타는 경우 (+1)을 설정할 수 있다", () => {
    const { result } = renderHook(() => usePreferenceStore());

    act(() => {
      result.current.setTemporature(1);
    });

    expect(result.current.temporature).toBe(1);
  });

  it("추위를 많이 타는 경우 (-1)을 설정할 수 있다", () => {
    const { result } = renderHook(() => usePreferenceStore());

    act(() => {
      result.current.setTemporature(-1);
    });

    expect(result.current.temporature).toBe(-1);
  });

  it("보통 (0)을 설정할 수 있다", () => {
    const { result } = renderHook(() => usePreferenceStore());

    act(() => {
      result.current.setTemporature(1); // 먼저 다른 값 설정
    });

    act(() => {
      result.current.setTemporature(0); // 0으로 변경
    });

    expect(result.current.temporature).toBe(0);
  });

  it("선호도를 여러 번 변경할 수 있다", () => {
    const { result } = renderHook(() => usePreferenceStore());

    act(() => {
      result.current.setTemporature(1);
    });
    expect(result.current.temporature).toBe(1);

    act(() => {
      result.current.setTemporature(-1);
    });
    expect(result.current.temporature).toBe(-1);

    act(() => {
      result.current.setTemporature(0);
    });
    expect(result.current.temporature).toBe(0);
  });

  it("다른 컴포넌트에서 같은 상태를 공유한다", () => {
    const { result: result1 } = renderHook(() => usePreferenceStore());
    const { result: result2 } = renderHook(() => usePreferenceStore());

    act(() => {
      result1.current.setTemporature(1);
    });

    // 두 hook이 같은 상태를 참조
    expect(result2.current.temporature).toBe(1);
  });

  it("setTemporature 함수는 항상 사용 가능하다", () => {
    const { result } = renderHook(() => usePreferenceStore());

    expect(typeof result.current.setTemporature).toBe("function");
  });

  describe("엣지 케이스", () => {
    it("범위를 벗어난 값도 설정할 수 있다 (타입상 number)", () => {
      const { result } = renderHook(() => usePreferenceStore());

      act(() => {
        result.current.setTemporature(100);
      });

      // 비즈니스 로직에서는 -1, 0, 1만 사용하지만 타입상으로는 number
      expect(result.current.temporature).toBe(100);
    });

    it("소수점 값도 설정할 수 있다", () => {
      const { result } = renderHook(() => usePreferenceStore());

      act(() => {
        result.current.setTemporature(0.5);
      });

      expect(result.current.temporature).toBe(0.5);
    });
  });
});
