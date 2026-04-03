/**
 * weather.d.ts
 * 날씨 및 대기질 정보 관련 타입 정의
 *
 * 기상청 API와 에어코리아 API로부터 받아온 데이터를 가공하여
 * 앱 전반에서 사용하는 날씨/대기질 정보 타입을 정의한다.
 */

/**
 * 날씨 정보 타입 (날짜별)
 * 각 날짜(YYYYMMDD)를 키로 가지며, 해당 날짜의 상세 날씨 정보를 포함한다.
 *
 * @property {string} [date] - 날짜별 키 (예: "20260403")
 * @property {object} detailed - 시간대별 상세 기상 정보 (카테고리별 값)
 * @property {number} tempMax - 최고 기온 (°C)
 * @property {number} tempMin - 최저 기온 (°C)
 * @property {string} morning - 아침(06~12시) 날씨 설명 (맑음, 구름조금, 흐림, 비 등)
 * @property {string} afternoon - 오후(12~18시) 날씨 설명
 * @property {string} evening - 저녁(18~24시) 날씨 설명
 * @property {number} humidity - 평균 습도 (%)
 * @property {number} windSpeed - 평균 풍속 (m/s)
 * @property {number} feelsLike - 체감 온도 (°C, 사용자 선호도 보정 적용)
 * @property {string[]} outfit - 추천 옷차림 목록 (예: ["자켓", "긴바지", "니트"])
 */
interface WeatherInfoType {
  [date: string]: {
    detailed: {
      [time: string]: {
        [category: string]: string;
      };
    };
    tempMax: number;
    tempMin: number;
    morning: string;
    afternoon: string;
    evening: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    outfit: string[];
  };
}

/**
 * 대기질 정보 타입 (에어코리아 API)
 * 측정소별 실시간 대기질 측정 데이터를 나타낸다.
 *
 * @property {string} so2Grade - 아황산가스(SO2) 등급 (1~4: 좋음~매우나쁨)
 * @property {string | null} coFlag - 일산화탄소 플래그
 * @property {string} khaiValue - 통합대기환경수치 값
 * @property {string} so2Value - 아황산가스 농도 (ppm)
 * @property {string} coValue - 일산화탄소 농도 (ppm)
 * @property {string | null} pm25Flag - 초미세먼지(PM2.5) 플래그
 * @property {string | null} pm10Flag - 미세먼지(PM10) 플래그
 * @property {string} pm10Value - 미세먼지 농도 (㎍/m³)
 * @property {string} o3Grade - 오존(O3) 등급 (1~4)
 * @property {string} khaiGrade - 통합대기환경지수 등급
 * @property {string} pm25Value - 초미세먼지 농도 (㎍/m³)
 * @property {string | null} no2Flag - 이산화질소(NO2) 플래그
 * @property {string} no2Grade - 이산화질소 등급 (1~4)
 * @property {string | null} o3Flag - 오존 플래그
 * @property {string} pm25Grade - 초미세먼지 등급 (1~4)
 * @property {string | null} so2Flag - 아황산가스 플래그
 * @property {string} dataTime - 측정 일시 (예: "2026-04-03 16:00")
 * @property {string} coGrade - 일산화탄소 등급 (1~4)
 * @property {string} no2Value - 이산화질소 농도 (ppm)
 * @property {string} pm10Grade - 미세먼지 등급 (1~4: 좋음~매우나쁨)
 * @property {string} o3Value - 오존 농도 (ppm)
 */
interface AirInfoType {
  [date: string]: {
    detailed: {
      [time: string]: {
        [category: string]: string;
      };
    };
    tempMax: number;
    tempMin: number;
    morning: string;
    afternoon: string;
    evening: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    outfit: string[];
  };
}

interface AirInfoType {
  so2Grade: string;
  coFlag: string | null;
  khaiValue: string;
  so2Value: string;
  coValue: string;
  pm25Flag: string | null;
  pm10Flag: string | null;
  pm10Value: string;
  o3Grade: string;
  khaiGrade: string;
  pm25Value: string;
  no2Flag: string | null;
  no2Grade: string;
  o3Flag: string | null;
  pm25Grade: string;
  so2Flag: string | null;
  dataTime: string;
  coGrade: string;
  no2Value: string;
  pm10Grade: string;
  o3Value: string;
}
