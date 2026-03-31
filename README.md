# 🌤️ How Wear With Weather

날씨에 어울리는 옷차림을 추천해주는 웹 서비스입니다.

기상청 단기예보 API와 카카오 로컬 API를 활용하여 사용자의 위치 기반 날씨 정보를 가져오고, 체감 온도와 개인 선호도를 반영한 의상을 추천합니다.

## 주요 기능

- **날씨 기반 옷차림 추천** — 체감 온도에 따라 적절한 의상 조합 제안
- **개인 선호도 반영** — 더위/추위를 많이 타는 정도에 따른 보정
- **위치 설정** — GPS 자동 감지 또는 주소 직접 검색
- **다일별 예보** — 날짜별 최고/최저 기온, 오전/오후/저녁 날씨 확인
- **체감 온도 계산** — 윈드칠 공식을 적용한 체감 기온 산출

## 기술 스택

| 분류            | 기술                                                         |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 16 (App Router, Turbopack)                           |
| Language        | TypeScript 6                                                 |
| UI              | Tailwind CSS 4, shadcn/ui (New York), Radix UI, Lucide Icons |
| State           | Zustand                                                      |
| Form            | TanStack React Form, Zod                                     |
| Font            | Pretendard (로컬), Noto Sans KR, Inter (Google Fonts)        |
| Package Manager | Yarn 4 (Berry)                                               |
| Deploy          | Docker (standalone output)                                   |

## 외부 API

| API                                              | 용도                                       |
| ------------------------------------------------ | ------------------------------------------ |
| [기상청 단기예보 API](https://apihub.kma.go.kr/) | 날씨 예보 데이터 (기온, 강수, 하늘상태 등) |
| [카카오 로컬 API](https://developers.kakao.com/) | 주소 → 좌표 변환, 좌표 → 행정구역 변환     |

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 스플래시 페이지
│   ├── preference/         # 선호도 설정 (더위/추위/보통)
│   ├── location/           # 위치 설정 (GPS / 주소 검색)
│   └── main/               # 메인 페이지 (날씨 & 옷차림)
├── components/             # 공통 UI 컴포넌트 (shadcn/ui)
├── configs/                # 설정 파일 (지역 좌표, URL 등)
├── containers/             # 페이지별 Server/Client 컨테이너
│   ├── Splash/
│   ├── Preference/
│   ├── Location/
│   └── Main/
├── hooks/                  # 커스텀 훅
├── lib/                    # 유틸리티 (cn 등)
├── states/                 # Zustand 스토어 (location, preference)
├── types/                  # 타입 정의 (WeatherInfoType 등)
└── utils/                  # API 요청 함수
    ├── requestWeatherApi.ts    # 기상청 API 호출
    └── requestLocalApi.ts      # 카카오 로컬 API 호출
```

### 컨테이너 아키텍처

각 페이지는 **Server/Client 분리 패턴**으로 구성됩니다:

- `ServerContainer` — 데이터 페칭, 리다이렉트 등 서버 로직
- `ClientContainer` — Context 기반 클라이언트 상태 관리
- `ServerBlock` — 서버 렌더링 레이아웃
- `ClientBlock` — 인터랙티브 UI 컴포넌트

## 시작하기

### 사전 요구사항

- Node.js 22+
- Yarn 4+
- 기상청 API 인증키
- 카카오 REST API 키

### 환경 변수

```env
NEXT_PUBLIC_KMA_API_KEY=<기상청 API 인증키>
NEXT_PUBLIC_KAKAO_API_KEY=<카카오 REST API 키>
```

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (HTTPS + Turbopack)
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

### Docker

```bash
# 이미지 빌드
docker build -t how-wear-with-weather .

# 컨테이너 실행
docker run -p 3000:3000 how-wear-with-weather
```

## 사용 흐름

1. **스플래시** — 앱 진입
2. **선호도 설정** — 더위를 많이 탐 / 보통 / 추위를 많이 탐 선택
3. **위치 설정** — GPS 자동 감지 또는 주소 직접 검색
4. **메인 화면** — 날짜별 날씨 정보 및 추천 옷차림 확인

## 라이선스

[MIT](LICENSE)
