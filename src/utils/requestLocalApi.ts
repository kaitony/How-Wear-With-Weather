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
    } | null;
    x: string;
    y: string;
  }[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

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
