/**
 * requestAirApi.test.ts
 * 에어코리아 대기질 API 호출 함수 테스트
 */

import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { requestStationInfo, requestAirPollution } from "../requestAirApi";

global.fetch = vi.fn();

describe("requestAirApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("requestStationInfo", () => {
    it("TM 좌표로 근처 측정소 정보를 가져온다", async () => {
      const mockResponse = {
        response: {
          header: {
            resultCode: "00",
            resultMsg: "NORMAL_CODE",
          },
          body: {
            totalCount: 3,
            items: [
              {
                stationCode: "111123",
                tm: 1.1,
                addr: "서울 강남구 삼성동",
                stationName: "삼성동",
              },
              {
                stationCode: "111124",
                tm: 1.5,
                addr: "서울 강남구 역삼동",
                stationName: "역삼동",
              },
            ],
            pageNo: 1,
            numOfRows: 10,
          },
        },
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await requestStationInfo("198381", "443285");

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("getNearbyMsrstnList"),
        expect.objectContaining({
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      );
      expect(result.response.body.items).toHaveLength(2);
      expect(result.response.body.items[0].stationName).toBe("삼성동");
    });

    it("API 요청 URL에 올바른 파라미터가 포함된다", async () => {
      const mockResponse = {
        response: {
          header: { resultCode: "00", resultMsg: "NORMAL_CODE" },
          body: { totalCount: 0, items: [], pageNo: 1, numOfRows: 10 },
        },
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await requestStationInfo("198381", "443285");

      const calledUrl = (global.fetch as Mock).mock.calls[0][0];
      expect(calledUrl).toContain("tmX=198381");
      expect(calledUrl).toContain("tmY=443285");
      expect(calledUrl).toContain("returnType=json");
    });
  });

  describe("requestAirPollution", () => {
    it("측정소명으로 실시간 대기오염 데이터를 가져온다", async () => {
      const mockResponse = {
        response: {
          header: {
            resultCode: "00",
            resultMsg: "NORMAL_CODE",
          },
          body: {
            totalCount: 24,
            items: [
              {
                so2Grade: "1",
                coFlag: null,
                khaiValue: "50",
                so2Value: "0.003",
                coValue: "0.5",
                pm25Flag: null,
                pm10Flag: null,
                pm10Value: "25",
                o3Grade: "1",
                khaiGrade: "1",
                pm25Value: "12",
                no2Flag: null,
                no2Grade: "1",
                o3Flag: null,
                pm25Grade: "1",
                so2Flag: null,
                dataTime: "2026-04-03 16:00",
                coGrade: "1",
                no2Value: "0.030",
                pm10Grade: "1",
                o3Value: "0.050",
              },
            ],
            pageNo: 1,
            numOfRows: 100,
          },
        },
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await requestAirPollution("삼성동");

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("getMsrstnAcctoRltmMesureDnsty"),
        expect.objectContaining({
          method: "GET",
          cache: "force-cache",
          next: { revalidate: 3600 },
        }),
      );
      expect(result.response.body.items).toHaveLength(1);
      expect(result.response.body.items[0].pm10Grade).toBe("1");
    });

    it("측정소명이 URL 인코딩된다", async () => {
      const mockResponse = {
        response: {
          header: { resultCode: "00", resultMsg: "NORMAL_CODE" },
          body: { totalCount: 0, items: [], pageNo: 1, numOfRows: 100 },
        },
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await requestAirPollution("삼성동");

      const calledUrl = (global.fetch as Mock).mock.calls[0][0];
      expect(calledUrl).toContain(encodeURIComponent("삼성동"));
    });
  });
});
