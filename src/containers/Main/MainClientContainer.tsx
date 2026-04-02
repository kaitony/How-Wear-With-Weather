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
import { useRouter } from "next/navigation";

interface MainClientContainerProps {
  weatherInfo: WeatherInfoType;
  airInfo: AirInfoType;
  children: ReactNode;
}

interface MainContextType {
  selectedDate: string;
  selectedDateWeather: WeatherInfoType[string];
  changeLocationFunc: () => void;
  setDateFunc: (direction: "prev" | "next") => void;
  address: string;
  airInfo: AirInfoType;
}

export const MainContext = createContext({} as MainContextType);

export default function MainClientContainer({ weatherInfo, airInfo, children }: MainClientContainerProps) {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYYMMDD"));
  const [resolvedAddress, setResolvedAddress] = useState("");

  const { address } = useAddressStore();

  const selectedDateWeather = weatherInfo[selectedDate];

  // localStorage는 useEffect 내에서만 접근하여 서버/클라이언트 렌더링 불일치 방지
  useEffect(() => {
    if (address) {
      setResolvedAddress(address);
    } else {
      const saved = localStorage.getItem("hwww_location");
      if (saved) {
        setResolvedAddress(JSON.parse(saved).address);
      }
    }
  }, [address]);

  const changeLocationFunc = () => {
    router.push("/location");
  };

  const setDateFunc = (direction: "prev" | "next") => {
    const firstDate = dayjs(Object.keys(weatherInfo)[0]);
    const lastDate = dayjs(Object.keys(weatherInfo)[Object.keys(weatherInfo).length - 1]);
    const newDate = dayjs(selectedDate)
      .add(direction === "prev" ? -1 : 1, "day")
      .format("YYYYMMDD");

    if (dayjs(newDate).isBefore(firstDate) || dayjs(newDate).isAfter(lastDate)) {
      return; // 범위를 벗어나면 업데이트하지 않음
    } else {
      setSelectedDate(newDate);
    }
  };

  const mainContextValue = {
    selectedDate,
    selectedDateWeather,
    setDateFunc,
    changeLocationFunc,
    address: resolvedAddress,
    airInfo,
  };

  return <MainContext value={mainContextValue}>{children}</MainContext>;
}
