/**
 * requestAirApi.ts
 * 에어코리아 API 호출 함수
 *
 * 한국환경공단 대기오염정보 조회 서비스를 사용하여
 * TM 좌표 기반으로 근처 측정소를 찾고, 해당 측정소의 실시간 대기질 데이터를 가져온다.
 */

/**
 * 측정소 정보 API 응답 타입
 * TM 좌표를 기반으로 근처 측정소 목록을 반환한다.
 */
interface StationInfoResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      totalCount: number;
      items: {
        stationCode: string;
        tm: number;
        addr: string;
        stationName: string;
      }[];
      pageNo: number;
      numOfRows: number;
    };
  };
}

/**
 * 대기오염 측정 데이터 API 응답 타입
 * 측정소별 실시간 미세먼지, 초미세먼지, 오존, 이산화질소 등의 농도와 등급을 포함한다.
 */
interface AirPollutionResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      totalCount: number;
      items: AirInfoType[];
      pageNo: number;
      numOfRows: number;
    };
  };
}

/**
 * TM 좌표로 근처 측정소 정보 조회
 *
 * 주어진 TM 좌표 근처의 대기질 측정소 목록을 반환한다.
 * 갖장 가까운 측정소를 찾아 해당 지역의 대기질 데이터를 조회하는 데 사용된다.
 *
 * @param tmX - TM X 좌표
 * @param tmY - TM Y 좌표
 * @returns 근처 측정소 목록
 * @throws API 요청 실패 시 오류
 */
export async function requestStationInfo(tmX: string, tmY: string): Promise<StationInfoResponse> {
  const response = await fetch(`https://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${tmX}&tmY=${tmY}&returnType=json&serviceKey=${process.env.NEXT_PUBLIC_AIR_KOREA_STATION_INFO_API_KEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const data: StationInfoResponse = await response.json();
  return data;
}

/**
 * 측정소명으로 실시간 대기오염 데이터 조회
 *
 * 지정된 측정소의 실시간 대기오염 측정 데이터를 반환한다.
 * 미세먼지(PM10), 초미세먼지(PM2.5) 등의 농도와 등급을 포함한다.
 * 1시간마다 캐시가 갱신된다.
 *
 * @param stationName - 측정소 이름 (예: "종로구")
 * @returns 실시간 대기오염 데이터
 * @throws API 요청 실패 시 오류
 */
export async function requestAirPollution(stationName: string): Promise<AirPollutionResponse> {
  const response = await fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${encodeURIComponent(stationName)}&dataTerm=DAILY&returnType=json&serviceKey=${process.env.NEXT_PUBLIC_AIR_KOREA_AIR_INFO_API_KEY}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: { revalidate: 3600 }, // 1시간마다 재검증하여 캐시 갱신
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const data: AirPollutionResponse = await response.json();
  return data;
}
