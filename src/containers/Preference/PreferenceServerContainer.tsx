/**
 * PreferenceServerContainer.tsx
 * 선호도 설정 페이지의 최상위 서버 컨테이너
 *
 * 클라이언트 컨테이너(PreferenceClientContainer)로 서버 블록(PreferenceServerBlock)을 감싸
 * Context를 통해 상태와 로직을 하위 컴포넌트에 전달하는 구조를 형성한다.
 */

import PreferenceClientContainer from "./PreferenceClientContainer";
import PreferenceServerBlock from "./PreferenceServerBlock";

export default function PreferenceServerContainer() {
  return (
    <PreferenceClientContainer>
      <PreferenceServerBlock />
    </PreferenceClientContainer>
  );
}
