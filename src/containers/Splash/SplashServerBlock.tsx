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

import { RedirectButton, SubTitle } from "./SplashClientBlock";

export default function SplashServerBlock() {
  return (
    <Layout>
      <RedirectButton>
        <div className="min-h-screen flex flex-col justify-center items-center gap-y-8 animate-fade-in">
          <Logo />
          <h1 className="text-2xl text-center font-bold tracking-tight text-gray-700 leading-snug">How Wear with Weather</h1>
          <SubTitle />
          <p className="mt-6 text-sm text-gray-400 animate-pulse">화면을 터치해서 시작하세요</p>
        </div>
      </RedirectButton>
    </Layout>
  );
}

/** 로고 이미지 컴포넌트 */
function Logo() {
  return (
    <div className="bg-white rounded-full flex items-center justify-center shadow-lg p-10">
      <Image src={logo} alt="Logo" width={90} height={90} loading="eager" />
    </div>
  );
}
