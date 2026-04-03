/**
 * requestLocalApi.test.ts
 * 카카오 로컬 API 호출 함수 테스트
 */

import { describe, it, expect, beforeEach, vi, type Mock } from "vitest";
import { addressToGeoLocation, geoLocationToRegionCode, transCoord } from "../requestLocalApi";

global.fetch = vi.fn();

describe("requestLocalApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("addressToGeoLocation", () => {
    it("주소를 좌표로 변환한다", async () => {
      const mockResponse = {
        documents: [
          {
            address: {
              address_name: "서울특별시 강남구 역삼동",
              x: "127.0363",
              y: "37.5001",
              h_code: "1168010100",
            },
            address_name: "서울특별시 강남구 역삼동",
            address_type: "REGION",
            x: "127.0363",
            y: "37.5001",
          },
        ],
        meta: {
          is_end: true,
          pageable_count: 1,
          total_count: 1,
        },
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await addressToGeoLocation("서울특별시 강남구 역삼동");

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("search/address.json"),
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("KakaoAK"),
          }),
        }),
      );
      expect(result.documents).toHaveLength(1);
      expect(result.documents[0].address_name).toBe("서울특별시 강남구 역삼동");
    });

    it("검색 결과가 없으면 빈 배열을 반환한다", async () => {
      const mockResponse = {
        documents: [],
        meta: {
          is_end: true,
          pageable_count: 0,
          total_count: 0,
        },
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await addressToGeoLocation("존재하지않는주소");

      expect(result.documents).toHaveLength(0);
      expect(result.meta.total_count).toBe(0);
    });
  });

  describe("geoLocationToRegionCode", () => {
    it("좌표로 행정구역 코드를 조회한다", async () => {
      const mockResponse = {
        meta: {
          total_count: 2,
        },
        documents: [
          {
            region_type: "H",
            address_name: "서울특별시 강남구 역삼동",
            region_1depth_name: "서울특별시",
            region_2depth_name: "강남구",
            region_3depth_name: "역삼동",
            region_4depth_name: "",
            code: "1168010100",
            x: 127.0363,
            y: 37.5001,
          },
        ],
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await geoLocationToRegionCode(37.5001, 127.0363);

      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("coord2regioncode.json"), expect.anything());
      expect(result.documents).toHaveLength(1);
      expect(result.documents[0].code).toBe("1168010100");
    });
  });

  describe("transCoord", () => {
    it("WGS84 좌표를 TM 좌표로 변환한다", async () => {
      const mockResponse = {
        meta: {
          total_count: 1,
        },
        documents: [
          {
            x: 198381.44,
            y: 443285.22,
          },
        ],
      };

      (global.fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await transCoord(127.0363, 37.5001);

      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("transcoord.json"), expect.anything());
      expect(result.documents[0]).toHaveProperty("x");
      expect(result.documents[0]).toHaveProperty("y");
      expect(typeof result.documents[0].x).toBe("number");
      expect(typeof result.documents[0].y).toBe("number");
    });
  });
});
