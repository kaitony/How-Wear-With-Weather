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
