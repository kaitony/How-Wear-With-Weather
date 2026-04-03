/**
 * Vitest 설정 파일
 * Next.js 프로젝트를 위한 Vitest 테스트 환경 구성
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // 테스트 환경 (jsdom: 브라우저 환경 시뮬레이션)
    environment: "jsdom",

    // 글로벌 설정 파일
    setupFiles: ["./vitest.setup.ts"],

    // 글로벌 API 사용 (describe, it, expect 등을 import 없이 사용)
    globals: true,

    // CSS 모듈 모킹
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },

    // 커버리지 설정
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: ["src/**/*.d.ts", "src/**/*.stories.{js,jsx,ts,tsx}", "src/**/__tests__/**"],
    },

    // 테스트 파일 패턴
    include: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

    // 제외할 경로
    exclude: ["node_modules", ".next", "dist"],

    // 테스트 타임아웃
    testTimeout: 30000,

    // 워커 설정
    pool: "forks",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
