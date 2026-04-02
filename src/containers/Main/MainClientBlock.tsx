/**
 * MainClientBlock.tsx
 * 메인 페이지의 클라이언트 UI 컴포넌트 모음
 *
 * 현재 구현 예정 상태이며, 날씨 정보 및 옷차림 추천 UI가 추가될 예정
 */

"use client";

import { use } from "react";

import Image from "next/image";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import { MapPin, ChevronRight, Sun, CloudSun, Cloud, Cloudy, CloudRain, CloudDrizzle, CloudSnow, CloudRainWind, Settings, ChevronLeft, Wind, Droplets } from "lucide-react";

import { Button } from "@/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";

import { maleOutfit, femaleOutfit, airIcons } from "@/configs/urls";

import { MainContext } from "./MainClientContainer";

export function DateSelector() {
  const { address, selectedDate, setDateFunc, changeLocationFunc } = use(MainContext);
  const formattedDate = dayjs(selectedDate).format("M월 D일 (ddd)");
  const todayCheck = dayjs(selectedDate).isSame(dayjs(), "day");

  return (
    <header className="w-full flex justify-center bg-white px-6 py-8 shadow-sm">
      <div className="w-full max-w-md flex flex-col gap-y-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <p className="text-sm font-bold text-gray-400">{address}</p>
          </div>
          <Button variant="ghost" size="icon-lg" onClick={changeLocationFunc}>
            <Settings className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setDateFunc("prev")}>
            <ChevronLeft className="w-6 h-6 text-gray-300" />
          </Button>
          <div className="text-center">
            <div className="text-lg font-bold">{formattedDate}</div>
            <div className="text-xs text-blue-500 font-semibold">{todayCheck ? "TODAY" : ""}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setDateFunc("next")}>
            <ChevronRight className="w-6 h-6 text-gray-300" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export function NeedMaskTag() {
  const { airInfo, selectedDate } = use(MainContext);
  const needMask = airInfo.pm10Grade === "3" || airInfo.pm10Grade === "4" || airInfo.pm25Grade === "3" || airInfo.pm25Grade === "4";
  const todayCheck = dayjs(selectedDate).isSame(dayjs(), "day");

  return (
    <div className={`flex justify-end ${needMask && todayCheck ? "" : "hidden"}`}>
      <Tooltip>
        <TooltipTrigger className="flex">
          <div className="rounded-md bg-amber-50 p-2">
            <Image src={airIcons.mask} alt="마스크 아이콘" width={30} height={30} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            미세먼지 농도가 높아요.
            <br />
            마스크를 챙기세요.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function OutfitImage() {
  const { selectedDateWeather } = use(MainContext);

  const forMale = selectedDateWeather.feelsLike >= 23 ? maleOutfit.hot : selectedDateWeather.feelsLike >= 17 ? maleOutfit.warm : selectedDateWeather.feelsLike >= 9 ? maleOutfit.cool : maleOutfit.cold;
  const forFemale = selectedDateWeather.feelsLike >= 23 ? femaleOutfit.hot : selectedDateWeather.feelsLike >= 17 ? femaleOutfit.warm : selectedDateWeather.feelsLike >= 9 ? femaleOutfit.cool : femaleOutfit.cold;

  return (
    <div className="flex space-x-2">
      <div className="flex-1">
        <Image src={forMale} alt="남성용 더운 날씨 의상" width={290} height={530} loading="eager" className="w-full" />
      </div>
      <div className="flex-1">
        <Image src={forFemale} alt="여성용 더운 날씨 의상" width={290} height={530} loading="eager" className="w-full" />
      </div>
    </div>
  );
}

const TempBgColor = (temp: number) => {
  switch (true) {
    case temp >= 28:
      return "bg-rose-100";
    case temp >= 23:
      return "bg-orange-100";
    case temp >= 20:
      return "bg-yellow-100";
    case temp >= 17:
      return "bg-green-100";
    case temp >= 12:
      return "bg-cyan-100";
    case temp >= 9:
      return "bg-blue-100";
    case temp >= 5:
      return "bg-indigo-100";
    default:
      return "bg-gray-100";
  }
};

const TempTextColor = (temp: number) => {
  switch (true) {
    case temp >= 28:
      return "text-rose-700";
    case temp >= 23:
      return "text-orange-700";
    case temp >= 20:
      return "text-yellow-700";
    case temp >= 17:
      return "text-green-700";
    case temp >= 12:
      return "text-cyan-700";
    case temp >= 9:
      return "text-blue-700";
    case temp >= 5:
      return "text-indigo-700";
    default:
      return "text-gray-700";
  }
};

const weatherIcon = (weather: string) => {
  switch (weather) {
    case "맑음":
      return <Sun size={30} className="text-yellow-400" />;
    case "구름 조금":
      return <CloudSun size={30} className="text-gray-400" />;
    case "구름 많음":
      return <Cloud size={30} className="text-gray-500" />;
    case "흐림":
      return <Cloudy size={30} className="text-gray-600" />;
    case "비":
      return <CloudRain size={30} className="text-blue-400" />;
    case "비/눈":
      return <CloudDrizzle size={30} className="text-blue-300" />;
    case "눈":
      return <CloudSnow size={30} className="text-blue-200" />;
    case "소나기":
      return <CloudRainWind size={30} className="text-blue-500" />;
    default:
      return <Sun size={30} className="text-yellow-400" />;
  }
};

export function OutfitItems() {
  const { selectedDateWeather } = use(MainContext);

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {selectedDateWeather.outfit.map((item, index) => (
        <div key={index} className={`px-4 py-2 rounded-full text-sm ${TempBgColor(selectedDateWeather.feelsLike)}`}>
          <span className={`text-sm font-medium ${TempTextColor(selectedDateWeather.feelsLike)}`}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function Weather() {
  const { selectedDateWeather } = use(MainContext);

  return (
    <div className="flex flex-col gap-y-1">
      <div className="w-full flex items-center gap-x-3">
        <div className="flex flex-1 flex-col items-center gap-y-2">
          <p className="text-sm text-gray-400 font-bold">아침</p>
          {weatherIcon(selectedDateWeather.morning)}
        </div>
        <div className="flex flex-1 flex-col items-center gap-y-2">
          <div className="w-full h-5" />
          <ChevronRight size={20} className="text-gray-400" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-y-2">
          <p className="text-sm text-gray-400 font-bold">오후</p>
          {weatherIcon(selectedDateWeather.afternoon)}
        </div>
        <div className="flex flex-1 flex-col items-center gap-y-2">
          <div className="w-full h-5" />
          <ChevronRight size={20} className="text-gray-400" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-y-2">
          <p className="text-sm text-gray-400 font-bold">저녁</p>
          {weatherIcon(selectedDateWeather.evening)}
        </div>
      </div>
    </div>
  );
}

export function Temperature() {
  const { selectedDateWeather } = use(MainContext);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-6">
      <div className="w-full flex gap-x-3">
        <div className="flex flex-1 flex-col items-center">
          <p className="text-sm text-gray-400 font-bold">최저온도</p>
          <h5 className="text-2xl font-bold">{selectedDateWeather.tempMin}°</h5>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <p className="text-sm text-gray-400 font-bold">최고온도</p>
          <h5 className="text-2xl font-bold">{selectedDateWeather.tempMax}°</h5>
        </div>
        <div className="flex flex-1 flex-col items-center">
          <p className="text-sm text-gray-400 font-bold">체감온도</p>
          <h5 className="text-2xl font-bold">{selectedDateWeather.feelsLike}°</h5>
        </div>
      </div>
    </div>
  );
}

export function WindSpeed() {
  const { selectedDateWeather } = use(MainContext);

  return (
    <div className="flex items-center gap-x-2">
      <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
        <Wind size={20} />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-400 font-bold">풍속</p>
        <h5 className="text-2xl font-bold">{selectedDateWeather.windSpeed}m/s</h5>
      </div>
    </div>
  );
}

export function Humidity() {
  const { selectedDateWeather } = use(MainContext);

  return (
    <div className="flex items-center gap-x-2">
      <div className="bg-teal-50 p-2 rounded-lg text-teal-500">
        <Droplets size={20} />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-400 font-bold">습도</p>
        <h5 className="text-2xl font-bold">{selectedDateWeather.humidity}%</h5>
      </div>
    </div>
  );
}

export function FineDust() {
  const { airInfo, selectedDate } = use(MainContext);
  const todayCheck = dayjs(selectedDate).isSame(dayjs(), "day");

  const fineDustGrade = airInfo.pm10Grade === "1" ? "좋음" : airInfo.pm10Grade === "2" ? "보통" : airInfo.pm10Grade === "3" ? "나쁨" : airInfo.pm10Grade === "4" ? "매우 나쁨" : "알 수 없음";

  return (
    <div className={`max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col gap-y-6 ${todayCheck ? "" : "hidden"}`}>
      <div className="flex items-center gap-x-2">
        <div className="bg-amber-50 p-2 rounded-lg">
          <Image src={airIcons.mist} alt="초미세먼지 아이콘" width={20} height={20} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 font-bold">미세먼지</p>
          <h5 className="text-xl font-bold">
            {fineDustGrade} ({airInfo.pm10Value}㎍/m³)
          </h5>
        </div>
      </div>
    </div>
  );
}

export function UltraFineDust() {
  const { airInfo, selectedDate } = use(MainContext);
  const todayCheck = dayjs(selectedDate).isSame(dayjs(), "day");

  const ultraFineDustGrade = airInfo.pm25Grade === "1" ? "좋음" : airInfo.pm25Grade === "2" ? "보통" : airInfo.pm25Grade === "3" ? "나쁨" : airInfo.pm25Grade === "4" ? "매우 나쁨" : "알 수 없음";

  return (
    <div className={`max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col gap-y-6 ${airInfo.pm25Grade && todayCheck ? "" : "hidden"}`}>
      <div className="flex items-center gap-x-2">
        <div className="bg-amber-50 p-2 rounded-lg">
          <Image src={airIcons.mist} alt="초미세먼지 아이콘" width={20} height={20} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400 font-bold">초미세먼지</p>
          <h5 className="text-xl font-bold">
            {ultraFineDustGrade} ({airInfo.pm25Value}㎍/m³)
          </h5>
        </div>
      </div>
    </div>
  );
}
