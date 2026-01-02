# 한자리 프론트엔드 프로젝트

> 대학교 동아리 관리 플랫폼 "한자리"의 프론트엔드 프로젝트입니다.

## 기술 스택

### 핵심 기술

-   **React 18.2**
-   **TypeScript 5.7**
-   **Vite 6** + **@tailwindcss/vite 플러그인**
-   **Yarn** (패키지 매니저)

### 스타일링

-   **Tailwind CSS v4** (메인 스타일링 시스템)
-   **class-variance-authority (cva)** (컴포넌트 변형 관리)
-   **clsx & tailwind-merge** (클래스 병합 유틸리티)
-   **Swiper 12** (캐러셀/슬라이더)

### 상태 관리

-   **Recoil** (원자적 상태 관리)
-   **recoil-persist** (localStorage 기반 상태 영속성)
-   **TanStack Query (React Query) 5** (서버 상태 관리 및 캐싱)

### API 통신

-   **Axios** (HTTP 클라이언트 - JWT Bearer 토큰 인증)
-   **swagger-typescript-api** (API 타입 자동 생성)

### 라우팅

-   **React Router DOM 7** (클라이언트 사이드 라우팅)

### 기타

-   **PWA** (vite-plugin-pwa - 프로그레시브 웹 앱 지원)
-   **ESLint 9** + **Prettier** (코드 품질 관리)

---

## 프로젝트 구조

```
/src
├── /api                    # API 통신 관련
│   ├── axiosInstance.ts    # Axios 인스턴스 + 인터셉터 설정
│   ├── apiRequest.ts       # 통합 API 요청 함수
│   ├── data-contracts.ts   # API 응답 타입 (자동 생성)
│   └── http-client.ts      # HTTP 클라이언트 (자동 생성)
│
├── /components             # 재사용 가능한 컴포넌트
│   ├── /Common             # 공통 UI 컴포넌트 (Button, InputField, Card, Modal 등)
│   ├── /ClubDetail         # 동아리 상세 페이지 컴포넌트
│   ├── /AdminClubDetail    # 관리자 동아리 상세 컴포넌트
│   ├── /ClubRegister       # 동아리 등록 컴포넌트
│   ├── /Search             # 검색 관련 컴포넌트
│   ├── /ActivityLog        # 활동 로그 컴포넌트
│   ├── /UnionNotice        # 총동연 공지 컴포넌트
│   ├── /Main               # 메인 페이지 섹션 컴포넌트
│   └── /ServiceAdmin       # 서비스 관리자 컴포넌트
│
├── /config                 # 설정 파일
│   └── queryClient.ts      # React Query 클라이언트 설정
│
├── /constants              # 상수 정의
│   ├── index.ts            # 상수 내보내기
│   ├── navigations.ts      # 네비게이션 데이터
│   ├── errorMessage.ts     # 에러 메시지 매핑
│   ├── DEFAULT_IMG.ts      # 기본 이미지 경로
│   └── MAX_FILE_SIZE.ts    # 파일 크기 제한
│
├── /contexts               # React Context
│   ├── ClubIntroContext.tsx      # 동아리 소개 컨텍스트
│   └── ActivityLogContext.tsx    # 활동 로그 컨텍스트
│
├── /hooks                  # Custom Hooks
│   ├── /queries            # React Query 훅
│   │   ├── useClubList.ts  # 동아리 목록 쿼리 (무한 스크롤)
│   │   ├── /club-detail/   # 동아리 상세 관련 쿼리
│   │   └── /main/          # 메인 페이지 쿼리
│   ├── /actions            # 상태 변경 훅 (useToast, useToggle 등)
│   ├── /auth               # 인증 관련 훅
│   ├── /handler            # 이벤트 핸들러 훅
│   └── /contexts           # Context 접근 훅
│
├── /pages                  # 페이지 컴포넌트
│   ├── /admin/             # 관리자 페이지
│   │   ├── /auth/          # 로그인, 회원가입
│   │   ├── /club/          # 동아리 관리
│   │   ├── /service/       # 서비스 관리 (관리자 전용)
│   │   └── /union/         # 총동연 관리
│   ├── /main/              # 메인 페이지
│   ├── /club-detail/       # 동아리 상세 페이지
│   ├── /club-search/       # 동아리 검색 페이지
│   └── /splash/            # 스플래시 스크린
│
├── /routes                 # 라우팅 설정
│   ├── Routes.tsx          # 라우트 정의
│   ├── AuthGuard.tsx       # 인증 보호 (로그인 필요)
│   ├── ClubAdminGurad.tsx  # 동아리 관리자 권한 보호
│   ├── ServiceAdminGuard.tsx # 서비스 관리자 권한 보호
│   └── paths.ts            # 라우트 경로 상수
│
├── /store                  # Recoil 상태
│   ├── authState.ts        # 인증 상태 (isAuthenticated, adminType)
│   ├── clubInfoState.ts    # 동아리 정보 상태
│   └── toast.ts            # 토스트 알림 상태
│
├── /types                  # TypeScript 타입 정의
│   ├── api.types.ts        # API 관련 타입
│   ├── club.types.ts       # 동아리 관련 타입
│   ├── admin.types.ts      # 관리자 관련 타입
│   └── *.types.ts          # 도메인별 타입 파일
│
├── /utils                  # 유틸리티 함수
│   ├── apiRequest.ts       # API 요청 헬퍼
│   ├── cn.ts               # Tailwind 클래스 병합 유틸리티
│   ├── tokenHandler.ts     # 토큰 관리 (get/set/remove)
│   ├── inputChangeHandler.ts # 입력 변경 핸들러 (제네릭)
│   ├── getErrorMessage.ts  # 에러 메시지 조회
│   ├── dateFormatHandler.ts # 날짜 포맷 처리
│   └── uploadImageWithPreview.ts # 이미지 업로드 미리보기
│
├── index.css               # 전역 스타일 + Tailwind 설정
├── App.tsx                 # 앱 루트 컴포넌트
└── main.tsx                # 진입점
```

