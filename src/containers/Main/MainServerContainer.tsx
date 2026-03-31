/**
 * MainServerContainer.tsx
 * 메인 페이지의 최상위 서버 컨테이너
 *
 * 클라이언트 컨테이너(MainClientContainer)로 서버 블록(MainServerBlock)을 감싸
 * Context를 통해 상태와 로직을 하위 컴포넌트에 전달하는 구조를 형성한다.
 */

import MainClientContainer from "./MainClientContainer";
import MainServerBlock from "./MainServerBlock";

export default function MainServerContainer() {
  return (
    <MainClientContainer>
      <MainServerBlock />
    </MainClientContainer>
  );
}
