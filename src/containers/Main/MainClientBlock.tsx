/**
 * MainClientBlock.tsx
 * 메인 페이지의 클라이언트 UI 컴포넌트 모음
 *
 * 현재 구현 예정 상태이며, 날씨 정보 및 옷차림 추천 UI가 추가될 예정
 */

"use client";

import { use } from "react";

import dayjs from "dayjs";

import { MainContext } from "./MainClientContainer";
import { MapPin, ThermometerSun, ThermometerSnowflake, ChevronRight, Sun, CloudSun, Cloud, Cloudy, CloudRain, CloudDrizzle, CloudSnow, CloudRainWind, User, Thermometer } from "lucide-react";

export function DateSelector({ date }: { date: string }) {
  const { selectedDate, setDateFunc } = use(MainContext);
  const dayName = dayjs(date).format("ddd");

  return (
    <button
      key={date}
      onClick={() => setDateFunc(date)}
      className={`
      flex flex-col items-center px-5 py-3 rounded-2xl min-w-20 transition-all cursor-pointer
      ${selectedDate === date ? "bg-white shadow-lg scale-105" : "bg-white/40 hover:bg-white/60"}
      `}>
      <span className={`text-xs mb-1 ${selectedDate === date ? "text-indigo-600" : "text-gray-600"}`}>{dayName}</span>
      <span className={`${selectedDate === date ? "text-gray-800" : "text-gray-700"}`}>{date}</span>
    </button>
  );
}

export function DateAndLocationCard() {
  const { address } = use(MainContext);

  return (
    <div className="flex items-center gap-2 mb-6">
      <MapPin className="w-5 h-5 text-indigo-400" />
      <span className="text-gray-700">{address}</span>
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

export function TempAndWeather() {
  const { selectedDateWeather } = use(MainContext);

  const weatherIcon = (weather: string) => {
    switch (weather) {
      case "맑음":
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case "구름 조금":
        return <CloudSun className="w-8 h-8 text-gray-400" />;
      case "구름 많음":
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case "흐림":
        return <Cloudy className="w-8 h-8 text-gray-600" />;
      case "비":
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "비/눈":
        return <CloudDrizzle className="w-8 h-8 text-blue-300" />;
      case "눈":
        return <CloudSnow className="w-8 h-8 text-blue-200" />;
      case "소나기":
        return <CloudRainWind className="w-8 h-8 text-blue-500" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-6">
      <div className="flex items-center justify-center gap-x-3">
        <ThermometerSnowflake className="w-8 h-8 text-blue-400" />
        <h2 className="text-5xl text-gray-800">{selectedDateWeather.tempMin}°</h2>
        <ThermometerSun className="w-8 h-8 text-rose-400" />
        <h2 className="text-5xl text-gray-800">{selectedDateWeather.tempMax}°</h2>
      </div>
      <div className="flex justify-center items-center gap-x-3">
        <div className="flex -space-x-3">
          <User className="w-8 h-8 text-gray-800" />
          <Thermometer className="w-8 h-8 text-gray-800" />
        </div>
        <h2 className="text-5xl text-gray-800">{selectedDateWeather.feelsLike}°</h2>
      </div>
      <div className="flex justify-between items-center gap-x-3">
        {weatherIcon(selectedDateWeather.morning)}
        <ChevronRight className="w-5 h-5 text-gray-400" />
        {weatherIcon(selectedDateWeather.afternoon)}
        <ChevronRight className="w-5 h-5 text-gray-400" />
        {weatherIcon(selectedDateWeather.evening)}
      </div>
    </div>
  );
}

export function OutfitItems() {
  const { selectedDateWeather } = use(MainContext);

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {selectedDateWeather.outfit.map((item, index) => (
        <div key={index} className={`px-4 py-2 rounded-full text-sm ${TempBgColor(selectedDateWeather.feelsLike)}`}>
          <span className={`text-sm ${TempTextColor(selectedDateWeather.feelsLike)}`}>{item}</span>
        </div>
      ))}
    </div>
  );
}