---

## 코드 스타일 가이드

### 네이밍 컨벤션

| 대상          | 규칙                           | 예시                                      |
| ------------- | ------------------------------ | ----------------------------------------- |
| 컴포넌트 파일 | PascalCase                     | `Button.tsx`, `ClubCard.tsx`              |
| 훅 파일       | camelCase + use 접두사         | `useToast.ts`, `useClubList.ts`           |
| 유틸리티 파일 | camelCase                      | `tokenHandler.ts`, `dateFormatHandler.ts` |
| 타입 파일     | camelCase + .types.ts          | `club.types.ts`, `api.types.ts`           |
| 상수 파일     | camelCase 또는 SCREAMING_SNAKE | `navigations.ts`, `MAX_FILE_SIZE.ts`      |

### 컴포넌트 작성 패턴 (Tailwind v4 + CVA)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

// CVA로 변형 정의
const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-primary-500 text-white hover:bg-primary-600',
                outline:
                    'border border-neutral-200 bg-white hover:bg-neutral-50',
                ghost: 'hover:bg-neutral-100',
            },
            size: {
                sm: 'h-9 px-3 text-b3',
                md: 'h-10 px-4 text-b1',
                lg: 'h-12 px-6 text-s2',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

// Props 인터페이스 (CVA의 VariantProps 활용)
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    children: ReactNode;
}

