/**
 * MainServerContainer.tsx
 * 메인 페이지의 최상위 서버 컨테이너
 *
 * 클라이언트 컨테이너(MainClientContainer)로 서버 블록(MainServerBlock)을 감싸
 * Context를 통해 상태와 로직을 하위 컴포넌트에 전달하는 구조를 형성한다.
 */

import { redirect } from "next/navigation";

import { requestWeatherInfo } from "@/utils/requestWeatherApi";
import { requestStationInfo, requestAirPollution } from "@/utils/requestAirApi";

import MainClientContainer from "./MainClientContainer";
import MainServerBlock from "./MainServerBlock";

interface MainServerContainerProps {
  preference?: string | string[];
  nx?: string | string[];
  ny?: string | string[];
  tmX?: string | string[];
  tmY?: string | string[];
}

export default async function MainServerContainer({ preference, nx, ny, tmX, tmY }: MainServerContainerProps) {
  // preference, nx, ny, tmX, tmY 중 하나라도 없으면 각각의 설정 페이지로 리다이렉트
  if (!preference) {
    redirect("/preference");
  }

  if (!nx || !ny || !tmX || !tmY) {
    redirect("/location");
  }

  const weatherData = await requestWeatherInfo(nx as string, ny as string);

  /*
    카테고리
    - POP: 강수확률
    - PTY: 강수형태 (없음=0, 비=1, 비/눈=2, 눈=3, 소나기=4)
    - PCP: 1시간 강수량(mm)
    - REH: 습도(%)
    - SNO: 1시간 신적설(cm)
    - SKY: 하늘상태 (맑음=1, 구름조금=2, 구름많음=3, 흐림=4)
    - TMP: 1시간 기온(°C)
    - UUU: 풍속(동서성분, m/s)
    - VVV: 풍속(남북성분, m/s)
    - WAV: 파고(m)
    - VEC: 풍향(16방위, deg)
    - WSD: 풍속(m/s)
  */

  // 1단계: 날짜별 > 시간별 > 카테고리별로 원시 데이터를 그룹핑
  const rawGrouped = weatherData.reduce<Record<string, Record<string, Record<string, string>>>>((acc, cur) => {
    if (!acc[cur.fcstDate]) acc[cur.fcstDate] = {};
    if (!acc[cur.fcstDate][cur.fcstTime]) acc[cur.fcstDate][cur.fcstTime] = {};
    acc[cur.fcstDate][cur.fcstTime][cur.category] = cur.fcstValue;
    return acc;
  }, {});

  // SKY(하늘상태) + PTY(강수형태)를 결합하여 날씨 설명 문자열을 반환
  const getWeatherDescription = (sky: string, pty: string): string => {
    if (pty !== "0") {
      const ptyMap: Record<string, string> = { "1": "비", "2": "비/눈", "3": "눈", "4": "소나기" };
      return ptyMap[pty] || "알 수 없음";
    }
    const skyMap: Record<string, string> = { "1": "맑음", "2": "구름조금", "3": "구름많음", "4": "흐림" };
    return skyMap[sky] || "알 수 없음";
  };

  // 특정 시간 범위에서 대표 날씨 설명을 추출 (가장 빈도가 높은 날씨)
  const getRepresentativeWeather = (timeSlots: Record<string, Record<string, string>>, startHour: number, endHour: number): string => {
    const descriptions: string[] = [];
    for (const [time, categories] of Object.entries(timeSlots)) {
      const hour = parseInt(time.slice(0, 2), 10);
      if (hour >= startHour && hour < endHour) {
        descriptions.push(getWeatherDescription(categories.SKY || "1", categories.PTY || "0"));
      }
    }
    if (descriptions.length === 0) return "정보없음";
    // 가장 빈번한 날씨 설명을 반환
    const freq = descriptions.reduce<Record<string, number>>((acc, desc) => {
      acc[desc] = (acc[desc] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  };

  // 체감 기온 계산 (기온, 풍속 기반)
  // - 10°C 이하 & 풍속 4.8km/h 이상: 윈드칠 공식 적용
  // - 그 외: 실제 기온을 그대로 반환
  const calcFeelsLike = (temp: number, wind: number): number => {
    const windKmh = wind * 3.6; // m/s → km/h
    if (temp <= 10 && windKmh >= 4.8) {
      return Math.round((13.12 + 0.6215 * temp - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * temp * Math.pow(windKmh, 0.16)) * 10) / 10;
    }
    return temp;
  };

  // 체감 기온(preference 보정 포함)에 따른 의상 추천
  const getOutfit = (feelsLike: number): string[] => {
    if (feelsLike >= 28) return ["민소매", "반팔", "반바지", "원피스"];
    if (feelsLike >= 23) return ["반팔", "얇은 셔츠", "반바지", "면바지"];
    if (feelsLike >= 20) return ["블라우스", "긴팔 티", "면바지", "슬랙스"];
    if (feelsLike >= 17) return ["얇은 가디건", "니트", "맨투맨", "긴바지"];
    if (feelsLike >= 12) return ["자켓", "가디건", "야상", "스타킹"];
    if (feelsLike >= 9) return ["트렌치코트", "야상", "점퍼", "니트"];
    if (feelsLike >= 5) return ["울코트", "히트텍", "가죽자켓", "기모"];
    return ["패딩", "두꺼운 코트", "목도리", "기모"];
  };

  // 2단계: 날짜별로 요약 정보(최고/최저 기온, 오전/오후/저녁 날씨, 습도, 풍속, 체감기온, 의상)를 산출
  const preferenceOffset = Number(preference) || 0; // hot=1, cold=-1, normal=0
  const weatherInfo: WeatherInfoType = {};

  for (const [date, timeSlots] of Object.entries(rawGrouped)) {
    const temps: number[] = [];
    const humidities: number[] = [];
    const windSpeeds: number[] = [];

    for (const categories of Object.values(timeSlots)) {
      if (categories.TMP) temps.push(Number(categories.TMP));
      if (categories.REH) humidities.push(Number(categories.REH));
      if (categories.WSD) windSpeeds.push(Number(categories.WSD));
    }

    weatherInfo[date] = {
      detailed: timeSlots,
      tempMax: temps.length > 0 ? Math.max(...temps) : 0,
      tempMin: temps.length > 0 ? Math.min(...temps) : 0,
      morning: getRepresentativeWeather(timeSlots, 6, 12), // 06시~12시
      afternoon: getRepresentativeWeather(timeSlots, 12, 18), // 12시~18시
      evening: getRepresentativeWeather(timeSlots, 18, 24), // 18시~24시
      humidity: humidities.length > 0 ? Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length) : 0,
      windSpeed: windSpeeds.length > 0 ? Math.round((windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length) * 10) / 10 : 0,
      feelsLike: 0,
      outfit: [],
    };

    // 체감 기온 계산: 평균 기온과 평균 풍속을 기반으로 산출 후 선호도 보정 적용
    const avgTemp = temps.length > 0 ? temps.reduce((a, b) => a + b, 0) / temps.length : 0;
    const avgWind = windSpeeds.length > 0 ? windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length : 0;
    // 더위를 많이 타면(1) 체감 기온을 높게, 추위를 많이 타면(-1) 낮게 보정
    const feelsLike = Math.round((calcFeelsLike(avgTemp, avgWind) + preferenceOffset * 2) * 10) / 10;
    weatherInfo[date].feelsLike = feelsLike;
    weatherInfo[date].outfit = getOutfit(feelsLike);
  }

  const stationInfo = await requestStationInfo(tmX as string, tmY as string);
  const airPollution = await requestAirPollution(stationInfo.response.body.items[0].stationName);

  const airInfo = airPollution.response.body.items[0];

  return (
    <MainClientContainer weatherInfo={weatherInfo} airInfo={airInfo}>
      <MainServerBlock />
    </MainClientContainer>
  );
}
