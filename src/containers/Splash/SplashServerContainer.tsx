/**
 * SplashServerContainer.tsx
 * 스플래시 페이지의 최상위 서버 컨테이너
 *
 * 클라이언트 컨테이너(SplashClientContainer)로 서버 블록(SplashServerBlock)을 감싸
 * 리다이렉트 로직을 포함한 클라이언트 컨테이너가 레이아웃을 감싸는 구조.
 */

import SplashClientContainer from "./SplashClientContainer";
import SplashServerBlock from "./SplashServerBlock";

export default function SplashServerContainer() {
  return (
    <SplashClientContainer>
      <SplashServerBlock />
    </SplashClientContainer>
  );
}
