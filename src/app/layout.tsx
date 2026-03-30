// Next.js 메타데이터 타입 및 폰트 관련 import
import type { Metadata } from "next";

import "./globals.css";

import { Noto_Sans_KR, Inter } from "next/font/google";
import localFont from "next/font/local";

// Google 폰트: Noto Sans KR (한글 지원)
const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans",
  display: "swap",
});

// Google 폰트: Inter (영문)
const inter = Inter({
  variable: "--font-inter",
  display: "swap",
});

// 로컬 폰트: Pretendard
const pretendard = localFont({
  variable: "--font-pretendard",
  display: "swap",
  src: "../../public/fonts/Pretendard.woff2",
});

// 페이지 메타데이터 설정
export const metadata: Metadata = {
  title: "Next.js Basement",
  description: "Next.js 기반의 최신 베이스 템플릿입니다.",
};

// 루트 레이아웃 컴포넌트
// 모든 페이지에서 공통으로 사용되는 HTML 구조를 정의
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${inter.variable} ${pretendard.variable}`}>
      <body>{children}</body>
    </html>
  );
}
