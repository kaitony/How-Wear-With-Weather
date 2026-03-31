/**
 * SplashServerBlock.tsx
 * 스플래시 페이지의 서버 레이아웃 컴포넌트
 *
 * 앱 로고와 타이틀("How Wear with Weather"), 서브 타이틀을 표시하는
 * 스플래시 화면의 레이아웃을 정의한다.
 */

import Image from "next/image";

import Layout from "@/components/layout";

import { logo } from "@/configs/urls";

export default function SplashServerBlock() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <Logo />
        <h1 className="text-4xl text-center font-bold tracking-tight text-gray-700">
          How Wear
          <br />
          <span className="text-3xl text-red-400">with </span>
          Weather
        </h1>
        <p className="text-md font-semibold text-gray-500 tracking-wide">날씨에 맞게, 스마트하게</p>
      </div>
    </Layout>
  );
}

/** 로고 이미지 컴포넌트 */
function Logo() {
  return <Image src={logo} alt="Logo" width={120} height={120} loading="eager" />;
}
