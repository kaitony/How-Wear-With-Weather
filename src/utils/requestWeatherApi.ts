/**
 * requestWeatherApi.ts
 * 기상청 단기예보 API 호출 함수
 *
 * 기상청 단기예보 조회서비스를 사용하여
 * 격자 좌표(nx, ny) 기반으로 3일간의 기상 예보 데이터를 가져온다.
 * 기온, 강수확률, 하늘상태, 습도, 풍속 등의 정보가 포함된다.
 */

import dayjs from "dayjs";

/**
 * 기상청 API 원시 응답 타입
 * 시간대별 예보 데이터를 배열로 반환하며, 각 항목은 특정 카테고리의 예보값을 포함한다.
 * - POP: 강수확률(%)
 * - PTY: 강수형태 (0:없음, 1:비, 2:비/눈, 3:눈, 4:소나기)
 * - SKY: 하늘상태 (1:맑음, 2:구름조금, 3:구름많음, 4:흐림)
 * - TMP: 1시간 기온(°C)
 * - REH: 습도(%)
 * - WSD: 풍속(m/s)
 * - 기타: UUU, VVV, VEC, WAV, PCP, SNO 등
 */
interface WeatherApiResponse {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

/**
 * 기상청 단기예보 데이터 조회
 *
 * 격자 좌표(nx, ny)를 기반으로 현재 일자부터 3일간의 단기예보 데이터를 가져온다.
 * 매일 05:00에 발표되는 기상청 단기예보 API를 호출하며, 1시간마다 캠시가 갱신된다.
 *
 * @param latitude - 기상청 격자 X 좌표 (nx)
 * @param longitude - 기상청 격자 Y 좌표 (ny)
 * @returns 예보 데이터 배열 (시간대/카테고리별)
 * @throws 날씨 정보 조회 실패 시 오류
 */
export async function requestWeatherInfo(latitude: string, longitude: string): Promise<WeatherApiResponse[]> {
  const pageNo = 1;
  const numOfRows = 1000;
  const dataType = "JSON";
  const base_date = dayjs().format("YYYYMMDD");
  const base_time = "0500";
  const nx = latitude;
  const ny = longitude;
  const authKey = process.env.NEXT_PUBLIC_KMA_API_KEY;

  const response = await fetch(`https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst?pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}&authKey=${authKey}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: { revalidate: 3600 }, // 1시간마다 캐시 재검증
  });

  if (!response.ok) {
    throw new Error("Failed to fetch weather information");
  }

  const data = await response.json();
  return data.response.body.items.item;
}
