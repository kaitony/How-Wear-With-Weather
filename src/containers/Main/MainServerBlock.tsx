/**
 * MainServerBlock.tsx
 * 메인 페이지의 서버 레이아웃 컴포넌트
 *
 * 날씨 정보와 옷차림 추천을 보여주는 메인 화면의 레이아웃을 정의한다.
 * 현재 기본 그라데이션 배경만 적용된 상태.
 */

import Layout from "@/components/layout";

import { DateSelector, Weather, Temperature, OutfitItems, WindSpeed, Humidity, OutfitImage, NeedMaskTag, FineDust, UltraFineDust } from "./MainClientBlock";

export default function MainServerBlock() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col mx-auto w-full">
        {/* Date Selector */}
        <DateSelector />

        {/* Main Content */}
        <div className="flex flex-col items-center p-6 gap-y-5">
          {/* Main Outfit Card */}
          <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-xl flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <NeedMaskTag />
              <OutfitImage />
              <h3 className="text-xl text-center font-bold mb-4">오늘의 추천 코디</h3>
              <OutfitItems />
            </div>
            <div className="w-full h-px bg-gray-200" />
            <Temperature />
          </div>

          <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col gap-y-6">
            <Weather />
          </div>

          <div className="max-w-md w-full flex space-x-6">
            <div className="flex-1 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col gap-y-6">
              <WindSpeed />
            </div>
            <div className="flex-1 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl flex flex-col gap-y-6">
              <Humidity />
            </div>
          </div>

          <FineDust />
          <UltraFineDust />
        </div>
      </div>
    </Layout>
  );
}
