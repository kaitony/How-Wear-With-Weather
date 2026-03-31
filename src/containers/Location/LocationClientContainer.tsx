"use client";

import { createContext, Dispatch, ReactNode, useState } from "react";

import { useRouter } from "next/navigation";

import * as z from "zod";

import { useLocationStore } from "@/states/location";

import { addressToGeoLocation, geoLocationToRegionCode } from "@/utils/requestLocalApi";

interface LocationContextType {
  addressState: string;
  getGeolocationFunc: () => void;
  nextButtonClickFunc: () => void;
}

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

  const { setLocation } = useLocationStore();

  const getGeolocationFunc = async () => {
    typeof window !== "undefined"
      ? window.navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const regionCode = await geoLocationToRegionCode(latitude, longitude);
            const hRegion = regionCode.documents.filter((doc) => doc.region_type === "H")[0];
            const bRegion = regionCode.documents.filter((doc) => doc.region_type === "B")[0];

            setAddressState(hRegion.address_name || bRegion.address_name);
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

  const searchLocationFunc = async (value: string) => {
    setSubmitError(null);
    const data = await addressToGeoLocation(value);
    if (data.meta.total_count === 0) {
      setSubmitError("검색 결과가 없습니다. 주소를 다시 입력해주세요.");
    } else {
      setAddressDialogOpen(false);
      const address = data.documents[0].address.region_1depth_name + " " + data.documents[0].address.region_2depth_name + " " + (data.documents[0].address.region_3depth_h_name || data.documents[0].address.region_3depth_name);
      setAddressState(address);
    }
  };

  const nextButtonClickFunc = () => {
    router.push("/preference");
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
