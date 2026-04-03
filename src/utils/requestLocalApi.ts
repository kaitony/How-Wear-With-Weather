/**
 * requestLocalApi.ts
 * 카카오 로컬 API 호출 함수
 *
 * 카카오 지도 API를 사용하여 주소 검색, 좌표 변환, 행정구역 코드 조회 등을 수행한다.
 * - 주소 → 좌표 변환
 * - 좌표 → 행정구역 코드 변환
 * - WGS84 좌표계 → TM 좌표계 변환
 */

/**
 * 주소 검색 API 응답 타입
 * 주소 문자열을 입력하면 해당하는 좌표와 상세 주소 정보를 반환한다.
 */
interface AddressToGeoLocationResponse {
  documents: {
    address: {
      address_name: string;
      b_code: string;
      h_code: string;
      main_address_no: string;
      mountain_yn: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_h_name: string;
      region_3depth_name: string;
      sub_address_no: string;
      x: string;
      y: string;
    };
    address_name: string;
    address_type: string;
    road_address: {
      address_name: string;
      building_name: string;
      main_building_no: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      road_name: string;
      sub_building_no: string;
      underground_yn: string;
      x: string;
      y: string;
      zone_no: string;
    };
    x: string;
    y: string;
  }[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

/**
 * 좌표로 행정구역 코드 조회 API 응답 타입
 * 위경도 좌표를 입력하면 해당 위치의 행정구역 코드를 반환한다.
 * 행정구역 코드를 통해 기상청 격자 좌표(nx, ny)를 찾는 데 사용된다.
 */
interface GeoLocationToRegionCodeResponse {
  meta: {
    total_count: number;
  };
  documents: {
    region_type: string;
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_4depth_name: string;
    code: string;
    x: number;
    y: number;
  }[];
}

/**
 * 좌표계 변환 API 응답 타입
 * WGS84 좌표계를 TM 좌표계로 변환한다.
 * TM 좌표는 대기질 측정소 검색에 사용된다.
 */
interface TransCoordResponse {
  meta: {
    total_count: number;
  };
  documents: {
    x: number;
    y: number;
  }[];
}

/**
 * 주소 문자열을 좌표로 변환
 *
 * 사용자가 입력한 주소를 검색하여 해당 위치의 위경도 좌표를 반환한다.
 * 카카오 로컬 API의 주소 검색 API를 사용한다.
 *
 * @param address - 검색할 주소 (예: "서울특별시 강남구 테헤란로 123")
 * @returns 주소 검색 결과 (좌표 및 상세 주소 포함)
 * @throws 주소 검색 실패 시 오류
 */
export async function addressToGeoLocation(address: string): Promise<AddressToGeoLocationResponse> {
  const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch geolocation for address: ${address}`);
  }

  const data = await response.json();

  return data;
}

/**
 * 좌표로 행정구역 코드 조회
 *
 * 위경도 좌표를 입력하면 해당 위치의 행정구역 코드(H)와 법정구역 코드(B)를 반환한다.
 * 행정동 코드는 region_coords.json에서 기상청 격자 좌표(nx, ny)를 찾는 데 사용된다.
 *
 * @param latitude - 위도
 * @param longitude - 경도
 * @returns 행정구역 코드 정보
 * @throws 행정구역 코드 조회 실패 시 오류
 */
export async function geoLocationToRegionCode(latitude: number, longitude: number): Promise<GeoLocationToRegionCodeResponse> {
  const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch region code for coordinates: ${latitude}, ${longitude}`);
  }

  const data = await response.json();

  return data;
}

/**
 * WGS84 좌표계를 TM 좌표계로 변환
 *
 * 대기질 측정소 검색 API는 TM 좌표계를 사용하므로,
 * GPS나 카카오 API에서 얻은 WGS84 좌표를 TM 좌표로 변환하는 데 사용된다.
 *
 * @param latitude - WGS84 위도
 * @param longitude - WGS84 경도
 * @returns TM 좌표 (x, y)
 * @throws 좌표 변환 실패 시 오류
 */
export async function transCoord(latitude: number, longitude: number): Promise<TransCoordResponse> {
  const response = await fetch(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${latitude}&y=${longitude}&input_coord=WGS84&output_coord=TM`, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transformed coordinates: ${latitude}, ${longitude}`);
  }

  const data = await response.json();

  return data;
}
