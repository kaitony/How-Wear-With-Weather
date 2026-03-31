/**
 * MainServerBlock.tsx
 * 메인 페이지의 서버 레이아웃 컴포넌트
 *
 * 날씨 정보와 옷차림 추천을 보여주는 메인 화면의 레이아웃을 정의한다.
 * 현재 기본 그라데이션 배경만 적용된 상태.
 */

import Layout from "@/components/layout";

import { DateAndLocationCard, DateSelector, TempAndWeather, OutfitItems } from "./MainClientBlock";

interface MainServerBlockProps {
  weatherInfo: WeatherInfoType;
}

export default function MainServerBlock({ weatherInfo }: MainServerBlockProps) {
  return (
    <Layout>
      {/* Date Selector */}
      <div className="rounded-md bg-white/60 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-lg flex items-center justify-between gap-x-3 overflow-x-auto px-4 py-3">
          {Object.keys(weatherInfo).map((date, index) => (
            <DateSelector key={index} date={date} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col px-6 pt-6 max-w-lg">
        <DateAndLocationCard />

        {/* Main Outfit Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl mb-6 flex flex-col gap-y-6">
          <TempAndWeather />
          <OutfitItems />
        </div>
      </div>
    </Layout>
  );
}
