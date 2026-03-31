/**
 * MainClientContainer.tsx
 * 메인 페이지의 클라이언트 상태 관리 컨테이너
 *
 * 하위 컴포넌트에 클라이언트 상태와 로직을 제공하기 위한 래퍼 컴포넌트.
 * 현재는 children을 그대로 렌더링하며, 추후 날씨/옷차림 관련 상태 관리가 추가될 예정.
 */

"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import dayjs from "dayjs";

import { useAddressStore } from "@/states/location";

interface MainClientContainerProps {
  weatherInfo: WeatherInfoType;
  children: ReactNode;
}

interface MainContextType {
  selectedDate: string;
  selectedDateWeather: WeatherInfoType[string];
  setDateFunc: (date: string) => void;
  address: string;
}

export const MainContext = createContext({} as MainContextType);

export default function MainClientContainer({ weatherInfo, children }: MainClientContainerProps) {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYYMMDD"));
  const [resolvedAddress, setResolvedAddress] = useState("");

  const { address } = useAddressStore();

  const selectedDateWeather = weatherInfo[selectedDate];

  // localStorage는 useEffect 내에서만 접근하여 서버/클라이언트 렌더링 불일치 방지
  useEffect(() => {
    if (address) {
      setResolvedAddress(address);
    } else {
      const saved = localStorage.getItem("location");
      if (saved) {
        setResolvedAddress(JSON.parse(saved).address);
      }
    }
  }, [address]);

  const setDateFunc = (date: string) => {
    setSelectedDate(date);
  };

  const mainContextValue = {
    selectedDate,
    selectedDateWeather,
    setDateFunc,
    address: resolvedAddress,
  };

  return <MainContext value={mainContextValue}>{children}</MainContext>;
}
