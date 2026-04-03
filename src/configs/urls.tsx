/**
 * urls.tsx
 * 애플리케이션에서 사용하는 이미지 및 아이콘 경로 상수 정의
 *
 * 로고, 성별/날씨별 옷차림 이미지, 대기질 관련 아이콘 등
 * 각종 정적 리소스 경로를 중앙에서 관리한다.
 */

/** 앱 로고 이미지 경로 */
export const logo = "/images/Logo.png";

/**
 * 남성 옷차림 이미지 경로 (체감 온도별)
 * - hot: 28°C 이상
 * - warm: 23°C ~ 28°C
 * - cool: 9°C ~ 23°C
 * - cold: 9°C 미만
 */
export const maleOutfit = {
  hot: "/images/male_hot.png",
  warm: "/images/male_warm.png",
  cool: "/images/male_cool.png",
  cold: "/images/male_cold.png",
};

/**
 * 여성 옷차림 이미지 경로 (체감 온도별)
 * - hot: 28°C 이상
 * - warm: 23°C ~ 28°C
 * - cool: 9°C ~ 23°C
 * - cold: 9°C 미만
 */
export const femaleOutfit = {
  hot: "/images/female_hot.png",
  warm: "/images/female_warm.png",
  cool: "/images/female_cool.png",
  cold: "/images/female_cold.png",
};

/**
 * 대기질 관련 아이콘 경로
 * - mask: 마스크 아이콘 (미세먼지 높을 때 표시)
 * - mist: 안개/미세먼지 아이콘
 */
export const airIcons = {
  mask: "/icons/medical_mask.svg",
  mist: "/icons/mist.svg",
};
