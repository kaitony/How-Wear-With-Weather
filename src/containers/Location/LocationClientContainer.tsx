/**
 * LocationClientContainer.tsx
 * 위치 설정 페이지의 클라이언트 상태 관리 컨테이너
 *
 * Context를 통해 하위 컴포넌트에 상태와 함수를 전달한다.
 * - LocationContext: 주소 상태, GPS 위치 가져오기, 다음 버튼 클릭 등
 * - LocationDialogContext: 주소 검색 다이얼로그 상태, 폼 스키마, 검색 함수 등
 *
 * 주요 로직:
 * - getGeolocationFunc: 브라우저 Geolocation API로 좌표를 가져와 행정구역 코드로 변환 후 nx/ny 격자 좌표 설정
 * - searchLocationFunc: 주소 문자열을 카카오 API로 검색하여 좌표와 주소를 설정
 * - nextButtonClickFunc: 설정된 위치 정보를 localStorage에 저장하고 선호도 페이지로 이동
 */

"use client";

import { createContext, Dispatch, ReactNode, useState } from "react";

import { useRouter } from "next/navigation";

import * as z from "zod";

import { useAddressStore, useLocationStore } from "@/states/location";

import region_coords from "@/configs/region_coords.json";
import { addressToGeoLocation, geoLocationToRegionCode } from "@/utils/requestLocalApi";

/** 위치 관련 기본 Context 타입 - 주소 상태 및 위치 관련 액션 함수 */
interface LocationContextType {
  addressState: string;
  getGeolocationFunc: () => void;
  nextButtonClickFunc: () => void;
}

/** 주소 검색 다이얼로그 전용 Context 타입 - 다이얼로그 상태, 폼 스키마, 검색 함수 */
interface LocationDialogContextType {
  addressDialogOpen: boolean;
  submitError: string | null;
  setAddressDialogOpen: Dispatch<React.SetStateAction<boolean>>;
  locationFormSchema: z.ZodObject<{ address: z.ZodString }>;
  searchLocationFunc: (value: string) => Promise<void>;
}

export const LocationContext = createContext({} as LocationContextType);
export const LocationDialogContext = createContext({} as LocationDialogContextType);

export default function LocationClientContainer({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [addressState, setAddressState] = useState("");
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { latitude, longitude, setLocation } = useLocationStore();
  const { setAddress } = useAddressStore();

  const preference = typeof window !== "undefined" ? localStorage.getItem("hwww_preference") : null;

  /** 브라우저 Geolocation API를 사용하여 현재 위치의 좌표를 가져오고, 행정구역 코드를 통해 기상청 격자 좌표(nx, ny)로 변환 */
  const getGeolocationFunc = async () => {
    typeof window !== "undefined"
      ? window.navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // 위경도 좌표를 행정구역 코드로 변환
            const regionCode = await geoLocationToRegionCode(latitude, longitude);
            const hRegion = regionCode.documents.filter((doc) => doc.region_type === "H")[0]; // H: 행정동
            const bRegion = regionCode.documents.filter((doc) => doc.region_type === "B")[0]; // B: 법정동
            // 행정동 코드를 기반으로 기상청 격자 좌표(nx, ny) 추출
            const coord = region_coords[hRegion.code as keyof typeof region_coords];
            const nx = coord.nx;
            const ny = coord.ny;

            setAddressState(hRegion.address_name || bRegion.address_name);
            setLocation(nx, ny);
            setAddress(hRegion.address_name || bRegion.address_name);
          },
          (error) => {
            if (error.message === "User denied Geolocation") {
              alert("위치 정보 사용이 거부되었습니다. 주소 검색을 이용해주세요.");
            } else {
              console.error("Geolocation error:", error);
            }
          },
        )
      : console.error("Geolocation is not supported in this environment.");
  };

  const locationFormSchema = z.object({
    address: z.string().min(1, "주소를 입력해주세요."),
  });

  /** 주소 문자열을 검색하여 위치 정보를 설정하는 함수 */
  const searchLocationFunc = async (value: string) => {
    setSubmitError(null);
    const data = await addressToGeoLocation(value);
    if (data.meta.total_count === 0) {
      setSubmitError("검색 결과가 없습니다. 주소를 다시 입력해주세요.");
    } else {
      setAddressDialogOpen(false);
      const address = data.documents[0].address.region_1depth_name + " " + data.documents[0].address.region_2depth_name + " " + (data.documents[0].address.region_3depth_h_name || data.documents[0].address.region_3depth_name);
      const coord = region_coords[data.documents[0].address.h_code as keyof typeof region_coords];
      const nx = coord.nx;
      const ny = coord.ny;

      setAddressState(address);
      setLocation(nx, ny);
      setAddress(address);
    }
  };

  /** 설정된 위치 정보를 localStorage에 저장하고 선호도 설정 페이지로 이동 */
  const nextButtonClickFunc = () => {
    typeof window !== "undefined" ? localStorage.setItem("hwww_location", JSON.stringify({ address: addressState, latitude: latitude, longitude: longitude })) : null;

    if (!preference) {
      router.push("/preference");
    } else {
      router.push(`/main?preference=${preference}&latitude=${latitude}&longitude=${longitude}`);
    }
  };

  const locationContextValue: LocationContextType = {
    addressState,
    getGeolocationFunc,
    nextButtonClickFunc,
  };

  const locationDialogContextValue: LocationDialogContextType = {
    addressDialogOpen,
    submitError,
    locationFormSchema,
    setAddressDialogOpen,
    searchLocationFunc,
  };

  return (
    <LocationContext value={locationContextValue}>
      <LocationDialogContext value={locationDialogContextValue}>{children}</LocationDialogContext>
    </LocationContext>
  );
}
