import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 독립 실행형 출력 모드 (Docker 컨테이너 등에서 사용하기 위한 최소 파일만 포함)
  output: "standalone",

  // React 컴파일러 활성화 (자동 메모이제이션 및 성능 최적화)
  reactCompiler: true,

  // 로깅 설정
  logging: {
    fetches: {
      // fetch 요청 시 전체 URL 표시
      fullUrl: true,
    },
  },

  // 이미지 최적화 설정
  images: {
    // 외부 이미지 호스트 허용 패턴
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
