/**
 * requestWeatherApi.test.ts
 * 기상청 날씨 API 호출 함수 테스트
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { requestWeatherInfo } from "../requestWeatherApi";

// fetch 모킹
global.fetch = vi.fn();

describe("requestWeatherApi", () => {
  beforeEach(() => {
    // 각 테스트 전에 mock 초기화
    vi.clearAllMocks();
  });

  describe("requestWeatherInfo", () => {
    it("날씨 정보를 성공적으로 가져온다", async () => {
      // Mock 응답 데이터
      const mockResponse = {
        response: {
          body: {
            items: {
              item: [
                {
                  baseDate: "20260403",
                  baseTime: "0500",
                  category: "TMP",
                  fcstDate: "20260403",
                  fcstTime: "0600",
                  fcstValue: "15",
                  nx: 60,
                  ny: 127,
                },
                {
                  baseDate: "20260403",
                  baseTime: "0500",
                  category: "SKY",
                  fcstDate: "20260403",
                  fcstTime: "0600",
                  fcstValue: "1",
                  nx: 60,
                  ny: 127,
                },
              ],
            },
          },
        },
      };

      // fetch mock 설정
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // 함수 실행
      const result = await requestWeatherInfo("60", "127");

      // 검증
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("VilageFcst"),
        expect.objectContaining({
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      );
      expect(result).toEqual(mockResponse.response.body.items.item);
      expect(result).toHaveLength(2);
      expect(result[0].category).toBe("TMP");
    });

    it("API 요청 실패 시 에러를 반환한다", async () => {
      // fetch가 실패하는 경우
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      // 에러가 발생해야 함
      await expect(requestWeatherInfo("60", "127")).rejects.toThrow("Failed to fetch weather information");
    });

    it("올바른 파라미터로 API를 호출한다", async () => {
      const mockResponse = {
        response: {
          body: {
            items: {
              item: [],
            },
          },
        },
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await requestWeatherInfo("60", "127");

      const calledUrl = (global.fetch as any).mock.calls[0][0];

      // URL에 필수 파라미터가 포함되어 있는지 확인
      expect(calledUrl).toContain("nx=60");
      expect(calledUrl).toContain("ny=127");
      expect(calledUrl).toContain("base_time=0500");
      expect(calledUrl).toContain("dataType=JSON");
    });
  });
});