// 컴포넌트 정의
const Button = ({
    children,
    className,
    variant,
    size,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
```

### Import 순서

```typescript
// 1. React 및 외부 라이브러리
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cva, type VariantProps } from 'class-variance-authority';

// 2. 타입 import
import { ClubType, ClubStatus } from '@/types/club.types';

// 3. 컴포넌트 import
import Button from '@/components/Common/Button';
import { InputField } from '@/components/Common';

// 4. 훅 import
import useClubList from '@/hooks/queries/useClubList';
import { useToast } from '@/hooks/actions/useToast';

// 5. 유틸리티/상수 import
import { cn } from '@/utils/cn';
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { DEFAULT_IMG } from '@/constants';
```

### TypeScript 패턴

```typescript
// 제네릭 활용 예시
interface IHandleInputChange<T> {
    e: React.ChangeEvent<HTMLInputElement>;
    setInputValue: React.Dispatch<React.SetStateAction<T>>;
}

const inputChangeHandler = <T>({
    e,
    setInputValue,
}: IHandleInputChange<T>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
};

// API 응답 타입
interface APIResponse<T> {
    result: T;
    code: string;
    isSuccess: boolean;
    message: string;
}
```

---

## 디자인 시스템 및 Tailwind v4

### 디자인 토큰 (`src/index.css`)

모든 디자인 토큰은 `@theme` 블록에 정의되어 있으며, Tailwind 유틸리티 클래스로 자동 생성됩니다.

```css
@theme {
    /* Primary Colors */
    --color-primary-50: #dae9fc;
    --color-primary-500: #1264c4;
    --color-primary-600: #0e4c95;

    /* Sub Colors */
    --color-sub-green: #00bd00;
    --color-sub-orange: #f08a00;
    --color-sub-warning: #f32828;

    /* Neutral Colors */
    --color-neutral-00: #fdfdfd;
    --color-neutral-50: #f9fafb;
    --color-neutral-100: #eceff3;
    --color-neutral-150: #eceff3; /* Stroke용 */
    --color-neutral-200: #c7d0db;
    --color-neutral-300: #aebccb;
    --color-neutral-400: #8fa3b7;
    --color-neutral-500: #708aa3;
    --color-neutral-600: #587189;
    --color-neutral-700: #44576a;
    --color-neutral-800: #303d4b;
    --color-neutral-900: #1c232c;

    /* Semantic Colors */
    --color-service-key: var(--color-primary-600);
    --color-text-main: var(--color-neutral-900);
    --color-text-sub: var(--color-neutral-600);
    --color-text-placeholder: var(--color-neutral-400);
    --color-text-hint: var(--color-neutral-400);
    --color-text-error: var(--color-sub-warning);
    --color-stroke-status: var(--color-neutral-150);

    /* Background */
    --color-background-default: #f7f7f9;

    /* Badge Colors */
    --color-badge-blue-bg: #dae9fc;
    --color-badge-blue-text: #0e4c95;
    --color-badge-orange-bg: #fff4e4;
    --color-badge-green-bg: #f1f9dc;
    --color-badge-green-text: #8bb421;
    --color-badge-gray-bg: #f7f7f7;

    /* Typography - Font Sizes */
    --text-header-01: 24px;
    --text-subtitle-01: 20px;
    --text-subtitle-02: 18px;
    --text-body-01: 16px;
    --text-body-03: 14px;
    --text-caption: 12px;
    --text-small: 13px;
    --text-emoji-large: 30px;

    /* Typography - Line Heights */
    --leading-header: 1.3;
    --leading-body: 1.5;

    /* Typography - Font Weights */
    --font-weight-bold: 700;
    --font-weight-semibold: 600;
    --font-weight-medium: 500;
    --font-weight-regular: 400;

    /* Animation Utilities */
    --animate-fade-in: fadeIn 0.3s ease-in-out;
    --animate-fade-in-slow: fadeIn 1.5s ease-in-out;
    --animate-background-fade: backgroundFade 1s ease-in-out;
    --animate-toast-in: toast-fade-in 0.3s ease-out forwards;
    --animate-toast-out: toast-fade-out 0.3s ease-in forwards;
    --animate-modal-in: modal-fade-in 0.4s ease-out;
    --animate-modal-out: modal-fade-out 0.4s ease;
    --animate-modal-backdrop: modal-backdrop-show 0.4s ease;
    --animate-dropdown: dropdown-slide 0.3s ease;
    --animate-bounce: loading-bounce 0.5s infinite alternate;
    --animate-skeleton: skeleton-loading 1.2s infinite alternate;
    --animate-skeleton-fast: skeleton-loading 0.8s linear infinite alternate;
}
```

### 타이포그래피 유틸리티 클래스

```typescript
// 사용 예시
<h1 className="text-h1">헤더 텍스트</h1>
<h2 className="text-s1">서브타이틀 1</h2>
<h3 className="text-s2">서브타이틀 2</h3>
<p className="text-b1">본문 텍스트 (Medium)</p>
<p className="text-b2">본문 텍스트 (Semibold)</p>
<p className="text-b3">본문 작은 텍스트 (Semibold)</p>
<p className="text-b4">본문 작은 텍스트 (Regular)</p>
<span className="text-c1">캡션 (Regular)</span>
<span className="text-c2">캡션 (Medium)</span>
<span className="text-c3">캡션 (Semibold)</span>
<span className="text-c4">캡션 작음 (10px, Medium)</span>
```

### 애니메이션 유틸리티 클래스

```typescript
// 사용 예시
<div className="animate-fade-in">페이드인</div>
<div className="animate-toast-in">토스트 등장</div>
<div className="animate-modal-in">모달 등장</div>
<div className="animate-skeleton">스켈레톤 로딩</div>
<div className="animate-bounce">바운스 효과</div>
```

---

## 주요 패턴 및 규칙

### API 통신

```typescript
// apiRequest 함수 사용 (requireToken으로 인증 토큰 자동 추가)
const response = await apiRequest({
    url: '/api/clubs',
    method: 'GET',
    requireToken: true, // JWT 토큰 자동 첨부
});

// React Query 훅 패턴
const { data, isLoading } = useQuery({
    queryKey: ['clubs', clubId],
    queryFn: () => apiRequest({ url: `/api/clubs/${clubId}` }),
});
```

### 상태 관리 (Recoil)

```typescript
// Atom 정의 (recoil-persist로 localStorage 영속성)
const authState = atom({
    key: 'authState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

// Selector로 읽기 전용 접근
const authSelector = selector({
    key: 'authSelector',
    get: ({ get }) => get(authState),
});
```

### 에러 처리

```typescript
// useErrorHandler 훅 사용
const { handleError } = useErrorHandler();

try {
    await apiRequest({ url: '/api/clubs', method: 'POST', data });
} catch (error) {
    handleError(error); // 상태 코드별 토스트 메시지 표시
}
```

### 라우트 가드

```typescript
// 인증이 필요한 라우트
<Route path="/admin" element={<AuthGuard />}>
    <Route path="/admin/club/:id" element={<ClubAdminGurad />}>
        {/* 동아리 관리자 전용 라우트 */}
    </Route>
</Route>
```

---

## 개발 명령어

```bash
# 개발 서버 실행
yarn run dev

# 프로덕션 빌드
yarn run build

# 린트 검사
yarn run lint

# API 타입 자동 생성 (Swagger 문서 기반)
yarn run generate-api

# PWA 아이콘 생성
yarn run gen-pwa
```

---

## Prettier 설정

```json
{
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 4,
    "trailingComma": "all",
    "printWidth": 80
}
```

---

## Tailwind v4 작업 원칙

### 1. 디자인 토큰 우선

-   **CSS-first 설정:** 모든 디자인 토큰(Color, Spacing, Typography 등)은 `src/index.css`의 `@theme` 블록에 정의
-   **Figma 기준:** 스타일 수치는 Figma MCP (`figma-remote-mcp`)를 통해 조회한 값을 우선
-   **토큰 확장:** 새로운 디자인 요소가 필요할 경우 `@theme`에 추가 후 사용

### 2. 클래스 병합 유틸리티

-   **cn() 함수 사용:** 조건부 클래스 적용 시 `src/utils/cn.ts`의 `cn()` 함수 사용
-   **CVA 활용:** 변형이 많은 컴포넌트는 `class-variance-authority` 사용

```typescript
import { cn } from '@/utils/cn';

// 조건부 클래스 적용
<div className={cn('base-class', isActive && 'active-class', className)} />
```

### 3. 반응형 디자인

```typescript
// Tailwind 반응형 유틸리티 활용
<div className="w-full md:w-1/2 lg:w-1/3">반응형 너비</div>
```

---

## 주의사항

1. **API 타입 수정 금지**: `data-contracts.ts`, `http-client.ts`는 자동 생성 파일이므로 직접 수정하지 않습니다. `yarn run generate-api`로 재생성하세요.

2. **토큰 관리**: `tokenHandler.ts`의 함수를 사용하여 accessToken을 관리합니다. 직접 localStorage에 접근하지 마세요.

3. **에러 처리**: API 호출 시 `useErrorHandler` 훅을 사용하여 일관된 에러 처리를 적용합니다.

4. **파일 크기 제한**: 이미지 업로드 시 `MAX_FILE_SIZE` (0.5MB) 제한을 확인합니다.

5. **디자인 토큰 준수**: 하드코딩된 색상, 크기 값 사용 금지. 반드시 `@theme`에 정의된 토큰 사용.

6. **애니메이션**: 커스텀 keyframes 하드코딩 금지. `@theme`에 정의된 애니메이션 유틸리티 사용.

---

## 성능 최적화

-   **React.memo**: 불필요한 리렌더링 방지
-   **useCallback/useMemo**: 함수/값 메모이제이션
-   **React Query**: 서버 상태 캐싱 및 자동 리페칭
-   **Code Splitting**: 라우트 기반 lazy loading
-   **이미지 최적화**: WebP 포맷 사용, lazy loading

---

## 접근성 (a11y)

-   **시맨틱 HTML**: 적절한 HTML 태그 사용
-   **키보드 네비게이션**: focus-visible 스타일 적용
-   **ARIA 속성**: 필요시 aria-label, aria-describedby 등 사용
-   **색상 대비**: WCAG 기준 준수 (최소 4.5:1)
