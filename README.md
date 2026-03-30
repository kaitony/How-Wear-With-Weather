# Next.js Basement

Next.js 16 기반의 최신 SSR/SSG 프로젝트 템플릿입니다.

## ✨ 주요 기능

- **Next.js 16** - 최신 React 서버 컴포넌트 및 App Router 지원
- **React 19** - 최신 React 기능 활용
- **Tailwind CSS 4** - 유틸리티 우선 CSS 프레임워크
- **TypeScript** - 타입 안정성 제공
- **Turbopack** - 초고속 빌드 도구 및 HMR
- **React Compiler** - 자동 메모이제이션 최적화
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **HTTPS 개발 환경** - 로컬 개발 시 HTTPS 지원

## 📁 프로젝트 구조

```
nextjs_basement/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 홈페이지
│   │   ├── loading.tsx        # 로딩 UI
│   │   └── globals.css        # 전역 스타일
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── defaultLayout.tsx  # 기본 레이아웃
│   │   ├── loading.tsx        # 로딩 컴포넌트
│   │   └── spinner.tsx        # 스피너 컴포넌트
│   ├── containers/            # 컨테이너 컴포넌트
│   │   └── Root/             # 루트 컨테이너 (Client/Server)
│   ├── hooks/                # 커스텀 React 훅
│   ├── lib/                  # 유틸리티 라이브러리
│   │   └── utils.ts         # 공통 유틸리티 함수
│   ├── types/                # TypeScript 타입 정의
│   ├── configs/              # 설정 파일
│   └── utils/                # 유틸리티 함수
│       └── requestToServer.tsx  # 서버 요청 유틸리티
├── public/
│   ├── fonts/                # 로컬 폰트 (Pretendard)
│   ├── icons/                # 아이콘 파일
│   └── images/               # 이미지 리소스
└── certificates/             # HTTPS 인증서

```

## 🎨 디자인 시스템

### 폰트

- **Pretendard** (로컬) - 메인 한글 폰트
- **Noto Sans KR** (Google Fonts) - 한글 지원
- **Inter** (Google Fonts) - 영문 폰트

### 아이콘 & UI

- **Lucide React** - 깔끔하고 일관된 아이콘 세트
- **shadcn/ui** - Tailwind 기반 컴포넌트 라이브러리

## 🛠️ 기술 스택

### 코어

- **프레임워크**: Next.js 16.1.6
- **언어**: TypeScript 5.9
- **런타임**: React 19.2

### UI & 스타일링

- **CSS 프레임워크**: Tailwind CSS 4.2
- **컴포넌트**: shadcn/ui 3.8
- **아이콘**: Lucide React 0.575
- **유틸리티**:
  - clsx - 조건부 클래스 연결
  - tailwind-merge - Tailwind 클래스 병합
  - class-variance-authority - 컴포넌트 variants 관리
  - tw-animate-css - Tailwind 애니메이션 확장

### 개발 도구

- **빌드 도구**: Turbopack
- **린팅**: ESLint 9, Prettier
- **컴파일러**: React Compiler (Babel Plugin)

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18 이상
- Yarn 4.11

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

개발 서버는 HTTPS로 실행되며, Turbopack을 사용하여 초고속 HMR을 제공합니다.

### 프로덕션 빌드

```bash
yarn build
```

최적화된 프로덕션 빌드를 생성합니다.

### 프로덕션 서버 실행

```bash
yarn start
```

### 코드 린팅

```bash
yarn lint
```

## 🎯 Next.js 16 주요 기능

### App Router

파일 기반 라우팅 시스템으로 직관적인 페이지 구성:

- `app/page.tsx` - 홈페이지
- `app/layout.tsx` - 공통 레이아웃
- `app/loading.tsx` - 로딩 UI (Suspense 자동 적용)

### 서버 컴포넌트

기본적으로 모든 컴포넌트는 서버 컴포넌트로 동작합니다. 클라이언트 컴포넌트가 필요한 경우에만 `'use client'` 지시어를 사용합니다.

