/**
 * LocationServerBlock.tsx
 * 위치 설정 페이지의 서버 레이아웃 컴포넌트
 *
 * 페이지의 전체 구조와 레이아웃을 정의하며,
 * 클라이언트 UI 컴포넌트(CurrentLocation, GeoLocationButton, SearchLocation, NextButton)를 배치한다.
 */

import Layout from "@/components/layout";

import { CurrentLocation, GeoLocationButton, SearchLocation, NextButton } from "./LocationClientBlock";

export default function LocationServerBlock() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col gap-y-4 max-w-md mx-auto w-full">
        <div className="pt-12 pb-8 flex flex-col gap-y-2">
          <h1 className="text-3xl text-gray-800 mb-2">어디에 계신가요?</h1>
          <p className="text-gray-600">위치를 기반으로 날씨에 맞는 옷차림을 추천해드릴게요.</p>
        </div>

        <div className="flex-1 flex flex-col gap-y-4">
          <CurrentLocation />
          <GeoLocationButton />
          <SearchLocation />
        </div>

        <div className="pt-8 pb-6">
          <NextButton />
        </div>
      </div>
    </Layout>
  );
}
