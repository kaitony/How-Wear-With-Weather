# 테스트 가이드

## 테스트 환경

이 프로젝트는 다음 테스트 도구를 사용합니다:

- **Vitest**: 빠르고 현대적인 테스팅 프레임워크
- **React Testing Library**: React 컴포넌트 테스팅 라이브러리
- **@testing-library/user-event**: 사용자 이벤트 시뮬레이션
- **@testing-library/jest-dom**: 추가 매처 제공

## 테스트 실행

### 전체 테스트 실행

```bash
yarn test
```

### Watch 모드로 테스트 실행

```bash
yarn test:watch
```

### 커버리지 리포트 생성

```bash
yarn test:coverage
```

## 테스트 구조

```
src/
├── components/__tests__/     # UI 컴포넌트 테스트
│   ├── button.test.tsx
│   ├── input.test.tsx
│   ├── label.test.tsx
│   ├── layout.test.tsx
│   └── spinner.test.tsx
├── states/__tests__/         # 상태 관리 테스트
│   ├── location.test.ts
│   └── preference.test.ts
└── utils/__tests__/          # API 호출 함수 테스트
    ├── requestAirApi.test.ts
    ├── requestLocalApi.test.ts
    └── requestWeatherApi.test.ts
```

## 테스트 커버리지

각 파일의 테스트 내용:

### 1. Utils 테스트

- **requestWeatherApi.test.ts**: 기상청 API 호출 테스트
  - 날씨 정보 조회 성공 케이스
  - API 요청 실패 처리
  - 파라미터 검증

- **requestLocalApi.test.ts**: 카카오 로컬 API 호출 테스트
  - 주소 → 좌표 변환
  - 좌표 → 행정구역 코드 조회
  - WGS84 → TM 좌표계 변환

- **requestAirApi.test.ts**: 에어코리아 API 호출 테스트
  - 측정소 정보 조회
  - 실시간 대기오염 데이터 조회
  - URL 인코딩 검증

### 2. Components 테스트

- **button.test.tsx**: 버튼 컴포넌트 테스트
  - 렌더링 및 클릭 이벤트
  - disabled 상태 처리
  - variant/size prop 적용
  - asChild prop 테스트

- **input.test.tsx**: 입력 필드 테스트
  - 사용자 입력 처리
  - placeholder 표시
  - disabled/aria-invalid 상태
  - onChange 이벤트

- **label.test.tsx**: 레이블 컴포넌트 테스트
  - htmlFor 속성으로 input 연결
  - 레이블 클릭 시 포커스

- **layout.test.tsx**: 레이아웃 컴포넌트 테스트
  - children 렌더링
  - 그라데이션 배경 클래스 적용

- **spinner.test.tsx**: 스피너 컴포넌트 테스트
  - 로딩 아이콘 렌더링
  - 회전 애니메이션 클래스

### 3. States 테스트

- **location.test.ts**: 위치 상태 관리 테스트
  - useLocationStore (기상청 격자 좌표)
  - useTMLocationStore (TM 좌표계)
  - useAddressStore (주소 문자열)
  - 상태 공유 검증

- **preference.test.ts**: 사용자 선호도 테스트
  - 온도 민감도 설정 (더위/추위/보통)
  - 상태 변경 및 공유

## 모킹 (Mocking)

### Global Mocks

`vitest.setup.ts`에서 다음을 모킹합니다:

- `fetch`: API 호출
- `localStorage`, `sessionStorage`: 브라우저 저장소
- `matchMedia`: 반응형 UI
- `IntersectionObserver`: 스크롤 애니메이션
- `ResizeObserver`: 크기 변경 감지

### API Mocking 예시

```typescript
global.fetch = vi.fn();
(global.fetch as Mock).mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: "mock data" }),
});
```

## 테스트 작성 가이드

### 1. 컴포넌트 테스트

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

it('should render and handle click', async () => {
  const handleClick = vi.fn()
  const user = userEvent.setup()

  render(<Button onClick={handleClick}>Click me</Button>)

  await user.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### 2. API 함수 테스트

```typescript
import { vi, type Mock } from "vitest";

it("should fetch data successfully", async () => {
  (global.fetch as Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ result: "success" }),
  });

  const data = await fetchData();
  expect(data).toEqual({ result: "success" });
});
```

### 3. Zustand Store 테스트

```typescript
import { renderHook, act } from "@testing-library/react";

it("should update state", () => {
  const { result } = renderHook(() => useStore());

  act(() => {
    result.current.setValue("new value");
  });

  expect(result.current.value).toBe("new value");
});
```

## 주의사항

1. **비동기 테스트**: `async/await`를 사용하여 비동기 로직을 처리합니다.
2. **Mock 초기화**: `beforeEach`에서 `vi.clearAllMocks()`를 호출하여 이전 테스트의 영향을 제거합니다.
3. **사용자 상호작용**: `userEvent`를 사용하여 실제 사용자 동작을 시뮬레이션합니다.
4. **접근성**: `getByRole`을 우선적으로 사용하여 접근성을 고려한 테스트를 작성합니다.

## 참고 자료

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library 공식 문서](https://testing-library.com/react)
- [Testing Library 모범 사례](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