```tsx
// 서버 컴포넌트 (기본)
export default function ServerComponent() {
  // 서버에서만 실행
  return <div>Server Component</div>;
}

// 클라이언트 컴포넌트
("use client");

export default function ClientComponent() {
  // 브라우저에서 실행
  return <div>Client Component</div>;
}
```

### 메타데이터 API

```typescript
export const metadata: Metadata = {
  title: "Next.js Basement",
  description: "Next.js 기반의 최신 베이스 템플릿입니다.",
};
```

## 🚀 성능 최적화

### React Compiler

`babel-plugin-react-compiler`를 통해 자동 메모이제이션이 적용됩니다. `useMemo`, `useCallback`, `React.memo`를 수동으로 작성할 필요가 없습니다.

### Turbopack

Webpack보다 700배 빠른 빌드 속도를 제공하는 Rust 기반 번들러입니다.

### 이미지 최적화

Next.js의 `Image` 컴포넌트를 사용하여 자동 이미지 최적화:

```tsx
import Image from "next/image";

<Image
  src="/images/photo.jpg"
  alt="Photo"
  width={500}
  height={300}
  priority // LCP 최적화
/>;
```

### 폰트 최적화

Google Fonts 및 로컬 폰트가 자동으로 최적화되어 로드됩니다.

## 🎨 shadcn/ui 컴포넌트

Tailwind CSS 기반의 복사 가능한 컴포넌트를 제공합니다.

### 컴포넌트 추가

```bash
npx shadcn add button
npx shadcn add card
npx shadcn add dialog
```

### 사용 예시

```tsx
import { Button } from "@/components/ui/button";

export default function Page() {
  return <Button variant="default">Click me</Button>;
}
```

## 🔧 주요 설정

### Tailwind CSS

`tw-animate-css`를 통해 확장된 애니메이션 유틸리티를 사용할 수 있습니다.

### 경로 별칭

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

사용 예시:

```typescript
import { Button } from "@/components/ui/button";
import { utils } from "@/lib/utils";
```

### HTTPS 개발 환경

개발 서버는 자동으로 HTTPS로 실행되어 실제 프로덕션 환경과 유사한 환경에서 테스트할 수 있습니다.

## 📊 렌더링 전략

### SSR (Server-Side Rendering)

기본적으로 모든 페이지는 SSR로 렌더링됩니다.

### SSG (Static Site Generation)

```typescript
export const dynamic = "force-static";
```

### ISR (Incremental Static Regeneration)

```typescript
export const revalidate = 3600; // 1시간마다 재생성
```

### CSR (Client-Side Rendering)

```typescript
"use client";

export default function ClientPage() {
  // 클라이언트에서만 렌더링
}
```

## 🧩 컴포넌트 아키텍처

이 프로젝트는 **Container/Block** 패턴을 사용합니다:

- **Container**: 데이터 로직 및 상태 관리
- **Block**: 프레젠테이션 컴포넌트

```
containers/Root/
├── RootServerContainer.tsx  # 서버 컴포넌트 컨테이너
├── RootServerBlock.tsx      # 서버 컴포넌트 UI
├── RootClientContainer.tsx  # 클라이언트 컴포넌트 컨테이너
└── RootClientBlock.tsx      # 클라이언트 컴포넌트 UI
```

## 📝 라이선스

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🤝 기여

기여는 언제나 환영합니다! 다음과 같은 방법으로 기여할 수 있습니다:

1. 이 저장소를 Fork 합니다
2. Feature 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

### 기여 가이드라인

- 코드 스타일은 ESLint와 Prettier 설정을 따라주세요
- 커밋 메시지는 명확하고 간결하게 작성해주세요
- 새로운 기능을 추가할 때는 관련 문서도 함께 업데이트해주세요
- Server Component와 Client Component 구분을 명확히 해주세요

## 📖 추가 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [TypeScript 문서](https://www.typescriptlang.org/)

---

**Made with ❤️ using Next.js**
